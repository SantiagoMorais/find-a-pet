import { app } from "@/app.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Organization E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it("should be possible to register an organization", async () => {
    const response = await request(app.server).post("/organizations").send({
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zipCode: "31365450",
      addressNumber: 123,
      whatsApp: 5511999999999,
      password: "123456",
      confirmPassword: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
