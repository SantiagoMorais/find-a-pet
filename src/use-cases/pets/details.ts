import { PetsRepository } from "@/repositories/pets-repository.ts";

export class DetailsUseCase {
  constructor(public petsRepository: PetsRepository) {}

  async execute(id: string) {
    const pet = await this.petsRepository.filterById(id);

    return { pet };
  }
}
