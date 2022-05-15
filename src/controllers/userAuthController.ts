import { Request, Response } from "express";
import * as userServices from "../services/userAuthService.js";

async function signUp(req: Request, res: Response) {
  const userData = req.body;

  await userServices.signUp(userData);

  res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const userData = req.body;
  console.log(userData);
  const token = await userServices.signIn(userData);

  res.status(200).send(token);
}

const authController = { signUp, signIn };
export default authController;
