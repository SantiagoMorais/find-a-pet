import { TSearchPetsFilterQuery } from "@/core/pet/search-pets-filter-query.ts";
import { makeSearchPetsUseCase } from "@/use-cases/factories/pet/make-search-pets-use-case.ts";
import { FastifyReply, FastifyRequest } from "fastify";

export const searchPets = async (
  req: FastifyRequest<{
    Querystring: {
      city: string;
      state: string;
      page: number;
      filter?: string;
    };
  }>,
  res: FastifyReply
) => {
  const { city, state, page, filter } = req.query;

  let filters: Partial<TSearchPetsFilterQuery> = {};
  if (filter) {
    try {
      filters = JSON.parse(filter);
    } catch (error) {
      console.error("Error parsing filter:", error);
    }
  }

  const useCase = makeSearchPetsUseCase();
  const pets = await useCase.execute({
    city,
    state,
    page,
    filter: filters,
  });

  return res.status(200).send(pets);
};
