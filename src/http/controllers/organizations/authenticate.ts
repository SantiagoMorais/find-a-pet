import { authenticateOrganizationSchema } from "@/core/organization/authenticate-organization-use-case.ts";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.ts";
import { makeAuthenticateOrganizationUseCase } from "@/use-cases/factories/organization/make-authenticate-organization-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const authenticate = async (
  req: FastifyRequest<{ Body: z.infer<typeof authenticateOrganizationSchema> }>,
  res: FastifyReply
) => {
  const { email, password } = req.body;

  try {
    const authenticateUseCase = makeAuthenticateOrganizationUseCase();
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await res.jwtSign({}, { sign: { sub: organization.id } });
    const refreshToken = await res.jwtSign(
      {},
      { sign: { sub: organization.id, expiresIn: "7d" } }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return res.status(400).send({ message: error.message });
  }

  return res.status(200).send();
};
