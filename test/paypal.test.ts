import { generateAccessToken } from "../lib/paypal";

test("generateAccessToken", async () => {
  const accessToken = await generateAccessToken();
  console.log(accessToken);
  expect(typeof accessToken).toBe("string");
  expect(accessToken.length).toBeGreaterThan(0);
});
