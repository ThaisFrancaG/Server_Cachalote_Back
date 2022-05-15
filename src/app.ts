import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import router from "./routes/indexRoutes.js";
import "./setup.js";
import handleError from "./middlewares/errorHandle.js";
const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(handleError);

export default app;
