import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";
import { refreshToken } from "./refresh.ts";

export const organizationsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/organizations", register);
  app.post("/login", authenticate);

  app.patch("/token/refresh", refreshToken);
};
