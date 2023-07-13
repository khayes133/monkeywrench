const router = require("./routes/index");
const request = require("supertest");

describe("Test with authentication", () => {
  test("GET /", async () => {
    // Testing "/" should result in Logged out being sent
    const res = await request(router).get("/");
    expect(res.text).toEqual("Logged out");
  });
  test("GET /graphql", async () => {
    // Testing "/graphql" should result in a redirect to login
    const res = await request(router).get("/graphql");
    expect(res.statusCode).toBe(302);
  });
});
