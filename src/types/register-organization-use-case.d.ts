import { Organization } from "@prisma/client";

export type TRegisterOrganizationUseCase = {
  id: string;
  name: string;
  owner: string;
  email: string;
  address: string;
  cep: string;
  whatsApp: number;
  password: string;
  confirmPassword: string;
};

export type TRegisterOrganizationUseCaseResponse = {
  organization: Organization;
};
