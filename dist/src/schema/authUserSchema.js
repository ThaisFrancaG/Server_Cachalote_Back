import Joi from "joi";
var signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    checkEmail: Joi.string().email(),
    password: Joi.string()
        .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}/)
        .required()
});
var signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{6,}/)
        .required()
});
var userSchema = { signInSchema: signInSchema, signUpSchema: signUpSchema };
export { userSchema };
//# sourceMappingURL=authUserSchema.js.map