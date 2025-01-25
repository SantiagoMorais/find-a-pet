import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository.ts";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { TPetsFilterRequest } from "@/core/pet/get-many-by-city-use-case.ts";
import { filterPetsMappings } from "@/utils/filter-pets-mapping.ts";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      specie: data.specie,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level as Prisma.Decimal,
      independency_level: data.independency_level as Prisma.Decimal,
      space_requirement: data.space_requirement as Prisma.Decimal,
      photos: Array.isArray(data.photos) ? data.photos : [],
      adoption_requirements: Array.isArray(data.adoption_requirements)
        ? data.adoption_requirements
        : [],
      organization_id: data.organization_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async filterById(id: string) {
    const pet = this.pets.find((item) => item.id === id);

    if (!pet) throw new ResourceNotFoundError();

    return pet;
  }

  async findManyByOrganizationIds(
    organizationId: string[],
    page: number,
    filter?: TPetsFilterRequest
  ) {
    const pets = this.pets
      .filter((pet) => {
        const belongsToOrganization = organizationId.includes(
          pet.organization_id
        );

        const matchesFilters = Object.entries(filter || {}).every(
          ([key, value]) => {
            const getPetValue = filterPetsMappings[key];
            return getPetValue ? getPetValue(pet) === value : true;
          }
        );

        return belongsToOrganization && matchesFilters;
      })
      .slice((page - 1) * 20, page * 20);

    return { pets };
  }
}
