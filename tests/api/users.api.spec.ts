import { test, expect } from "@playwright/test";

test.describe("Posts API", () => {
  test("GET posts returns 200", async ({ request }) => {
    const response = await request.get("/posts");
    expect(response.status()).toBe(200);
  });

  test("GET posts returns array", async ({ request }) => {
    const response = await request.get("/posts");
    const body = await response.json();
    expect(body).toBeInstanceOf(Array);
  });

  test("GET single post returns correct data", async ({ request }) => {
    const response = await request.get("/posts/1");
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");
  });

  test("GET non-existent post returns 404", async ({ request }) => {
    const response = await request.get("/posts/999");
    expect(response.status()).toBe(404);
  });

  test("Response time is under 2000ms", async ({ request }) => {
    const start = Date.now();
    await request.get("/posts");
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(2000);
  });
});