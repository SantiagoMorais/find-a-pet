import { Pet } from "@prisma/client";
import { z } from "zod";

const petsFilterSchema = z.object({
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
  age: z.enum(["PUPPY", "ADULT", "SENIOR"]).optional(),
  specie: z.enum(["DOG", "CAT", "BIRD", "OTHER"]).optional(),
  energyLevel: z.number().min(1).max(5).optional(),
  independencyLevel: z.number().min(1).max(3).optional(),
  spaceRequirement: z.number().min(1).max(3).optional(),
});

const getManyByCitySchema = z.object({
  city: z.string(),
  state: z.string(),
  filter: petsFilterSchema.optional(),
  page: z.number().optional().default(1),
});

export type TPetsFilterRequest = z.infer<typeof petsFilterSchema>;

export type TGetManyByCityRequest = z.infer<typeof getManyByCitySchema>;

export type TGetManyByCityResponse = {
  pets: Pet[];
};
