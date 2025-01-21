import {
  TVerifyZipCodeRequest,
  TVerifyZipCodeResponse,
} from "@/core/verify-zip-code-by-address.js";
import { TViaCepAPIResponse } from "@/core/via-cep-api-response.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.ts";
import axios from "axios";

export const verifyZipCodeByAddress = async ({
  cep,
  city,
  state,
  street,
}: TVerifyZipCodeRequest): Promise<TVerifyZipCodeResponse> => {
  try {
    const url = `https://viacep.com.br/ws/${state}/${city}/${street}/json/`;
    const response = await axios.get<TViaCepAPIResponse[]>(url);

    const matchingAddresses = response.data.filter(
      (address) => address.cep.replace("-", "") === cep
    );

    if (matchingAddresses.length > 0) {
      return {
        valid: true,
        message: "Address and ZIP code match successfully",
      };
    }

    return {
      valid: false,
      message: "ZIP code does not match the provided address",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400)
        return {
          valid: false,
          message: "Invalid address format. Please check the input data.",
        };

      if (error.response && error.response?.status >= 500)
        return {
          valid: false,
          message: "Server error. Please try again later.",
        };
    }

    throw new ResourceNotFoundError();
  }
};
