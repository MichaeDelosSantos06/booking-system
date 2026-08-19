import { Router } from "express";
import { tokenAuth } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorized.js";
import TrainerController from "../controllers/trainer.controller.js";

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

export default router;
