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
  "/class/fetch-class/",
  tokenAuth,
  authorize,
  ClassController.fetchClasses,
);
router.get(
  "/class/search-class",
  tokenAuth,
  authorize,
  ClassController.searchClasses,
);
router.delete(
  "/class/delete-class/:id",
  tokenAuth,
  authorize,
  ClassController.deleteClassById,
);
router.patch(
  "/class/update-class/:id",
  tokenAuth,
  authorize,
  upload.single("classImage"),
  validate(createClassSchema),
  ClassController.updateClass,
);

router.get(
  "/class/get-active-class",
  tokenAuth,
  authorize,
  ClassController.getActiveClass,
);
router.get(
  "/class/get-inactive-class",
  tokenAuth,
  authorize,
  ClassController.getInactiveClass,
);
export default router;
