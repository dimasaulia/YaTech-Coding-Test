const { HttpStatusCodes } = require("../response-handlers/code/response-code");
const { resSuccess } = require("../response-handlers/success/response-success");

const index = (req, res, next) => {
    try {
        return resSuccess({
            res,
            title: "Hallo Ini Adalah Public Dashboard",
            data: "Selamat Datang Di API Yatech Studio (PT. Generasi Emas Persada)",
        });
    } catch (error) {
        next(error);
    }
};

const data = (req, res, next) => {
    try {
        return resSuccess({
            res,
            title: "Dashboard Data",
            data: "Dashboard ini bersifat rahasia dan hanya bisa diakses oleh user yang sudah login",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { index, data };
