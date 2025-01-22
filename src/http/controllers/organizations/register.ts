import { registerOrganizationSchema } from "@/core/organization/register-organization-use-case.ts";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.ts";
import { OrganizationAlreadyExistsError } from "@/use-cases/errors/organization-already-exists-error.ts";
import { makeRegisterOrganizationUseCase } from "@/use-cases/factories/organization/make-register-organization-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const register = async (
  req: FastifyRequest<{ Body: z.infer<typeof registerOrganizationSchema> }>,
  res: FastifyReply
) => {
  const {
    email,
    name,
    owner,
    zipCode,
    addressNumber,
    whatsApp,
    password,
    confirmPassword,
  } = req.body;

  try {
    const registerUseCase = makeRegisterOrganizationUseCase();
    await registerUseCase.execute({
      email,
      name,
      owner,
      zipCode,
      addressNumber,
      whatsApp,
      password,
      confirmPassword,
    });
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError)
      return res.status(409).send({ message: error.message });
    if (error instanceof InvalidCredentialsError)
      return res.status(401).send({ message: error.message });

    return res
      .status(500)
      .send({ message: "❌💻 Internal server error - Route Error." });
  }

  return res.status(201).send();
};
