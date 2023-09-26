const { HttpStatusCodes } = require("../response-handlers/code/response-code");
const { CustomError } = require("../response-handlers/error/response-error");
const { verifyAccessToken } = require("../utility/jwt");

function logginRequired(req, res, next) {
    const authorization = req.headers["authorization"];
    if (authorization === undefined || authorization === "")
        throw new CustomError(
            HttpStatusCodes.statusForbidden,
            "Please login to access this menu"
        );

    const token = String(authorization).split(" ")[1]; // structure ==> Bearer TOKEN
    if (token === undefined || token === "")
        throw new CustomError(
            HttpStatusCodes.statusForbidden,
            "Please login to access this menu"
        );

    const payload = verifyAccessToken(token);

    next();
}

module.exports = { logginRequired };
