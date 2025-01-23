import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";

export const organizationsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/organizations", register);
  app.post("/login", authenticate);
};
