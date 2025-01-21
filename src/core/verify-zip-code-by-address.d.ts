export type TVerifyZipCodeRequest = {
  cep: string;
  city: string;
  state: string;
  street: string;
};

export type TVerifyZipCodeResponse = {
  valid: boolean;
  message: string;
};
