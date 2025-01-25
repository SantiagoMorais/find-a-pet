import { TPetsFilterRequest } from "@/core/pet/get-many-by-city-use-case.ts";
import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  filterById(id: string): Promise<Pet | null>;
  findManyByOrganizationIds(
    organizationId: string[],
    page: number,
    filter: TPetsFilterRequest | {}
  ): Promise<{ pets: Pet[] }>;
}
