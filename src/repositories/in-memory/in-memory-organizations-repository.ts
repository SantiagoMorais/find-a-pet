import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository.ts";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      whatsapp: data.whatsapp as Prisma.Decimal,
      cep: data.cep as Prisma.Decimal,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.organizations.push(organization);

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find(
      (organization) => organization.email === email
    );

    if (!organization) return null;

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.id === id
    );

    if (!organization) return null;

    return organization;
  }
}
