import { Request, Response } from "express";
import * as userServices from "../services/userAuthService.js";
import * as service from "../services/userDetailsService.js";

async function getUserInfo(req: Request, res: Response) {
  const authorization: any = req.headers["authorization"];
  const token = authorization.replace("Bearer ", "");

  const userData = await service.userData(token);

  res.status(201).send(userData);
}

export { getUserInfo };
