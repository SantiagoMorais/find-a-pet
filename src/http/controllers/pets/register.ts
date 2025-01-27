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
    id,
  } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .send({ message: "Unauthorized! Token not received." });

    const decoded = await req.jwtDecode<{ sub: string }>();
    const organizationIdFromToken = decoded.sub;

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
      organizationId: organizationIdFromToken,
    });

    if (!pet) return res.status(400).send({ message: "Pet not registered." });

    return res.status(201).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return res.status(404).send({ message: error.message });
  }
};
