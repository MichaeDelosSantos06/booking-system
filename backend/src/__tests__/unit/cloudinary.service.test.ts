import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      upload_stream: vi.fn(),
    },
  },
}));

import { uploadImage } from "../../services/cloudinary.service.js";
import cloudinary from "../../config/cloudinary.js";

const uploadStreamMock = cloudinary.uploader.upload_stream as unknown as ReturnType<
  typeof vi.fn
>;

describe("uploadImage", () => {
  const buffer = Buffer.from("fake-image-bytes");
  const folder = "fitbook/classes";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should resolve with the upload result and forward the buffer to the stream", async () => {
    const result = {
      secure_url: "https://res.cloudinary.com/fitbook/classes/abc.jpg",
      public_id: "fitbook/classes/abc",
    };
    let returnedEnd: ReturnType<typeof vi.fn> | undefined;

    uploadStreamMock.mockImplementation(
      (_options: unknown, callback: (error: unknown, result?: unknown) => void) => {
        const end = vi.fn((_data: Buffer) => callback(null, result));
        returnedEnd = end;
        return { end };
      },
    );

    await expect(uploadImage(buffer, folder)).resolves.toEqual(result);

    expect(uploadStreamMock).toHaveBeenCalledWith(
      { folder, resource_type: "image" },
      expect.any(Function),
    );
    expect(returnedEnd).toBeDefined();
    expect(returnedEnd).toHaveBeenCalledWith(buffer);
  });

  it("should reject with the cloudinary error when the stream fails", async () => {
    uploadStreamMock.mockImplementation(
      (_options: unknown, callback: (error?: Error | null) => void) => ({
        end: () => callback(new Error("cloud error")),
      }),
    );

    await expect(uploadImage(buffer, folder)).rejects.toThrow("cloud error");
  });

  it("should reject when the callback finishes without a result", async () => {
    uploadStreamMock.mockImplementation(
      (_options: unknown, callback: (error: unknown, result?: unknown) => void) => ({
        end: () => callback(null, undefined),
      }),
    );

    await expect(uploadImage(buffer, folder)).rejects.toThrow("Cloudinary upload failed");
  });
});