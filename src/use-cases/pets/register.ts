import {
  TRegisterPetUseCase,
  TRegisterPetUseCaseResponse,
} from "@/core/pet/register-pet-use-case.ts";
import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { PetsRepository } from "@/repositories/pets-repository.ts";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

export class RegisterUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute(
    data: TRegisterPetUseCase
  ): Promise<TRegisterPetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      data.organizationId
    );

    if (!organization) throw new ResourceNotFoundError();

    const pet = await this.petsRepository.create({
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      energy_level: data.energyLevel,
      independency_level: data.independencyLevel,
      size: data.size,
      space_requirement: data.spaceRequirement,
      specie: data.specie,
      adoption_requirements: data.adoptionRequirements,
      photos: data.photos,
      organization_id: data.organizationId,
    });

    return { pet };
  }
}
