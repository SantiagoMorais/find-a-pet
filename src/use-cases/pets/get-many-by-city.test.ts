import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts";
import { beforeEach, describe, expect, it } from "vitest";
import { GetManyByCity } from "./get-many-by-city.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetManyByCity;

describe("Get many by city Use Case", () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new GetManyByCity(organizationsRepository, petsRepository);

    for (let i = 1; i <= 2; i++) {
      await organizationsRepository.create({
        id: `organization-${i}`,
        name: "Happy Paws Shelter",
        owner: "John Doe",
        email: "johndoe@test.com",
        address:
          "Javascript Street, 123, Random Neighborhood, TypeScript City - MG",
        zip_code: "12345678",
        whatsapp: 5511999999999,
        password_hash: "123456",
      });
    }

    for (let i = 1; i <= 2; i++) {
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
        organization_id: `organization-${i}`,
      });
    }
  });

  it("should be able to search pets by city", async () => {
    const { pets } = await sut.execute({
      state: "MG",
      city: "TypeScript City",
    });

    expect(pets[0]?.id).toBe("pet-1");
    expect(pets).toHaveLength(2);
  });

  it("should not be able to search registered pets from another city", async () => {
    const { pets } = await sut.execute({ state: "MG", city: "Solid" });

    expect(pets).toHaveLength(0);
  });

  it("should not be able to search pets using the name of any of other params that is not city or state.", async () => {
    const { pets } = await sut.execute({
      state: "MG",
      city: "Random Neighborhood",
    });

    expect(pets).toHaveLength(0);
  });
});
