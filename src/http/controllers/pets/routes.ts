import { FastifyInstance } from "fastify";
import { registerPet } from "./register.ts";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { petDetails } from "./details.ts";
import { searchPets } from "./search.ts";
import { deletePet } from "./delete.ts";

export const petsRoutes = (app: FastifyInstance) => {
  app.register((app) => {
    app.addHook("onRequest", verifyJWT);

    app.post("/pet", registerPet);
    app.delete("/pet/:petId", deletePet);
  });

  app.get("/pet/:petId", petDetails);
  app.get("/pets/search", searchPets);
};
