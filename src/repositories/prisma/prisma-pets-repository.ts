import { TPetsFilterRequest } from "@/core/pet/get-many-by-city-use-case.ts";
import { prisma } from "@/database/index.ts";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import { prismaFilterPetsMappings } from "@/utils/filter-pets-mapping.ts";
import { Prisma } from "@prisma/client";
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

  async findManyByOrganizationIds(
    organizationId: string[],
    page: number,
    filter?: TPetsFilterRequest
  ) {
    const dynamicFilters = Object.entries(filter || {}).reduce(
      (acc, [key, value]) => {
        const mappedField = prismaFilterPetsMappings[key];
        if (mappedField) {
          acc[mappedField] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    const pets = await prisma.pet.findMany({
      where: {
        AND: [
          {
            organization_id: {
              in: organizationId,
            },
          },
          dynamicFilters,
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return { pets };
  }

  async delete(id: string) {
    await prisma.pet.delete({ where: { id } });
  }
}
