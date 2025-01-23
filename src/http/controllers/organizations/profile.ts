import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { makeOrganizationProfileUseCase } from "@/use-cases/factories/organization/make-organization-profile-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const organizationProfile = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const profileUseCase = makeOrganizationProfileUseCase();
    const { organization } = await profileUseCase.execute({
      organizationId: req.user.sub,
    });

    return res.status(200).send({ organization });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).send({ message: error.message });
  }
};
