import { Router } from "express";
import e2eRouter from "./e2eRouter.js";
import userAuthRouter from "./userAuthRouter.js";
import userDetailsRouter from "./userDetailsRouter.js";

const router = Router();

router.use(userAuthRouter);
router.use(userDetailsRouter);

if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}
export default router;
