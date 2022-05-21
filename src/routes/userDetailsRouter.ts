import { Router } from "express";
import { authenticationValidation } from "../middlewares/authenticationValidation.js";
import userPreferencesSchema from "../schema/userPreferencesSchema.js";
import {
  getUserInfo,
  setPreferences,
} from "../controllers/userDetailsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
const userDetailsRouter = Router();

userDetailsRouter.post(
  "/user-preferences",
  authenticationValidation,
  validateSchema(userPreferencesSchema.allPreferencesSchema),
  setPreferences
);
userDetailsRouter.get("/user-info", authenticationValidation, getUserInfo);
export default userDetailsRouter;
