import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env/index.ts";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, _, res) => {
  if (hasZodFastifySchemaValidationErrors(error))
    return res
      .status(400)
      .send({ message: "Validation Error", issues: error.message });

  if (env.NODE_ENV !== "production") console.log(error);

  return res.status(500).send({message: "❌💻 Internal server error."})
});
