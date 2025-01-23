import { FastifyInstance } from "fastify";
import { registerPet } from "./register.ts";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { petDetails } from "./details.ts";

export const petsRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJWT);

  app.post("/pet", registerPet);
  app.get("/pet/:petId", petDetails);
};
