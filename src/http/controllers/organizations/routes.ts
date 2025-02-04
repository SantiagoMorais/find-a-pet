import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";
import { refreshToken } from "./refresh.ts";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { organizationProfile } from "./profile.ts";
import { logOut } from "./log-out.ts";

export const organizationsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post("/organizations", register);
  app.post("/login", authenticate);

  app.patch("/token/refresh", refreshToken);

  // Authenticated Route
  app.get(
    "/organizations/profile",
    { onRequest: [verifyJWT] },
    organizationProfile
  );

  app.get("/logout", { onRequest: [verifyJWT] }, logOut);
};
