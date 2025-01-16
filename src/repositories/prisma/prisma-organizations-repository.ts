import { prisma } from "@/database/index.ts";
import { Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository.ts";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data });

    return organization;
  }
}
