export function validateSchema(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            console.log(validation.error.message);
            return res
                .status(422)
                .send("Por favor, confirme as informações enviadas!");
        }
        next();
    };
}
//# sourceMappingURL=validateSchema.js.map