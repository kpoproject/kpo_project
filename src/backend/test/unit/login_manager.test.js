import { expect, jest, test, describe, beforeEach } from "@jest/globals";
import { LoginManager } from "../../login_manager.js";

describe("LoginManager", () => {
  let mockDbManager;
  let loginManager;

  beforeEach(() => {
    mockDbManager = {
      getUser: jest.fn(),
      addUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    loginManager = new LoginManager(mockDbManager);
  });

  describe("constructor", () => {
    test("should throw error when dbManager is null or undefined", () => {
      expect(() => new LoginManager(null)).toThrow(
        "Null or undefind arg in Login Manager construction",
      );
      expect(() => new LoginManager(undefined)).toThrow(
        "Null or undefind arg in Login Manager construction",
      );
    });

    test("should create instance with valid dbManager", () => {
      expect(loginManager).toBeInstanceOf(LoginManager);
      expect(loginManager.db).toBe(mockDbManager);
    });
  });

  describe("login", () => {
    test("should return user id when login is successful", async () => {
      const mockResponse = { rows: [{ id: 123 }] };
      mockDbManager.getUser.mockResolvedValue(mockResponse);

      const result = await loginManager.login("user", "pass");
      expect(result).toBe(123);
      expect(mockDbManager.getUser).toHaveBeenCalledWith("user", "pass");
    });

    test("should return undefined when rows property is missing", async () => {
      const mockResponse = {};
      mockDbManager.getUser.mockResolvedValue(mockResponse);

      const result = await loginManager.login("user", "pass");
      expect(result).toBe(undefined);
    });

    test("should handle database errors", async () => {
      mockDbManager.getUser.mockRejectedValue(new Error("DB error"));

      await expect(loginManager.login("user", "pass")).rejects.toThrow(
        "DB error",
      );
    });
  });

  describe("register", () => {
    test("should return new user id when registration is successful", async () => {
      const mockResponse = { rows: [{ id: 456 }] };
      mockDbManager.addUser.mockResolvedValue(mockResponse);

      const result = await loginManager.register("newuser", "newpass");
      expect(result).toBe(456);
      expect(mockDbManager.addUser).toHaveBeenCalledWith("newuser", "newpass");
    });
  });

  describe("deleteUser", () => {
    test("should call deleteUser on dbManager and return true", async () => {
      mockDbManager.deleteUser.mockResolvedValue({});

      const result = await loginManager.deleteUser(123, "user", "pass");
      expect(result).toBe(true);
      expect(mockDbManager.deleteUser).toHaveBeenCalledWith(
        123,
        "user",
        "pass",
      );
    });
  });
});
