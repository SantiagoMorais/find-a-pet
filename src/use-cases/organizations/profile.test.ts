import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationProfileUseCase } from "./profile.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: OrganizationProfileUseCase;

describe("Organization Profile Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new OrganizationProfileUseCase(organizationsRepository);
  });

  it("should be able to get the organization profile", async () => {
    const { id } = await organizationsRepository.create({
      id: randomUUID(),
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      address: "123 Main Street, Petville",
      zip_code: 12345678,
      whatsapp: 11999999999,
      password_hash: await hash("123456", 6),
    });

    const profile = await sut.execute(id);

    expect(profile).toEqual({
      organization: {
        name: "Happy Paws Shelter",
        owner: "John Doe",
        email: "johndoe@test.com",
        address: "123 Main Street, Petville",
        zip_code: 12345678,
        whatsapp: 11999999999,
      },
    });
  });
});
