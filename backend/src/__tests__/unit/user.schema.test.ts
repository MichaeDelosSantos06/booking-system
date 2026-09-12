import { describe, expect, it } from "vitest";
import {
  registerSchema,
  updateProfileSchema,
} from "../../schema/user.schema.js";

const validContact = "09171234567";

const validRegisterPayload = {
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  contact: validContact,
  password: "StrongPass1!",
  confirmPassword: "StrongPass1!",
};

describe("User contact validation (Philippine 11-digit mobile)", () => {
  it.each(["09171234567", "09001234567", "09991234567"])(
    "registerSchema should accept the 11-digit number %s",
    (contact) => {
      const result = registerSchema.safeParse({
        ...validRegisterPayload,
        contact,
      });

      expect(result.success).toBe(true);
    },
  );

  it.each([
    ["empty", ""],
    ["spaces only", "    "],
    ["10 digits", "0917123456"],
    ["12 digits", "091712345678"],
    ["does not start with 09", "19171234567"],
    ["contains a letter", "09a71234567"],
    ["contains a space", "0917 1234567"],
    ["contains special characters", "0917-1234567"],
  ])("registerSchema should reject a contact that %s", (_label, contact) => {
    const result = registerSchema.safeParse({
      ...validRegisterPayload,
      contact,
    });

    expect(result.success).toBe(false);
  });

  it("updateProfileSchema should accept an 11-digit number", () => {
    const result = updateProfileSchema.safeParse({
      name: "Juan Dela Cruz",
      contact: validContact,
    });

    expect(result.success).toBe(true);
  });

  it.each([
    ["10 digits", "0917123456"],
    ["12 digits", "091712345678"],
    ["contains a letter", "09a71234567"],
  ])("updateProfileSchema should reject a contact that %s", (_label, contact) => {
    const result = updateProfileSchema.safeParse({
      name: "Juan Dela Cruz",
      contact,
    });

    expect(result.success).toBe(false);
  });

  it("should surface a clear error message for an invalid contact", () => {
    const result = registerSchema.safeParse({
      ...validRegisterPayload,
      contact: "09a71234567",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const contactIssue = result.error.issues.find(
        (issue) => issue.path[0] === "contact",
      );

      expect(contactIssue?.message).toContain("11-digit");
    }
  });
});