import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository.ts";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
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

    return pet;
  }
}
