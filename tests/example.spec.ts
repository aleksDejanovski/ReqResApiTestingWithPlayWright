import { test, expect } from "@playwright/test";

test("get all users", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users");
  expect(response.status()).toBe(200);
});

test("get current user 3 and check response content", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/3");
  expect(response.status()).toBe(200);
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(responseBody.data.id).toBe(3);
  expect(responseBody.data.first_name).toBe("Emma");
});
