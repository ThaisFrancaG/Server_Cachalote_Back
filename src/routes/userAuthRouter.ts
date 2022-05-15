import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schema/authUserSchema.js";
import authController from "../controllers/userAuthController.js";
const userAuthRouter = Router();

userAuthRouter.post(
  "/sign-up",
  validateSchema(userSchema.signUpSchema),
  authController.signUp
);

export default userAuthRouter;
