import { z } from "zod";

export const searchPetsFilterQuerySchema = z.object({
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
});

export type TSearchPetsFilterQuery = z.infer<
  typeof searchPetsFilterQuerySchema
>;
