import { Request, Response } from "express";
import * as userServices from "../services/userAuthService.js";
import * as service from "../services/userDetailsService.js";

async function getUserInfo(req: Request, res: Response) {
  const authorization: any = req.headers["authorization"];
  const token = authorization.replace("Bearer ", "");

  const userData = await service.userData(token);

  res.status(200).send(userData);
}

async function setPreferences(req: Request, res: Response) {
  const details = req.body;
  const authorization: any = req.headers["authorization"];
  const token = authorization.replace("Bearer ", "");
  await service.profilePreferences(token, details);

  await service.notificationsPreferences(token, details);

  res.sendStatus(201);
}

export { getUserInfo, setPreferences };
