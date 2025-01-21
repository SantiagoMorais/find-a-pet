import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  filterById(id: string): Promise<Pet | null>;
  findManyByOrganizationIds(organizationId: string[]): Promise<{ pets: Pet[] }>;
}
