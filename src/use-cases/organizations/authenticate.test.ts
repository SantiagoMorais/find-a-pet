import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate.ts";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Organization Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it("should be able to authenticate an organization", async () => {
    await organizationsRepository.create({
      id: randomUUID(),
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      address: "123 Main Street, Petville",
      cep: 12345678,
      whatsapp: 11999999999,
      password_hash: await hash("123456", 6),
    });

    const { organization } = await sut.execute({
      email: "johndoe@test.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should no be able to be authenticated using a wrong password", async () => {
    await organizationsRepository.create({
      id: randomUUID(),
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      address: "123 Main Street, Petville",
      cep: 12345678,
      whatsapp: 11999999999,
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "johndoe@test.com",
          password: "wrong-password",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to be authenticated using a wrong email", async () => {
    await organizationsRepository.create({
      id: randomUUID(),
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      address: "123 Main Street, Petville",
      cep: 12345678,
      whatsapp: 11999999999,
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await sut.execute({
          email: "wrongemail@gmail.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
