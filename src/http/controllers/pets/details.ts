import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { makePetDetailsUseCase } from "@/use-cases/factories/pet/make-pet-details-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const petDetails = async (
  req: FastifyRequest<{ Params: { petId: string } }>,
  res: FastifyReply
) => {
  const { petId } = req.params;

  try {
    const petProfileUseCase = makePetDetailsUseCase();
    const { pet } = await petProfileUseCase.execute(petId);
    return res.status(200).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).send({ message: error.message });
  }
};
