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
  },
}));

vi.mock("../../utils/jwt.js", () => ({
  generateAccessToken: vi.fn(),
}));

vi.mock("../../utils/newUserByWeek.js", () => ({
  fetchUserByWeek: vi.fn(),
}));

import UserService from "../../services/user.service.js";
import UserRepository from "../../repositories/user.repository.js";
import { generateAccessToken } from "../../utils/jwt.js";
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
  it("should return the user with a token on valid credentials", async () => {
    vi.mocked(UserRepository.findByEmail).mockResolvedValue(mockedUser as never);
    bcryptCompareMock.mockResolvedValue(true);
    vi.mocked(generateAccessToken).mockReturnValue("jwt-token");

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
    expect(result).toEqual({
      id: 1,
      name: "Michael Delos Santos",
      email: "michael@example.com",
      role: "Member",
      token: "jwt-token",
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
