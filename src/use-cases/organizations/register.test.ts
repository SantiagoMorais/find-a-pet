import { InMemoryOrganizationsRepository } from "@/repositories/in-memory/in-memory-organizations-repository.ts";
import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { OrganizationAlreadyExistsError } from "../errors/organization-already-exists-error.ts";
import { RegisterUseCase } from "./register.ts";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterUseCase;

describe("Register Organization Use Case", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterUseCase(organizationsRepository);
  });

  it("should be able to register an organization", async () => {
    const { organization } = await sut.execute({
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zipCode: "31365450",
      addressNumber: 123,
      whatsApp: 5511999999999,
      password: "123456",
      confirmPassword: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should be the password be correctly hashed upon registration", async () => {
    const { organization } = await sut.execute({
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zipCode: "31365450",
      addressNumber: 123,
      whatsApp: 5511999999999,
      password: "123456",
      confirmPassword: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      organization.password_hash
    );

    const isPasswordInCorrectlyHashed = await compare(
      "random-password",
      organization.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
    expect(isPasswordInCorrectlyHashed).toBe(false);
  });

  it("should not to be able to register with the same email twice", async () => {
    await sut.execute({
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zipCode: "31365450",
      addressNumber: 123,
      whatsApp: 5511999999999,
      password: "123456",
      confirmPassword: "123456",
    });

    await expect(
      async () =>
        await sut.execute({
          name: "Organization with same email",
          owner: "Jane Doe",
          email: "johndoe@test.com",
          zipCode: "12345679",
          addressNumber: 123,
          whatsApp: 5511999999989,
          password: "123456",
          confirmPassword: "123456",
        })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });

  it("should not be able to register with a wrong password confirmation", async () => {
    await expect(
      async () =>
        await sut.execute({
          name: "Happy Paws Shelter",
          owner: "John Doe",
          email: "johndoe@test.com",
          zipCode: "31365450",
          addressNumber: 123,
          whatsApp: 5511999999999,
          password: "123456",
          confirmPassword: "incorrect-password",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
