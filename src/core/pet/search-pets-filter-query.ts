import { z } from "zod";

export const searchPetsFilterQuerySchema = z.object({
  specie: z.enum(["DOG", "CAT", "BIRD", "OTHER"]).optional(),
  age: z.enum(["PUPPY", "ADULT", "SENIOR"]).optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  energyLevel: z.coerce.number().refine((value) => value >= 1 && value <= 5, {
    message: "The energy level must be between 1 and 5",
  }).optional(),
  independencyLevel: z.coerce
    .number()
    .refine((value) => value >= 1 && value <= 3, {
      message: "The independency level must be between 1 and 3",
    }).optional(),
  spaceRequirement: z.coerce
    .number()
    .refine((value) => value >= 1 && value <= 3, {
      message: "The space requirement must be between 1 and 3",
    }).optional(),
});

export type TSearchPetsFilterQuery = z.infer<
  typeof searchPetsFilterQuerySchema
>;
