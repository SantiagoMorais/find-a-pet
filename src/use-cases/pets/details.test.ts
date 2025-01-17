import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { DetailsUseCase } from "./details.ts";

let petsRepository: InMemoryPetsRepository;
let sut: DetailsUseCase;

describe("Pet Details Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new DetailsUseCase(petsRepository);
  });

  it("should be able to get pet details by id", async () => {
    const petCreated = await petsRepository.create({
      id: "pet-id",
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

    console.log(petCreated);

    const { pet } = await sut.execute("pet-id");

    expect(pet?.id).toEqual(expect.any(String));
  });
});
