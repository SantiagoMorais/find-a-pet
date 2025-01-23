import {
  TUpdateOrganizationRequest,
  TUpdateOrganizationResponse,
} from "@/core/organization/update-organization-use-case.ts";
import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { hash } from "bcrypt";

export class UpdateOrganizationDataUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    password,
    addressNumber,
    email,
    name,
    newPassword,
    owner,
    whatsapp,
    zipCode,
    id,
  }: TUpdateOrganizationRequest) {
    const organization = await this.organizationsRepository.findById(id);

    if (!organization) throw new ResourceNotFoundError();

    const passwordsMatch = await compare(password, organization.password_hash);

    if (!passwordsMatch)
      throw new InvalidCredentialsError(
        "Please fill the correct password to change your personal data."
      );

    const updatedData: Partial<TUpdateOrganizationResponse> = {};

    if (name) updatedData.name = name;
    if (owner) updatedData.owner = owner;
    if (email) updatedData.email = email;
    if (whatsapp) updatedData.whatsapp = whatsapp;
    if (zipCode) updatedData.zip_code = zipCode;
    if (addressNumber) updatedData.address_number = addressNumber;
    if (newPassword) updatedData.password_hash = await hash(newPassword, 6);

    await this.organizationsRepository.update(id, updatedData);
  }
}
