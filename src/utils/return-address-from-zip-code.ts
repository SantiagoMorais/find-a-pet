import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.ts";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import axios from "axios";

export const returnAddressFromZipCode = async (zipCode: string) => {
  const zipCodeRegex = /^\d{8}$/;
  if (!zipCodeRegex.test(zipCode)) {
    throw new InvalidCredentialsError(
      "Zip code must contain only 8 numeric characters"
    );
  }

  try {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );

    if (data.erro)
      throw new ResourceNotFoundError("No address found for this ZIP code");

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return new ResourceNotFoundError();
    throw error;
  }
};
