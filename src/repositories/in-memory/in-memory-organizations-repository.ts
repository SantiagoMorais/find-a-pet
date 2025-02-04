import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository.ts";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      owner: data.owner,
      email: data.email,
      whatsapp: data.whatsapp as Prisma.Decimal,
      zip_code: data.zip_code as Prisma.Decimal,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
      token: null,
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

  async findManyByLocation(state: string, city: string) {
    const organizations = this.organizations.filter((organization) => {
      const addressLowerCase = organization.address.toLocaleLowerCase();

      const addressParts = addressLowerCase.split(",");
      const cityAndState = addressParts[addressParts.length - 1]?.trim();
      const [cityFromAddress, stateFromAddress] = cityAndState
        .split("-")
        .map((part) => part.trim());

      const cityLowerCase = city.toLowerCase();
      const stateLowerCase = state.toLowerCase();

      return (
        cityFromAddress === cityLowerCase && stateFromAddress === stateLowerCase
      );
    });

    return organizations;
  }
}
