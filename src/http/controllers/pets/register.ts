import { registerPetSchema } from "@/core/pet/register-pet-use-case.ts";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { makeRegisterPetUseCase } from "@/use-cases/factories/pet/make-register-pet-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const registerPet = async (
  req: FastifyRequest<{ Body: z.infer<typeof registerPetSchema> }>,
  res: FastifyReply
) => {
  const {
    name,
    description,
    specie,
    age,
    size,
    energyLevel,
    independencyLevel,
    spaceRequirement,
    photos,
    adoptionRequirements,
    organizationId,
    id
  } = req.body;

  try {
    const registerPetUseCase = makeRegisterPetUseCase();
    const { pet } = await registerPetUseCase.execute({
      id,
      name,
      description,
      specie,
      age,
      size,
      energyLevel,
      independencyLevel,
      spaceRequirement,
      photos,
      adoptionRequirements,
      organizationId,
    });

    return res.status(201).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).send({ message: error.message });
  }
};
