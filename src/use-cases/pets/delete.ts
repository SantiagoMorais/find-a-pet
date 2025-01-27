import { PetsRepository } from "@/repositories/pets-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string) {
    const pet = await this.petsRepository.filterById(id);

    if (!pet) throw new ResourceNotFoundError("Pet not found");

    await this.petsRepository.delete(id);
  }
}
