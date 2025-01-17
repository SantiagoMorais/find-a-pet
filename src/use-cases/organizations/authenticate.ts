import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import {
  TAuthenticateOrganizationUseCase,
  TIAuthenticateOrganizationUseCaseResponse,
} from "@/core/authenticate-organization-use-case.js";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.ts";
import { compare } from "bcrypt";

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: TAuthenticateOrganizationUseCase): Promise<TIAuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) throw new InvalidCredentialsError();

    const doesPasswordsMatch = await compare(
      password,
      organization.password_hash
    );

    if (!doesPasswordsMatch) throw new InvalidCredentialsError();

    return { organization };
  }
}
