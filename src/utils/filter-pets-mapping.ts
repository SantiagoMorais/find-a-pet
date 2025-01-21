import { Pet } from "@prisma/client";

export const filterPetsMappings: { [key: string]: (pet: Pet) => any } = {
  size: (pet) => pet.size,
  age: (pet) => pet.age,
  specie: (pet) => pet.specie,
  energyLevel: (pet) => pet.energy_level,
  independencyLevel: (pet) => pet.independency_level,
  spaceRequirement: (pet) => pet.space_requirement,
};

export const prismaFilterPetsMappings: { [key: string]: string } = {
  size: "size",
  age: "age",
  specie: "specie",
  energyLevel: "energy_level",
  independencyLevel: "independency_level",
  spaceRequirement: "space_requirement",
};
