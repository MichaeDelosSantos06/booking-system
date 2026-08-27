import { Router } from "express";
import { tokenAuth } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorized.js";
import TrainerController from "../controllers/trainer.controller.js";
import { validate } from "../middlewares/validator.js";
import { createTrainerSchema } from "../schema/trainer.schema.js";

const router = Router();

router.get(
  "/trainer/fetch-trainers",
  tokenAuth,
  authorize,
  TrainerController.fetchTrainer,
);
router.get(
  "/trainer/find-trainer/:id",
  tokenAuth,
  authorize,
  TrainerController.findTrainerById,
);
router.post(
  "/trainer/create-trainer",
  tokenAuth,
  authorize,
  validate(createTrainerSchema),
  TrainerController.createTrainer,
);
router.put(
  "/trainer/update-trainer-data/:id",
  tokenAuth,
  authorize,
  validate(createTrainerSchema),
  TrainerController.updatData,
);
router.patch(
  "/trainer/deactivate/:id",
  tokenAuth,
  authorize,
  TrainerController.deactivate,
);
router.patch(
  "/trainer/activate/:id",
  tokenAuth,
  authorize,
  TrainerController.activate,
);

export default router;
