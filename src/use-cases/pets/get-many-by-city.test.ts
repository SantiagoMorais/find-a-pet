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
  });

  it("should work", () => {
    expect(1).toBe(1);
  });
});
