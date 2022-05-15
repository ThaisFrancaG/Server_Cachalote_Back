import { NextFunction, Request, Response } from "express";

export default function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    console.log(error);
    return res.status(error.code).send(error.message);
  }

  res.sendStatus(500);
}
