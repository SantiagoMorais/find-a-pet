import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts";
import { DetailsUseCase } from "@/use-cases/pets/details.ts";

export const makePetDetailsUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const useCase = new DetailsUseCase(prismaPetsRepository);

  return useCase;
};
