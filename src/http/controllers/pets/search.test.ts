import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
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

    for (let i = 0; i < 10; i++) {
      await request(app.server)
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
    }

    const petsResponse = await request(app.server)
      .get("/pets/search")
      .query({
        city: "Typescript City",
        state: "MG",
        page: 1,
        filter: { specie: "DOG" },
      });

    expect(petsResponse.statusCode).toEqual(200);
  });
});
