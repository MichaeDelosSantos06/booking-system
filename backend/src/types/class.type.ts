import { z } from "zod";
import { createClassSchema } from "../schema/class.schema.js";

export type CreateClassDto = z.infer<typeof createClassSchema>;

export interface UploadedImage {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}
