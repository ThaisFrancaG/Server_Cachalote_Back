import { Router } from "express";
import { authenticationValidation } from "../middlewares/authenticationValidation.js";
import { getUserInfo } from "../controllers/userDetailsController.js";
const userDetailsRouter = Router();

userDetailsRouter.get("/user-preferences", authenticationValidation);
userDetailsRouter.get("/user-info", authenticationValidation, getUserInfo);
export default userDetailsRouter;
