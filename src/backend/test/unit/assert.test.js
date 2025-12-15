import { expect, jest, test, describe, beforeEach } from "@jest/globals";
import { assert } from "../../assert.js";

describe("assert utility", () => {
  test("should not throw error when expression is truthy", () => {
    expect(() => assert(true, "Should not throw")).not.toThrow();
    expect(() => assert(1, "Should not throw")).not.toThrow();
    expect(() => assert("test", "Should not throw")).not.toThrow();
    expect(() => assert({}, "Should not throw")).not.toThrow();
  });

  test("should throw error with correct message when expression is falsy", () => {
    expect(() => assert(false, "Test error")).toThrow("Test error");
    expect(() => assert(0, "Zero error")).toThrow("Zero error");
    expect(() => assert("", "Empty error")).toThrow("Empty error");
    expect(() => assert(null, "Null error")).toThrow("Null error");
    expect(() => assert(undefined, "Undefined error")).toThrow(
      "Undefined error",
    );
  });

  test("should throw Error instance", () => {
    try {
      assert(false, "Custom error");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Custom error");
    }
  });
});
