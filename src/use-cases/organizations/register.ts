import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import {
  TRegisterOrganizationUseCase,
  TRegisterOrganizationUseCaseResponse,
} from "@/core/register-organization-use-case.js";
import { OrganizationAlreadyExistsError } from "../errors/organization-already-exists-error.ts";
import { randomUUID } from "crypto";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { hash } from "bcrypt";

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    address,
    cep,
    confirmPassword,
    name,
    owner,
    password,
    whatsApp,
  }: TRegisterOrganizationUseCase): Promise<TRegisterOrganizationUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email);

    if (organizationWithSameEmail) throw new OrganizationAlreadyExistsError();

    if (password !== confirmPassword) throw new InvalidCredentialsError();

    const organization = await this.organizationsRepository.create({
      id: randomUUID(),
      name,
      owner,
      email,
      whatsapp: whatsApp,
      cep,
      address,
      password_hash: passwordHash,
    });

    return { organization };
  }
}
