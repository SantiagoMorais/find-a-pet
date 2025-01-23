import { makePetDetailsUseCase } from "@/use-cases/factories/pet/make-pet-details-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const petProfile = async (
  req: FastifyRequest<{ Querystring: { id: string } }>,
  res: FastifyReply
) => {
  const { id } = req.query;

  const petProfileUseCase = makePetDetailsUseCase();
  const { pet } = await petProfileUseCase.execute(id);
  return res.status(200).send({ pet });
};
