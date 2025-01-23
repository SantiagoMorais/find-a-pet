import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Organization Profile E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be possible to get a logged organization profile", async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    const response = await request(app.server)
      .get("/organizations/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      organization: {
        name: "Happy Paws Shelter",
        owner: "John Doe",
        email: "johndoe@test.com",
        zip_code: "31365450",
        address: "any",
        whatsapp: "5511999999999",
      },
    });
  });
});
