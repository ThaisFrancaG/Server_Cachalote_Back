import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import router from "./routes/indexRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
