import { Organization } from "@prisma/client";

export type TAuthenticateOrganizationUseCase = {
  email: string;
  password: string;
};

export type TIAuthenticateOrganizationUseCaseResponse = {
  organization: Organization;
};
