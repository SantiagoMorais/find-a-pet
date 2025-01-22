import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository.ts";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts";
import { RegisterUseCase } from "@/use-cases/pets/register.ts";

export const makeRegisterPetUseCase = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new RegisterUseCase(
    prismaPetsRepository,
    prismaOrganizationsRepository
  );

  return useCase;
};
