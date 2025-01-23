import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env/index.ts";
import { organizationsRoutes } from "./http/controllers/organizations/routes.ts";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { petsRoutes } from "./http/controllers/pets/routes.ts";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

// Fastify Type Provider Zod Configuration
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Json Web Token
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: "10m" },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

// Cookie
app.register(fastifyCookie);

// Cors
app.register(fastifyCors, {
  origin: "*",
  credentials: true,
});

// Routes
app.register(organizationsRoutes);
app.register(petsRoutes);

// Global Error Handler
app.setErrorHandler((error, _, res) => {
  if (hasZodFastifySchemaValidationErrors(error))
    return res
      .status(400)
      .send({ message: "Validation Error", issues: error.message });

  if (env.NODE_ENV !== "production") console.log(error);

  return res
    .status(500)
    .send({ message: "❌💻 Internal server error - Global Error" });
});
