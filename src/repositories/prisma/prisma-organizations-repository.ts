import { prisma } from "@/database/index.ts";
import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository.ts";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data });

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    return organization;
  }

  async findManyByLocation(state: string, city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        address: { contains: `${city} - ${state}`, mode: "insensitive" },
      },
    });

    return organizations;
  }
}
