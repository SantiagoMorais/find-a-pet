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
      page: 1,
    });

    expect(pets[0]?.id).toBe("pet-1");
    expect(pets).toHaveLength(2);
  });

  it("should not be able to search registered pets from another city", async () => {
    const { pets } = await sut.execute({ state: "MG", city: "Solid", page: 1 });

    expect(pets).toHaveLength(0);
  });

  it("should be able to filter pets", async () => {
    const firstFilter = await sut.execute({
      state: "MG",
      city: "Typescript City",
      page: 1,
      filter: { specie: "DOG" },
    });

    const secondFilter = await sut.execute({
      state: "MG",
      city: "Typescript City",
      page: 1,
      filter: { independencyLevel: 3, specie: "DOG" },
    });

    expect(firstFilter).toStrictEqual(
      expect.objectContaining({
        pets: expect.arrayContaining([
          expect.objectContaining({ id: "pet-1" }),
          expect.objectContaining({ id: "pet-2" }),
        ]),
      })
    );

    expect(secondFilter).toEqual({ pets: [] });
  });

  it("should be able to paginate pets", async () => {
    for (let i = 1; i <= 21; i++) {
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
        organization_id: `organization-1`,
      });
    }

    const firstPage = await sut.execute({
      state: "MG",
      city: "TypeScript City",
      page: 1,
    });

    const secondPage = await sut.execute({
      state: "MG",
      city: "TypeScript City",
      page: 2,
    });

    expect(firstPage.pets).toHaveLength(20);
    expect(secondPage.pets).toHaveLength(3);
  });
});
