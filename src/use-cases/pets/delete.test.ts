import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { DeletePetUseCase } from "./delete.ts";

let petsRepository: InMemoryPetsRepository;
let sut: DeletePetUseCase;

describe("Pet Details Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new DeletePetUseCase(petsRepository);
  });

  it("should be able to delete a registered pet", async () => {
    for (let i = 0; i < 3; i++) {
      await petsRepository.create({
        id: `pet-${i}`,
        name: "Buddy",
        description: "A friendly and energetic dog.",
        specie: "DOG",
        age: "ADULT",
        size: "MEDIUM",
        energy_level: 3,
        independency_level: 2,
        space_requirement: 2,
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
        ],
        adoption_requirements: ["Needs a large yard", "Good with other dogs"],
        organization_id: "organization-id",
      });
    }

    await sut.execute("pet-1");

    expect(petsRepository.pets).toHaveLength(2);
  });
});
