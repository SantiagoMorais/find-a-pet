import { Organization, Prisma } from "@prisma/client";

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findByEmail(email: string): Promise<Organization | null>;
  findById(id: string): Promise<Organization | null>;
  findManyByLocation(city: string, state: string): Promise<Organization[] | null>;
}
