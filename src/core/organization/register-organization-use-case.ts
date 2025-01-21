import { Organization } from "@prisma/client";
import { z } from "zod";

export const registerOrganizationSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    owner: z.string(),
    email: z.string().email(),
    zipCode: z
      .string()
      .regex(/^\d{8}$/, "Zip code must contain only 8 numeric characters"),
    addressNumber: z.coerce.number(),
    whatsApp: z.number().positive().int(),
    password: z
      .string()
      .min(6, "The password must have at least 6 characters")
      .max(15, "The password must have at most 15 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterOrganizationUseCase = z.infer<
  typeof registerOrganizationSchema
>;

export type TRegisterOrganizationUseCaseResponse = {
  organization: Organization;
};
