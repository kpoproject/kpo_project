import { expect, jest, test, describe } from "@jest/globals";
function isEqualStrict(a, b) {
  return a === b;
}

test("equality", () => {
  expect(isEqualStrict(1, 1)).toBe(true);
});
