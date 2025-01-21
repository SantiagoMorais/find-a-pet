export class InvalidCredentialsError extends Error {
  constructor(message: string = "Invalid Credentials") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
