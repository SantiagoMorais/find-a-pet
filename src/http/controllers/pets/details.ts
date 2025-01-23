import { makePetDetailsUseCase } from "@/use-cases/factories/pet/make-pet-details-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const petDetails = async (
  req: FastifyRequest<{ Params: { petId: string } }>,
  res: FastifyReply
) => {
  const { petId } = req.params;

  const petProfileUseCase = makePetDetailsUseCase();
  const { pet } = await petProfileUseCase.execute(petId);
  return res.status(200).send({ pet });
};
