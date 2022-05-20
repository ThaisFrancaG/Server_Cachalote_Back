import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { checkUser } from "../services/userAuthService.js";

export async function authenticationValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];

  const tokenError = {
    code: 401,
    message: "Por favor, faça o login ou atualize a página!",
  };
  if (!authorization)
    throw { code: 400, message: "Por favor, confira suas informações" };

  const token = authorization.replace("Bearer ", "");

  if (!token) throw tokenError;
  try {
    const passKey = process.env.JWT_SECRET as string;
    const { email } = jwt.verify(token, passKey) as { email: string };
    const user = await checkUser(email);
    if (user.length === 0) {
      throw tokenError;
    }
    next();
  } catch {
    throw tokenError;
  }
}
