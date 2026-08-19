import { Router } from "express";
import { authorize } from "../middlewares/authorized.js";
import { validate } from "../middlewares/validator.js";
import { createClassSchema } from "../schema/class.schema.js";
import ClassController from "../controllers/class.controller.js";
import { tokenAuth } from "../middlewares/authenticate.js";
import upload from "../middlewares/uploaad.js";

const router = Router();

router.post(
  "/class/add-class",
  tokenAuth,
  authorize,
  upload.single("classImage"),
  validate(createClassSchema),
  ClassController.addClass,
);
router.get(
  "/class/fetch-class",
  tokenAuth,
  authorize,
  ClassController.fetchClasses,
);

export default router;
