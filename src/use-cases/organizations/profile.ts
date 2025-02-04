import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

export class OrganizationProfileUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ organizationId }: { organizationId: string }) {
    const organization =
      await this.organizationsRepository.findById(organizationId);

    if (!organization) throw new ResourceNotFoundError();

    const { id, created_at, password_hash, token, ...rest } = organization;
    return { organization: rest };
  }
}
