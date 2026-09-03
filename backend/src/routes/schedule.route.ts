import { Router } from "express";
import { tokenAuth } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorized.js";
import { validate } from "../middlewares/validator.js";
import { createScheduleSchema } from "../schema/schedule.schema.js";
import ScheduleController from "../controllers/schedule.controller.js";

const router = Router();

router.post(
  "/schedule/create",
  tokenAuth,
  authorize,
  validate(createScheduleSchema),
  ScheduleController.createSchedule,
);

router.get(
  "/schedule/get-schedule",
  tokenAuth,
  authorize,
  ScheduleController.getTodaySchedule,
);
router.get(
  "/schedule/search-schedule",
  tokenAuth,
  authorize,
  ScheduleController.searchSchedules,
);
router.post(
  "/schedule/delete/:id",
  tokenAuth,
  authorize,
  ScheduleController.deleteById,
);

export default router;
