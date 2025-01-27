import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository.ts";
import { RegisterUseCase } from "@/use-cases/organizations/register.ts";

export const makeRegisterOrganizationUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new RegisterUseCase(prismaOrganizationsRepository);

  return useCase;
};
