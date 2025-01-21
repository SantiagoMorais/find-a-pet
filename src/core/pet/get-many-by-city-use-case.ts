import { Pet } from "@prisma/client";
import { z } from "zod";

const getManyByCitySchema = z.object({
  city: z.string(),
  state: z.string(),
});

export type TGetManyByCityRequest = z.infer<typeof getManyByCitySchema>;

export type TGetManyByCityResponse = {
  pets: Pet[];
};
