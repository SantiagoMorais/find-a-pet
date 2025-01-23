import { PrismaOrganizationsRepository } from "@/repositories/prisma/prisma-organizations-repository.ts";
import { OrganizationProfileUseCase } from "@/use-cases/organizations/profile.ts";

export const makeOrganizationProfileUseCase = () => {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new OrganizationProfileUseCase(organizationsRepository);

  return useCase;
};
