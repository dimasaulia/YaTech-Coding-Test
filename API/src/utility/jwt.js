const jwt = require("jsonwebtoken");
const prisma = require("../app/db");
const { CustomError } = require("../response-handlers/error/response-error");
const { HttpStatusCodes } = require("../response-handlers/code/response-code");
const { logger } = require("../app/logging");

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function generateRefreshToken(payload) {
    const token = jwt.sign(payload, REFRESH_TOKEN_SECRET);
    // Check DB if any token existing
    const existingData = await prisma.user.findUnique({
        where: {
            id: payload.user_id,
        },
        select: {
            token: {
                select: {
                    token: true,
                },
            },
        },
    });

    if (existingData?.token?.token !== undefined)
        return existingData.token.token;

    await prisma.token.create({
        data: {
            token: token,
            user: {
                connect: {
                    id: payload.user_id,
                },
            },
        },
    });
    return token;
}

function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

function verifyRefreshToken(token) {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) throw new CustomError(HttpStatusCodes.statusForbidden, err);
        return decode;
    });
    return payload;
}

function verifyAccessToken(token) {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) throw new CustomError(HttpStatusCodes.statusForbidden, err);
        return decode;
    });
    return payload;
}

module.exports = {
    generateRefreshToken,
    generateAccessToken,
    verifyRefreshToken,
    verifyAccessToken,
};
