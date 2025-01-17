import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository.ts";
import { prisma } from "@/database/index.ts";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
