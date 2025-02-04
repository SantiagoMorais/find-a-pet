import { OrganizationsRepository } from "@/repositories/organizations-repository.ts";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.ts";

export class OrganizationToken {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(id: string) {
    const organization = await this.organizationsRepository.findById(id);
    if (!organization) throw new ResourceNotFoundError();

    const { token } = organization;    
    return { token };
  }
}
