import { prisma } from "@/database/index.ts";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthenticateOrganization = async (
  app: FastifyInstance
) => {
  await prisma.organization.create({
    data: {
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zip_code: "31365450",
      address: "any",
      whatsapp: 5511999999999,
      password_hash: await hash("123456", 6),
      id: "organization-id",
    },
  });

  const authResponse = await request(app.server).post("/login").send({
    email: "johndoe@test.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
};
