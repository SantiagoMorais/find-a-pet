import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts";
import { DeletePetUseCase } from "@/use-cases/pets/delete.ts";

export const makeDeletePetUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const deletePetUseCase = new DeletePetUseCase(petsRepository);
  return deletePetUseCase;
};
