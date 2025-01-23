import { Pet } from "@prisma/client";
import { z } from "zod";

export const registerPetSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().refine((value) => value.length >= 1 && value.length <= 50, {
    message: "Name must be between 1 and 50 characters",
  }),
  description: z
    .string()
    .refine((value) => value.length >= 1 && value.length <= 200, {
      message: "Description must be between 1 and 200 characters",
    }),
  specie: z.enum(["DOG", "CAT", "BIRD", "OTHER"]),
  age: z.enum(["PUPPY", "ADULT", "SENIOR"]),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  energyLevel: z.coerce.number().refine((value) => value >= 1 && value <= 5, {
    message: "The energy level must be between 1 and 5",
  }),
  independencyLevel: z.coerce
    .number()
    .refine((value) => value >= 1 && value <= 3, {
      message: "The independency level must be between 1 and 3",
    }),
  spaceRequirement: z.coerce
    .number()
    .refine((value) => value >= 1 && value <= 3, {
      message: "The space requirement must be between 1 and 3",
    }),
  photos: z.string().url().array().optional(),
  adoptionRequirements: z.string().array().optional(),
  organizationId: z.string().uuid(),
});

export type TRegisterPetUseCase = z.infer<typeof registerPetSchema>;

export type TRegisterPetUseCaseResponse = { pet: Pet };
