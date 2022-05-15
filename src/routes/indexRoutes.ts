import { Router } from "express";
import e2eRouter from "./e2eRouter.js";
const router = Router();

if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}
export default router;
