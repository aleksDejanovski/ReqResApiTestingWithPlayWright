import { test, expect } from "@playwright/test";

test("get all users", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users");
  expect(response.status()).toBe(200);
});

test("get current user 3 and check response content", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/3");
  expect(response.status()).toBe(200);
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.data.id).toBe(3);
  expect(responseBody.data.first_name).toBe("Emma");
});
test("create new user that is not registered", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    data: {
      username: "aleksDejakovski",
      email: "aleksDejanovski2@yahoo.com",
      password: "pas12ssal",
    },
  });
  const responseBody = JSON.parse(await response.text());
  expect(response.status()).toBe(400);
  console.log(responseBody);
  expect(responseBody.error).toBe(
    "Note: Only defined users succeed registration"
  );
});

test("create new user that has no password", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    data: {
      username: "aleksDejakovski",
    },
  });
  const responseBody = JSON.parse(await response.text());
  expect(response.status()).toBe(400);
  console.log(responseBody);
  expect(responseBody.error).toBe("Missing password");
});

test("get all users for page 1 and check response", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=1");
  expect(response.status()).toBe(200);
  const responseBody = JSON.parse(await response.text());
  expect(responseBody.data[0].id).toBe(1);
  expect(responseBody.data[1].first_name).toBe("Janet");
  expect(responseBody.data[2].last_name).toBe("Wong");
});
