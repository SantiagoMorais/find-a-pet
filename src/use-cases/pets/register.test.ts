import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: RegisterUseCase;

describe("Register Pet Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterUseCase(petsRepository, organizationsRepository);

    await organizationsRepository.create({
      id: "organization-id",
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      address: "123 Main Street, Petville",
      cep: "12345678",
      whatsapp: 5511999999999,
      password_hash: "123456",
    });
  });

  it("should be able to register a pet as an ORG", async () => {
    const { pet } = await sut.execute({
      id: "pet-id",
      name: "Buddy",
      description: "A friendly and energetic dog.",
      specie: "DOG",
      age: "ADULT",
      size: "MEDIUM",
      energyLevel: 3,
      independencyLevel: 2,
      spaceRequirement: 2,
      photos: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg",
      ],
      adoptionRequirements: ["Needs a large yard", "Good with other dogs"],
      organizationId: "organization-id",
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should no be able to register a pet without an registered ORG", async () => {
    expect(
      async () =>
        await sut.execute({
          id: "pet-id",
          name: "Buddy",
          description: "A friendly and energetic dog.",
          specie: "DOG",
          age: "ADULT",
          size: "MEDIUM",
          energyLevel: 3,
          independencyLevel: 2,
          spaceRequirement: 2,
          photos: [
            "https://example.com/photo1.jpg",
            "https://example.com/photo2.jpg",
          ],
          adoptionRequirements: ["Needs a large yard", "Good with other dogs"],
          organizationId: "non-existent-organization",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
