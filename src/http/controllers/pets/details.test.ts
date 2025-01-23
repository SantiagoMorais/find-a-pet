import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Pet Details E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be possible to get the details of a registered pet", async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    const pet = await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: "pet-id",
        name: "Buddy",
        description: "A friendly and energetic dog.",
        specie: "DOG",
        age: "ADULT",
        size: "MEDIUM",
        energyLevel: 3,
        independencyLevel: 2,
        spaceRequirement: 2,
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
        ],
        adoptionRequirements: ["Needs a large yard", "Good with other dogs"],
        organizationId: "organization-id",
      });

    const detailsResponse = await request(app.server)
      .get("/pet/pet-id")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(detailsResponse.statusCode).toEqual(200);
    expect(detailsResponse.body).toEqual({
      pet: expect.objectContaining({
        id: "pet-id",
      }),
    });
  });
});
