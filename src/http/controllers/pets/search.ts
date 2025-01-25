import { TSearchPetsFilterQuery } from "@/core/pet/search-pets-filter-query.ts";
import { makeSearchPetsUseCase } from "@/use-cases/factories/pet/make-search-pets-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const searchPets = async (
  req: FastifyRequest<{
    Querystring: {
      city: string;
      state: string;
      page: number;
      filter: TSearchPetsFilterQuery;
    };
  }>,
  res: FastifyReply
) => {
  const { city, state, page, filter } = req.query;

  try {
    const useCase = makeSearchPetsUseCase();
    const pets = await useCase.execute({
      city,
      state,
      page,
      filter: {
        age: filter.age,
        energyLevel: filter.energyLevel,
        independencyLevel: filter.independencyLevel,
        size: filter.size,
        spaceRequirement: filter.spaceRequirement,
        specie: filter.specie,
      },
    });

    return res.status(200).send(pets);
  } catch (error) {

  }
};
