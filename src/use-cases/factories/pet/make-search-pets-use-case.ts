import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository.ts";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts";
import { GetManyByCity } from "@/use-cases/pets/get-many-by-city.ts";

export const makeSearchPetsUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new GetManyByCity(
    prismaOrganizationsRepository,
    prismaPetsRepository
  );

  return useCase;
};
