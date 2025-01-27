import { app } from "@/app.ts";
import { createAndAuthenticateOrganization } from "@/utils/create-and-authenticate-organization.ts";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Delete Pet E2E", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a registered pet", async () => {
    const { token } = await createAndAuthenticateOrganization(app);

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

    const deleteResponse = await request(app.server)
      .delete("/pet/pet-id")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(deleteResponse.statusCode).toEqual(204);
  });
});
