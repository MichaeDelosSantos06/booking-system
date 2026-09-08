import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CreateTrainerDto } from "../../types/trainer.type.js";

vi.mock("../../repositories/trainer.repositoy.js", () => ({
  default: {
    findTrainerById: vi.fn(),
    fetchTrainer: vi.fn(),
    findByEmail: vi.fn(),
    createTrainer: vi.fn(),
    updateData: vi.fn(),
    deactivate: vi.fn(),
    activate: vi.fn(),
  },
}));

import TrainerService from "../../services/trainer.service.js";
import TrainerRepository from "../../repositories/trainer.repositoy.js";

const trainerData: CreateTrainerDto = {
  name: "Coach Mike",
  email: "coach@example.com",
  contact: "09171234567",
  experience: 5,
  specialization: "Yoga",
  status: "Active",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TrainerService.fetchTrainer", () => {
  it("should return trainers when there are some", async () => {
    vi.mocked(TrainerRepository.fetchTrainer).mockResolvedValue([{ id: 1 }] as never);

    const result = await TrainerService.fetchTrainer();

    expect(TrainerRepository.fetchTrainer).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("should forward the status filter", async () => {
    vi.mocked(TrainerRepository.fetchTrainer).mockResolvedValue([{ id: 1 }] as never);

    await TrainerService.fetchTrainer("Active");

    expect(TrainerRepository.fetchTrainer).toHaveBeenCalledWith("Active");
  });

  it("should throw a 404 AppError when the list is empty", async () => {
    vi.mocked(TrainerRepository.fetchTrainer).mockResolvedValue([]);

    await expect(TrainerService.fetchTrainer()).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "No Trainer/s Found.",
    });
  });
});

describe("TrainerService.findTrainerById", () => {
  it("should return the trainer when found", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 3 } as never);

    const result = await TrainerService.findTrainerById(3);

    expect(TrainerRepository.findTrainerById).toHaveBeenCalledWith(3);
    expect(result).toEqual({ id: 3 });
  });

  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(TrainerService.findTrainerById(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "No Trainer/s Found.",
    });
  });
});

describe("TrainerService.createTrainer", () => {
  it("should throw a 400 AppError when the email already exists", async () => {
    vi.mocked(TrainerRepository.findByEmail).mockResolvedValue({ id: 1 } as never);

    await expect(TrainerService.createTrainer(trainerData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 400,
      message: "Trainer Already Exist",
    });

    expect(TrainerRepository.createTrainer).not.toHaveBeenCalled();
  });

  it("should create the trainer when the email is unique", async () => {
    vi.mocked(TrainerRepository.findByEmail).mockResolvedValue(null);
    vi.mocked(TrainerRepository.createTrainer).mockResolvedValue({ id: 4 } as never);

    const result = await TrainerService.createTrainer(trainerData);

    expect(TrainerRepository.findByEmail).toHaveBeenCalledWith(trainerData.email);
    expect(TrainerRepository.createTrainer).toHaveBeenCalledWith(trainerData);
    expect(result).toEqual({ id: 4 });
  });
});

describe("TrainerService.updateData", () => {
  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(TrainerService.updateData(999, trainerData)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer does't exists",
    });

    expect(TrainerRepository.updateData).not.toHaveBeenCalled();
  });

  it("should update the trainer data when found", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 2 } as never);
    vi.mocked(TrainerRepository.updateData).mockResolvedValue({
      id: 2,
      ...trainerData,
    } as never);

    const result = await TrainerService.updateData(2, trainerData);

    expect(TrainerRepository.findTrainerById).toHaveBeenCalledWith(2);
    expect(TrainerRepository.updateData).toHaveBeenCalledWith(2, trainerData);
    expect(result).toMatchObject({ id: 2, experience: 5 });
  });
});

describe("TrainerService.deactivate", () => {
  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(TrainerService.deactivate(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer does't exists",
    });

    expect(TrainerRepository.deactivate).not.toHaveBeenCalled();
  });

  it("should deactivate the trainer when found", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 5 } as never);
    vi.mocked(TrainerRepository.deactivate).mockResolvedValue({
      id: 5,
      status: "Inactive",
    } as never);

    const result = await TrainerService.deactivate(5);

    expect(TrainerRepository.deactivate).toHaveBeenCalledWith(5);
    expect(result).toMatchObject({ status: "Inactive" });
  });
});

describe("TrainerService.activate", () => {
  it("should throw a 404 AppError when the trainer does not exist", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue(null);

    await expect(TrainerService.activate(999)).rejects.toMatchObject({
      name: "AppError",
      statusCode: 404,
      message: "Trainer does't exists",
    });

    expect(TrainerRepository.activate).not.toHaveBeenCalled();
  });

  it("should activate the trainer when found", async () => {
    vi.mocked(TrainerRepository.findTrainerById).mockResolvedValue({ id: 6 } as never);
    vi.mocked(TrainerRepository.activate).mockResolvedValue({
      id: 6,
      status: "Active",
    } as never);

    const result = await TrainerService.activate(6);

    expect(TrainerRepository.activate).toHaveBeenCalledWith(6);
    expect(result).toMatchObject({ status: "Active" });
  });
});