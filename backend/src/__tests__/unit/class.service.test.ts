import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CreateClassDto } from "../../types/class.type.js";

vi.mock("../../repositories/class.repositoy.js", () => ({
  default: {
    addClass: vi.fn(),
    findByClassnName: vi.fn(),
    findClassById: vi.fn(),
    findClassNameExceptId: vi.fn(),
    fetchClasses: vi.fn(),
    searchClasses: vi.fn(),
    deleteDataById: vi.fn(),
    updateClass: vi.fn(),
    getInactiveClass: vi.fn(),
    getActiveClass: vi.fn(),
  },
}));

vi.mock("../../repositories/trainer.repositoy.js", () => ({
  default: { findTrainerById: vi.fn() },
}));

vi.mock("../../services/cloudinary.service.js", () => ({
  uploadImage: vi.fn(),
}));

vi.mock("../../repositories/schedule.repository.js", () => ({
  default: { deleteByClass: vi.fn() },
}));

vi.mock("../../repositories/booking.repository.js", () => ({
  default: { updateStatusByClassDelete: vi.fn() },
}));

vi.mock("../../lib/prisma.js", () => ({
  default: { $transaction: vi.fn() },
}));

import ClassService from "../../services/class.service.js";
import ClassRepository from "../../repositories/class.repositoy.js";
import TrainerRepository from "../../repositories/trainer.repositoy.js";
import ScheduleRepository from "../../repositories/schedule.repository.js";
import BookingRepository from "../../repositories/booking.repository.js";
import prisma from "../../lib/prisma.js";
import { uploadImage } from "../../services/cloudinary.service.js";

const transactionMock = prisma.$transaction as unknown as ReturnType<typeof vi.fn>;

const classDto: CreateClassDto = {
  className: "Yoga Basics",
  description: "A gentle yoga class for beginners",
  duration: 60,
  category: "Flexibility",
  difficulty: "Beginner",
  status: "Active",
  trainerId: 1,
};

const image = {
  buffer: Buffer.from("image-data"),
  mimetype: "image/jpeg",
  originalname: "class.jpg",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ClassService.addClass", () => {
  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(ClassService.addClass(classDto)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer not found!",
    });

    expect(ClassRepository.findByClassnName).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the class name is already registered", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findByClassnName).mockResolvedValue({ id: 2 } as never);

    await expect(ClassService.addClass(classDto)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Class already registered",
    });

    expect(ClassRepository.addClass).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the duration is 300 minutes or more", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findByClassnName).mockResolvedValue(null);

    await expect(
      ClassService.addClass({ ...classDto, duration: 300 }),
    ).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Duration cannot exceed 5hrs",
    });

    expect(ClassRepository.addClass).not.toHaveBeenCalled();
  });

  it("should create the class without uploading an image when no image is provided", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findByClassnName).mockResolvedValue(null);
    vi.mocked(ClassRepository.addClass).mockResolvedValue({ id: 1, ...classDto } as never);

    const result = await ClassService.addClass(classDto);

    expect(uploadImage).not.toHaveBeenCalled();
    expect(ClassRepository.addClass).toHaveBeenCalledWith(classDto, undefined, undefined);
    expect(result).toMatchObject({ className: "Yoga Basics" });
  });

  it("should upload an image and pass the url and public id when an image is provided", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findByClassnName).mockResolvedValue(null);
    vi.mocked(uploadImage).mockResolvedValue({
      secure_url: "https://res.cloudinary.com/class.jpg",
      public_id: "fitbook/classes/abc",
    } as never);
    vi.mocked(ClassRepository.addClass).mockResolvedValue({ id: 1, ...classDto } as never);

    await ClassService.addClass(classDto, image);

    expect(uploadImage).toHaveBeenCalledWith(image.buffer, "fitbook/classes");
    expect(ClassRepository.addClass).toHaveBeenCalledWith(
      classDto,
      "https://res.cloudinary.com/class.jpg",
      "fitbook/classes/abc",
    );
  });
});

describe("ClassService.fetchClasses", () => {
  it("should return classes when found", async () => {
    vi.mocked(ClassRepository.fetchClasses).mockResolvedValue([{ id: 1 }] as never);

    const result = await ClassService.fetchClasses();

    expect(ClassRepository.fetchClasses).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should forward the status filter", async () => {
    vi.mocked(ClassRepository.fetchClasses).mockResolvedValue([{ id: 1 }] as never);

    await ClassService.fetchClasses("Active");

    expect(ClassRepository.fetchClasses).toHaveBeenCalledWith("Active");
  });

  it("should return an empty array when no classes are found", async () => {
    vi.mocked(ClassRepository.fetchClasses).mockResolvedValue([]);

    await expect(ClassService.fetchClasses()).resolves.toEqual([]);
  });

  it("should throw a 404 AppError when the repository returns null", async () => {
    vi.mocked(ClassRepository.fetchClasses).mockResolvedValue(null as never);

    await expect(ClassService.fetchClasses()).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "No Classes Found.",
    });
  });
});

describe("ClassService.searchClasses", () => {
  it("should use default page, limit and empty search", async () => {
    vi.mocked(ClassRepository.searchClasses).mockResolvedValue({
      classes: [],
      total: 0,
    } as never);

    const result = await ClassService.searchClasses();

    expect(ClassRepository.searchClasses).toHaveBeenCalledWith(1, 5, undefined);
    expect(result).toEqual({
      classes: [],
      total: 0,
      pagination: { page: 1, limit: 5, total: 0, totalPages: 0 },
    });
  });

  it("should clamp page and limit, and trim the search term", async () => {
    vi.mocked(ClassRepository.searchClasses).mockResolvedValue({
      classes: [{ id: 1 }] as never,
      total: 55,
    });

    const result = await ClassService.searchClasses(-2, 100, "  pilates ");

    expect(ClassRepository.searchClasses).toHaveBeenCalledWith(1, 50, "pilates");
    expect(result.pagination).toEqual({ page: 1, limit: 50, total: 55, totalPages: 2 });
  });

  it("should convert a whitespace-only search into undefined", async () => {
    vi.mocked(ClassRepository.searchClasses).mockResolvedValue({
      classes: [],
      total: 0,
    } as never);

    await ClassService.searchClasses(1, 5, "   ");

    expect(ClassRepository.searchClasses).toHaveBeenCalledWith(1, 5, undefined);
  });
});

describe("ClassService.deleteDataById", () => {
  it("should throw a 404 AppError when the class does not exist", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue(null);

    await expect(ClassService.deleteDataById(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Class not found",
    });

    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("should cancel affected bookings, soft-delete schedules and the class in order", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 7 } as never);

    const callSequence: string[] = [];
    const fakeTx = {};
    transactionMock.mockImplementation(async (callback) => callback(fakeTx));
    vi.mocked(BookingRepository.updateStatusByClassDelete).mockImplementation(
      async () => {
        callSequence.push("bookings");
        return { count: 2 } as never;
      },
    );
    vi.mocked(ScheduleRepository.deleteByClass).mockImplementation(async () => {
      callSequence.push("schedules");
      return { count: 5 } as never;
    });
    vi.mocked(ClassRepository.deleteDataById).mockImplementation(async () => {
      callSequence.push("classes");
      return { id: 7, deletedAt: new Date() } as never;
    });

    await ClassService.deleteDataById(7);

    expect(ClassRepository.findClassById).toHaveBeenCalledWith(7);
    expect(transactionMock).toHaveBeenCalledTimes(1);
    expect(BookingRepository.updateStatusByClassDelete).toHaveBeenCalledWith(fakeTx, 7);
    expect(ScheduleRepository.deleteByClass).toHaveBeenCalledWith(fakeTx, 7);
    expect(ClassRepository.deleteDataById).toHaveBeenCalledWith(fakeTx, 7);
    expect(callSequence).toEqual(["bookings", "schedules", "classes"]);
  });
});

describe("ClassService.updateClass", () => {
  it("should throw a 404 AppError when the class does not exist", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue(null);

    await expect(ClassService.updateClass(1, classDto)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Class not found!",
    });

    expect(ClassRepository.updateClass).not.toHaveBeenCalled();
  });

  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(ClassService.updateClass(1, classDto)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Triner not found!",
    });

    expect(ClassRepository.updateClass).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when another class uses the same name", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassNameExceptId).mockResolvedValue({ id: 2 } as never);

    await expect(ClassService.updateClass(1, classDto)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Class already exists!",
    });

    expect(ClassRepository.updateClass).not.toHaveBeenCalled();
  });

  it("should throw a 400 AppError when the duration is 300 minutes or more", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassNameExceptId).mockResolvedValue(null);

    await expect(ClassService.updateClass(1, { ...classDto, duration: 300 })).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Duration cannot exceed 5hrs",
    });

    expect(ClassRepository.updateClass).not.toHaveBeenCalled();
  });

  it("should keep the existing image when no new image is provided", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({
      id: 1,
      imageUrl: "old-url",
      imageId: "old-id",
    } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassNameExceptId).mockResolvedValue(null);
    vi.mocked(ClassRepository.updateClass).mockResolvedValue({ id: 1, ...classDto } as never);

    await ClassService.updateClass(1, classDto);

    expect(uploadImage).not.toHaveBeenCalled();
    expect(ClassRepository.updateClass).toHaveBeenCalledWith(
      1,
      classDto,
      "old-url",
      "old-id",
    );
  });

  it("should upload and use the new image when one is provided", async () => {
    vi.mocked(ClassRepository.findClassById).mockResolvedValue({
      id: 1,
      imageUrl: "old-url",
      imageId: "old-id",
    } as never);
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 1 } as never);
    vi.mocked(ClassRepository.findClassNameExceptId).mockResolvedValue(null);
    vi.mocked(uploadImage).mockResolvedValue({
      secure_url: "new-url",
      public_id: "new-id",
    } as never);
    vi.mocked(ClassRepository.updateClass).mockResolvedValue({ id: 1, ...classDto } as never);

    await ClassService.updateClass(1, classDto, image);

    expect(uploadImage).toHaveBeenCalledWith(image.buffer, "fitbook/classes");
    expect(ClassRepository.updateClass).toHaveBeenCalledWith(1, classDto, "new-url", "new-id");
  });
});

describe("ClassService.getInactiveClass", () => {
  it("should return the inactive class count", async () => {
    vi.mocked(ClassRepository.getInactiveClass).mockResolvedValue(3);

    const result = await ClassService.getInactiveClass();

    expect(ClassRepository.getInactiveClass).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });
});

describe("ClassService.getActiveClass", () => {
  it("should return the active class count", async () => {
    vi.mocked(ClassRepository.getActiveClass).mockResolvedValue(5);

    const result = await ClassService.getActiveClass();

    expect(ClassRepository.getActiveClass).toHaveBeenCalledTimes(1);
    expect(result).toBe(5);
  });
});