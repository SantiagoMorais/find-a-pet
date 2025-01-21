import {
  TRegisterOrganizationUseCase,
  TRegisterOrganizationUseCaseResponse,
} from "@/core/organization/register-organization-use-case.ts";
import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { verifyZipCodeByAddress } from "@/utils/verify-zip-code-by-address.ts";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { OrganizationAlreadyExistsError } from "../errors/organization-already-exists-error.ts";

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

    const { valid, message } = await verifyZipCodeByAddress({
      cep,
      city: address.split(",")[1]?.trim(),
      state: address.split(",")[2]?.trim(),
      street: address.split(",")[0]?.trim(),
    });

    if (!valid) throw new InvalidCredentialsError(message);

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
