import { Request, Response } from "express";
import * as userServices from "../services/userAuthService.js";

async function signUp(req: Request, res: Response) {
  const userData = req.body;

  await userServices.signUp(userData);

  res.sendStatus(201);
}

const authController = { signUp };
export default authController;
