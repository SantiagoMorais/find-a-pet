import {
  TRegisterOrganizationUseCase,
  TRegisterOrganizationUseCaseResponse,
} from "@/core/organization/register-organization-use-case.ts";
import { TViaCepAPIResponse } from "@/core/via-cep-api-response.js";
import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { returnAddressFromZipCode } from "@/utils/return-address-from-zip-code.ts";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { OrganizationAlreadyExistsError } from "../errors/organization-already-exists-error.ts";

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    zipCode,
    confirmPassword,
    name,
    owner,
    password,
    whatsApp,
    addressNumber,
  }: TRegisterOrganizationUseCase): Promise<TRegisterOrganizationUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email);

    if (organizationWithSameEmail) throw new OrganizationAlreadyExistsError();

    if (password !== confirmPassword) throw new InvalidCredentialsError();

    const orgAddress: TViaCepAPIResponse =
      await returnAddressFromZipCode(zipCode);
    const {
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    } = orgAddress;

    const organization = await this.organizationsRepository.create({
      id: randomUUID(),
      name,
      owner,
      email,
      whatsapp: whatsApp,
      zip_code: zipCode,
      address: `${street}, ${addressNumber}, ${neighborhood}, ${city} - ${state}`,
      password_hash: passwordHash,
    });

    return { organization };
  }
}
