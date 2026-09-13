import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcrypt";

vi.mock("bcrypt", () => {
  const hash = vi.fn();
  const compare = vi.fn();
  return { hash, compare, default: { hash, compare } };
});

vi.mock("../../repositories/user.repository.js", () => ({
  default: {
    registerUser: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(),
    getUsers: vi.fn(),
    fetchNewUserByWeek: vi.fn(),
    getTotalUser: vi.fn(),
    getUserInfo: vi.fn(),
    updateProfile: vi.fn(),
    updatePassword: vi.fn(),
  },
}));

vi.mock("../../utils/jwt.js", () => ({
  generateAccessToken: vi.fn(),
  generateRefreshToken: vi.fn(),
  verifyRefreshToken: vi.fn(),
}));

vi.mock("../../utils/newUserByWeek.js", () => ({
  fetchUserByWeek: vi.fn(),
}));

import UserService from "../../services/user.service.js";
import UserRepository from "../../repositories/user.repository.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { fetchUserByWeek } from "../../utils/newUserByWeek.js";

const mockedUser = {
  id: 1,
  name: "Michael Delos Santos",
  email: "michael@example.com",
  contact: "09171234567",
  passwordHash: "$2b$12$abcdefghijklmnopqrstuv",
  role: "Member",
  status: "Active",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

const registerPayload = {
  name: "Michael Delos Santos",
  email: "michael@example.com",
  contact: "09171234567",
  password: "StrongPass1!",
  confirmPassword: "StrongPass1!",
};

const bcryptHashMock = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;
const bcryptCompareMock = bcrypt.compare as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UserService.registerUser", () => {
  it("should register a user, hash the password with 12 rounds and return the sanitized payload with a token", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(null);
    bcryptHashMock.mockResolvedValue("hashed-password");
    vi.mocked(UserRepository.registerUser).mockResolvedValue(mockedUser as never);
    vi.mocked(generateAccessToken).mockReturnValue("jwt-token");

    const result = await UserService.registerUser(registerPayload);

    expect(UserRepository.findByEmail).toHaveBeenCalledWith(registerPayload.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(registerPayload.password, 12);
    expect(UserRepository.registerUser).toHaveBeenCalledWith({
      name: registerPayload.name,
      email: registerPayload.email,
      contact: registerPayload.contact,
      passwordHash: "hashed-password",
    });
    expect(generateAccessToken).toHaveBeenCalledWith({
      id: mockedUser.id,
      name: mockedUser.name,
      email: mockedUser.email,
      role: mockedUser.role,
    });
    expect(result).toEqual({
      id: 1,
      name: "Michael Delos Santos",
      email: "michael@example.com",
      role: "Member",
      token: "jwt-token",
    });
    expect(result).not.toHaveProperty("passwordHash");
    expect(result).not.toHaveProperty("contact");
  });

  it("should throw a 400 AppError when the email is already registered", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(mockedUser as never);

    await expect(UserService.registerUser(registerPayload)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Email already exist",
    });

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(UserRepository.registerUser).not.toHaveBeenCalled();
  });
});

describe("UserService.loginUser", () => {
  it("should return the access and refresh tokens on valid credentials", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(mockedUser as never);
    bcryptCompareMock.mockResolvedValue(true);
    vi.mocked(generateAccessToken).mockReturnValue("jwt-token");
    vi.mocked(generateRefreshToken).mockReturnValue("refresh-token");

    const result = await UserService.loginUser({
      email: "michael@example.com",
      password: "StrongPass1!",
    });

    expect(UserRepository.findByEmail).toHaveBeenCalledWith("michael@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("StrongPass1!", mockedUser.passwordHash);
    expect(generateAccessToken).toHaveBeenCalledWith({
      id: 1,
      name: "Michael Delos Santos",
      email: "michael@example.com",
      role: "Member",
    });
    expect(generateRefreshToken).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual({
      accessToken: "jwt-token",
      refreshToken: "refresh-token",
    });
  });

  it("should throw a 401 AppError when the email does not exist", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(null);

    await expect(
      UserService.loginUser({ email: "ghost@example.com", password: "WrongPass1!" }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 401,
      message: "Incorrect Credentials",
    });

    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("should throw a 401 AppError when the password is incorrect", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(mockedUser as never);
    bcryptCompareMock.mockResolvedValue(false);

    await expect(
      UserService.loginUser({ email: "michael@example.com", password: "WrongPass1!" }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 401,
      message: "Incorrect Credentials",
    });

    expect(generateAccessToken).not.toHaveBeenCalled();
  });
});

describe("UserService.getCurrentUser", () => {
  it("should return the user when found", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);

    const result = await UserService.getCurrentUser(1);

    expect(UserRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockedUser);
  });

  it("should throw a 404 AppError when the user does not exist", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(UserService.getCurrentUser(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });
  });
});

describe("UserService.getUsers", () => {
  it("should use default page, limit and empty search", async () => {
    vi.mocked(UserRepository.getUsers).mockResolvedValue({ users: [], total: 0 } as never);

    const result = await UserService.getUsers();

    expect(UserRepository.getUsers).toHaveBeenCalledWith(1, 8, undefined);
    expect(result).toEqual({
      users: [],
      total: 0,
      pagination: { page: 1, limit: 8, total: 0, totalPages: 0 },
    });
  });

  it("should clamp page below 1 and limit above 50, and trim the search term", async () => {
    vi.mocked(UserRepository.getUsers).mockResolvedValue({
      users: [{ id: 1 }] as never,
      total: 40,
    });

    const result = await UserService.getUsers(-3, 100, "   jane  ");

    expect(UserRepository.getUsers).toHaveBeenCalledWith(1, 50, "jane");
    expect(result.pagination).toEqual({ page: 1, limit: 50, total: 40, totalPages: 1 });
  });

  it("should convert a whitespace-only search into undefined", async () => {
    vi.mocked(UserRepository.getUsers).mockResolvedValue({ users: [], total: 0 } as never);

    await UserService.getUsers(0, 5, "   ");

    expect(UserRepository.getUsers).toHaveBeenCalledWith(1, 5, undefined);
  });

  it("should clamp a limit below 1 to 1", async () => {
    vi.mocked(UserRepository.getUsers).mockResolvedValue({ users: [], total: 0 } as never);

    await UserService.getUsers(1, 0);

    expect(UserRepository.getUsers).toHaveBeenCalledWith(1, 1, undefined);
  });

  it("should compute totalPages using Math.ceil(total / pageSize)", async () => {
    vi.mocked(UserRepository.getUsers).mockResolvedValue({ users: [], total: 21 } as never);

    const result = await UserService.getUsers(2, 8);

    expect(UserRepository.getUsers).toHaveBeenCalledWith(2, 8, undefined);
    expect(result.pagination).toEqual({ page: 2, limit: 8, total: 21, totalPages: 3 });
  });
});

describe("UserService.fetchNewUserByWeek", () => {
  it("should fetch the count using the week boundaries from fetchUserByWeek", async () => {
    const startOfWeek = new Date("2026-09-07T00:00:00.000Z");
    const endOfWeek = new Date("2026-09-14T00:00:00.000Z");
    vi.mocked(fetchUserByWeek).mockReturnValue({ startOfWeek, endOfWeek });
    vi.mocked(UserRepository.fetchNewUserByWeek).mockResolvedValue(7);

    const result = await UserService.fetchNewUserByWeek();

    expect(fetchUserByWeek).toHaveBeenCalledTimes(1);
    expect(UserRepository.fetchNewUserByWeek).toHaveBeenCalledWith(startOfWeek, endOfWeek);
    expect(result).toBe(7);
  });
});

describe("UserService.getTotalUser", () => {
  it("should return the total member count", async () => {
    vi.mocked(UserRepository.getTotalUser).mockResolvedValue(42);

    const result = await UserService.getTotalUser();

    expect(UserRepository.getTotalUser).toHaveBeenCalledTimes(1);
    expect(result).toBe(42);
  });
});

describe("UserService.getUserInfo", () => {
  it("should return the user info when the user exists", async () => {
    const userInfo = {
      id: 1,
      name: "Michael Delos Santos",
      email: "michael@example.com",
      status: "Active",
      contact: "09171234567",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    };
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);
    vi.mocked(UserRepository.getUserInfo).mockResolvedValue(userInfo as never);

    const result = await UserService.getUserInfo(1);

    expect(UserRepository.findById).toHaveBeenCalledWith(1);
    expect(UserRepository.getUserInfo).toHaveBeenCalledWith(1);
    expect(result).toEqual(userInfo);
  });

  it("should throw a 404 AppError when the user does not exist", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(UserService.getUserInfo(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });

    expect(UserRepository.getUserInfo).not.toHaveBeenCalled();
  });
});

describe("UserService.updateProfile", () => {
  const updateProfilePayload = {
    name: "Juan Dela Cruz",
    contact: "09991234567",
  };

  it("should throw a 404 AppError when the user does not exist", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(
      UserService.updateProfile(999, updateProfilePayload),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });

    expect(UserRepository.updateProfile).not.toHaveBeenCalled();
  });

  it("should update the name and contact when the user exists", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);
    vi.mocked(UserRepository.updateProfile).mockResolvedValue({
      id: 1,
      name: "Juan Dela Cruz",
      email: "michael@example.com",
      status: "Active",
      contact: "09991234567",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    } as never);

    const result = await UserService.updateProfile(1, updateProfilePayload);

    expect(UserRepository.updateProfile).toHaveBeenCalledWith(
      1,
      updateProfilePayload,
    );
    expect(result).toMatchObject({
      name: "Juan Dela Cruz",
      contact: "09991234567",
    });
  });
});

describe("UserService.changePassword", () => {
  const changePasswordPayload = {
    currentPassword: "OldPass1!",
    newPassword: "NewPass1!",
    confirmPassword: "NewPass1!",
  };

  // Mirrors the login flow: findById for the logged-in user, then
  // findByEmail (email is unique) to fetch the registered hash.
  const mockAccountRecord = () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);
    vi.mocked(UserRepository.findByEmail).mockResolvedValue({
      id: 1,
      name: "Michael Delos Santos",
      email: "michael@example.com",
      passwordHash: "$2b$12$hashedcurrentpassword",
    } as never);
  };

  it("should throw a 404 AppError when the user does not exist", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(
      UserService.changePassword(999, changePasswordPayload),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });

    expect(UserRepository.findByEmail).not.toHaveBeenCalled();
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(UserRepository.updatePassword).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the current password is incorrect", async () => {
    mockAccountRecord();
    bcryptCompareMock.mockResolvedValue(false);

    await expect(
      UserService.changePassword(1, changePasswordPayload),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Current password is incorrect",
    });

    expect(UserRepository.findById).toHaveBeenCalledWith(1);
    expect(UserRepository.findByEmail).toHaveBeenCalledWith(mockedUser.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(UserRepository.updatePassword).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the account record no longer exists", async () => {
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(null);

    await expect(
      UserService.changePassword(1, changePasswordPayload),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "User not found",
    });

    expect(UserRepository.findByEmail).toHaveBeenCalledWith(mockedUser.email);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(UserRepository.updatePassword).not.toHaveBeenCalled();
  });

  it("should hash the new password and update it when the current password matches", async () => {
    mockAccountRecord();
    bcryptCompareMock.mockResolvedValue(true);
    bcryptHashMock.mockResolvedValue("new-hashed-password");
    vi.mocked(UserRepository.updatePassword).mockResolvedValue({
      id: 1,
    } as never);

    const result = UserService.changePassword(1, changePasswordPayload);

    // Guarantees the hash / user record is never returned or leaked.
    await expect(result).resolves.toBeUndefined();

    expect(UserRepository.findById).toHaveBeenCalledWith(1);
    expect(UserRepository.findByEmail).toHaveBeenCalledWith(mockedUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "OldPass1!",
      "$2b$12$hashedcurrentpassword",
    );
    expect(bcrypt.hash).toHaveBeenCalledWith("NewPass1!", 12);
    expect(UserRepository.updatePassword).toHaveBeenCalledWith(
      1,
      "new-hashed-password",
    );
  });
});

describe("UserService.refreshAccessToken", () => {
  it("should throw a 401 AppError when no refresh token is provided", async () => {
    await expect(UserService.refreshAccessToken(undefined)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 401,
      message: "Refresh token not found!",
    });

    expect(verifyRefreshToken).not.toHaveBeenCalled();
  });

  it("should throw a 401 AppError when the refresh token is invalid or expired", async () => {
    vi.mocked(verifyRefreshToken).mockReturnValue(null as never);

    await expect(
      UserService.refreshAccessToken("bad-token"),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 401,
      message: "Inavlid or Expired refresh token",
    });

    expect(verifyRefreshToken).toHaveBeenCalledWith("bad-token");
    expect(UserRepository.findById).not.toHaveBeenCalled();
  });

  it("should throw a 401 AppError when the user no longer exists", async () => {
    vi.mocked(verifyRefreshToken).mockReturnValue({ id: 1 } as never);
    vi.mocked(UserRepository.findById).mockResolvedValue(null);

    await expect(
      UserService.refreshAccessToken("valid-token"),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 401,
      message: "User not found",
    });

    expect(generateAccessToken).not.toHaveBeenCalled();
  });

  it("should return a new access token for a valid refresh token", async () => {
    vi.mocked(verifyRefreshToken).mockReturnValue({ id: 1 } as never);
    vi.mocked(UserRepository.findById).mockResolvedValue(mockedUser as never);
    vi.mocked(generateAccessToken).mockReturnValue("new-access-token");

    const result = await UserService.refreshAccessToken("valid-token");

    expect(verifyRefreshToken).toHaveBeenCalledWith("valid-token");
    expect(UserRepository.findById).toHaveBeenCalledWith(1);
    expect(generateAccessToken).toHaveBeenCalledWith({
      id: mockedUser.id,
      name: mockedUser.name,
      email: mockedUser.email,
      role: mockedUser.role,
    });
    expect(result).toBe("new-access-token");
  });
});
