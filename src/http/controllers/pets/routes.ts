import { FastifyInstance } from "fastify";
import { registerPet } from "./register.ts";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { petDetails } from "./details.ts";
import { searchPets } from "./search.ts";

export const petsRoutes = (app: FastifyInstance) => {
  app.get("/pets/search", searchPets);

  app.register((app) => {
    app.addHook("onRequest", verifyJWT);

    app.post("/pet", registerPet);
    app.get("/pet/:petId", petDetails);
  });
};
