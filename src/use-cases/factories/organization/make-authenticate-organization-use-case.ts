import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository.ts";
import { AuthenticateUseCase } from "@/use-cases/organizations/authenticate.ts";

export const makeAuthenticateOrganizationUseCase = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new AuthenticateUseCase(prismaOrganizationsRepository);
  
  return useCase;
};
