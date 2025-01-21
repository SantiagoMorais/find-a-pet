import { Pet } from "@prisma/client";
import { z } from "zod";

const getManyByCitySchema = z.object({
  city: z.string(),
  state: z.string(),
  filter: z
    .object({
      size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
      age: z.enum(["PUPPY", "ADULT", "SENIOR"]).optional(),
      specie: z.enum(["DOG", "CAT", "BIRD", "OTHER"]).optional(),
      energyLevel: z.number().min(1).max(5).optional(),
      independencyLevel: z.number().min(1).max(3).optional(),
      spaceRequirement: z.number().min(1).max(3).optional(),
    })
    .optional(),
});

export type TGetManyByCityRequest = z.infer<typeof getManyByCitySchema>;

export type TGetManyByCityResponse = {
  pets: Pet[];
};
