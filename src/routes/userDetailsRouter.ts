import { Router } from "express";
import { authenticationValidation } from "../middlewares/authenticationValidation.js";
const userDetailsRouter = Router();

userDetailsRouter.get("/user-preferences", authenticationValidation);

export default userDetailsRouter;
