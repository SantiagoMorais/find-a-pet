import { prisma } from "@/database/index.ts";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository.ts";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async filterById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (!pet) throw new ResourceNotFoundError();

    return pet;
  }

  async findManyByOrganizationIds(organizationId: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationId,
        },
      },
    });

    return { pets };
  }
}
