import { app } from "@/app.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate Organization E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be possible to refresh token", async () => {
    await request(app.server).post("/organizations").send({
      name: "Happy Paws Shelter",
      owner: "John Doe",
      email: "johndoe@test.com",
      zipCode: "31365450",
      addressNumber: 123,
      whatsApp: 5511999999999,
      password: "123456",
      confirmPassword: "123456",
    });

    const loginResponse = await request(app.server).post("/login").send({
      email: "johndoe@test.com",
      password: "123456",
    });

    const cookies = loginResponse.get("Set-Cookie");

    if (!cookies) return;

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ token: expect.any(String) });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
