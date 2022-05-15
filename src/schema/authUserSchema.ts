import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  checkEmail: Joi.string().email(),
  password: Joi.string()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}/)
    .required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}/)
    .required(),
});

const userSchema = { signInSchema, signUpSchema };
export { userSchema };
