import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Pet E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be possible to register a new pet into an ORG", async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    console.log(token);
    

    const petsResponse = await request(app.server)
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

    expect(petsResponse.statusCode).toEqual(201);
  });
});
