import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schema/authUserSchema.js";
import authController from "../controllers/userAuthController.js";
var userAuthRouter = Router();
userAuthRouter.post("/sign-up", validateSchema(userSchema.signUpSchema), authController.signUp);
userAuthRouter.post("/sign-in", validateSchema(userSchema.signInSchema), authController.signIn);
export default userAuthRouter;
//# sourceMappingURL=userAuthRouter.js.map