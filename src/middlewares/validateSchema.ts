import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error.message);
      return res
        .status(422)
        .send("Por favor, confirme as informações enviadas!");
    }

    next();
  };
}
