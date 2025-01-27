import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
import { randomUUID } from "node:crypto";
import { spec } from "node:test/reporters";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be possible to search registered pets into a specific city", async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    await request(app.server)
      .post("/pet")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: `pet-id`,
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

    const searchPetsResponse = await request(app.server)
      .get("/pets/search")
      .query({
        city: "Typescript City",
        state: "MG",
        page: 1,
        filter: {},
      })
      .send();

    expect(searchPetsResponse.statusCode).toEqual(200);
    expect(searchPetsResponse.body.pets).toHaveLength(1);
  });

  it("should be able to filter pets", async () => {
    const { token } = await createAndAuthenticateOrganization(
      app,
      "another-org-id",
      "email01@mail.com"
    );

    for (let i = 0; i <= 10; i++) {
      await request(app.server)
        .post("/pet")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: `pet-${i}`,
          name: "Buddy",
          description: "A friendly and energetic dog.",
          specie: i % 2 === 0 ? "DOG" : "CAT",
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
          organizationId: "another-org-id",
        });
    }

    const searchPetsResponse = await request(app.server)
      .get("/pets/search")
      .query({
        city: "Typescript City",
        state: "MG",
        page: 1,
        filter: JSON.stringify({ specie: "CAT" }),
      })
      .send();

    expect(searchPetsResponse.statusCode).toEqual(200);
    expect(searchPetsResponse.body.pets).toHaveLength(5);
  });
});
