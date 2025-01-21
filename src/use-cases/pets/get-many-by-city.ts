import {
  TGetManyByCityRequest,
  TGetManyByCityResponse,
} from "@/core/pet/get-many-by-city-use-case.ts";
import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { PetsRepository } from "@/repositories/pets-repository.ts";

export class GetManyByCity {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    state,
    city,
    filter,
  }: TGetManyByCityRequest): Promise<TGetManyByCityResponse> {
    const organizations = await this.organizationsRepository.findManyByLocation(
      state,
      city
    );

    if (!organizations || organizations.length === 0) return { pets: [] };

    const organizationIds = organizations.map((org) => org.id);

    const pets =
      await this.petsRepository.findManyByOrganizationIds(organizationIds, filter);

    return pets;
  }
}
