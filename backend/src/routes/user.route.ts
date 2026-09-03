import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../schema/user.schema.js";
import { tokenAuth } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorized.js";

const router = Router();

router.post(
  "/user/register",
  validate(registerSchema),
  UserController.registerUser,
);
router.post("/user/login", validate(loginSchema), UserController.loginUser);
router.get("/user/me", tokenAuth, UserController.getCurrentUser);
router.post("/user/logout", UserController.logoutUser);
router.get("/user/get-users", tokenAuth, authorize, UserController.getUsers);
router.get(
  "/user/get-user-count",
  tokenAuth,
  authorize,
  UserController.fetchNewUserByWeek,
);
router.get(
  "/user/get-total-user",
  tokenAuth,
  authorize,
  UserController.getTotalUser,
);

export default router;
