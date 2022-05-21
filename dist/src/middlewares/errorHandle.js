export default function handleError(error, req, res, next) {
    if (error) {
        console.log(error);
        return res.status(error.code).send(error.message);
    }
    res.sendStatus(500);
}
//# sourceMappingURL=errorHandle.js.map