import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationToken } from "./token.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: OrganizationToken;

describe("Organization Profile Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new OrganizationToken(organizationsRepository);
  });

  it("should be able to get the organization token", async () => {
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

    expect(profile).toEqual({ token: null });
  });
});
