const { HttpStatusCodes } = require("../response-handlers/code/response-code");
const { resSuccess } = require("../response-handlers/success/response-success");
const user = require("../services/user-services");

const register = async (req, res, next) => {
    try {
        const result = await user.register(req.body);
        return resSuccess({
            res: res,
            title: "Success register new user",
            code: HttpStatusCodes.statusCreated,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await user.login(req.body);
        return resSuccess({
            res: res,
            title: "Login success",
            code: HttpStatusCodes.statusOK,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const result = await user.logout(req.body);
        return resSuccess({
            res: res,
            title: "Logout success",
            code: HttpStatusCodes.statusOK,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const generateNewAccessToken = async (req, res, next) => {
    try {
        const result = await user.generateNewAccessToken(req.body);
        return resSuccess({
            res: res,
            title: "New Access Token Generated",
            code: HttpStatusCodes.statusOK,
            data: { accessToken: result },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout, generateNewAccessToken };
