import { z } from "zod";

export const baseSchema = z.object({
  name: z.string().optional(),
  owner: z.string().optional(),
  email: z.string().email().optional(),
  whatsapp: z.number().positive().int().optional(),
  id: z.string().uuid(),
});

export const updateOrganizationSchemaSnakeCase = baseSchema.extend({
  zip_code: z
    .string()
    .regex(/^\d{8}$/, "Zip code must contain only 8 numeric characters")
    .optional(),
  address_number: z.coerce.number().optional(),
  password_hash: z
    .string()
    .min(6, "The password must have at least 6 characters")
    .max(15, "The password must have at most 15 characters"),
  new_password: z.string().optional(),
});

export const updateOrganizationSchema = baseSchema.extend({
  zipCode: z
    .string()
    .regex(/^\d{8}$/, "Zip code must contain only 8 numeric characters")
    .optional(),
  addressNumber: z.coerce.number().optional(),
  password: z
    .string()
    .min(6, "The password must have at least 6 characters")
    .max(15, "The password must have at most 15 characters"),
  newPassword: z.string().optional(),
});

export type TUpdateOrganizationRequest = z.infer<
  typeof updateOrganizationSchema
>;

export type TUpdateOrganizationResponse = z.infer<
  typeof updateOrganizationSchemaSnakeCase
>;
