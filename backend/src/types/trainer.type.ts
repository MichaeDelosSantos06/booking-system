import { createTrainerSchema } from "../schema/trainer.schema.js";
import { z } from "zod";

export type CreateTrainerDto = z.infer<typeof createTrainerSchema>;
