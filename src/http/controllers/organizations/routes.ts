import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { register } from "./register.ts";

export const organizationsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/organizations", register);
};
