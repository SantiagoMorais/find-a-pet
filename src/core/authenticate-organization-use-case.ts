import { Organization } from "@prisma/client";
import { z } from "zod";

export const authenticateOrganizationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "The password must have at least 6 characters")
    .max(15, "The password must have at most 15 characters"),
});

export type TAuthenticateOrganizationUseCase = z.infer<
  typeof authenticateOrganizationSchema
>;

export type TIAuthenticateOrganizationUseCaseResponse = {
  organization: Organization;
};
