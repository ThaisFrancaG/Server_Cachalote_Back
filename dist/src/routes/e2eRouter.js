//rota para testagem end to end
import { Router } from "express";
import e2eTestsController from "../controllers/e2eTestsController.js";
var e2eRouter = Router();
e2eRouter.post("/e2e/truncate", e2eTestsController.truncate);
export default e2eRouter;
//# sourceMappingURL=e2eRouter.js.map