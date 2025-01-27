import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { makeDeletePetUseCase } from "@/use-cases/factories/pet/make-delete-pet-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const deletePet = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  const { id } = req.params;

  try {
    const useCase = makeDeletePetUseCase();
    await useCase.execute(id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).send({ message: error.message });
  }
};
