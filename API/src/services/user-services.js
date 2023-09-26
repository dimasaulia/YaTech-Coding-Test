const {
    userFormValidation,
    tokenFormValidation,
    loginFormValidation,
} = require("../validations/user-validation");
const { validate } = require("../validations/validation");
const prisma = require("../app/db");
const { CustomError } = require("../response-handlers/error/response-error");
const { HttpStatusCodes } = require("../response-handlers/code/response-code");
const bcrypt = require("bcrypt");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} = require("../utility/jwt");
const { logger } = require("../app/logging");

const register = async (req) => {
    const user = validate(userFormValidation, req);

    const isUserExist = await prisma.user.count({
        where: {
            OR: [{ username: user.username }, { email: user.email }],
        },
    });

    if (isUserExist > 0) {
        throw new CustomError(
            HttpStatusCodes.statusPreconditionFailed,
            "Username or email already exist"
        );
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
            role: {
                connect: {
                    name: "USER",
                },
            },
        },
        select: {
            username: true,
            email: true,
            emailIsVerified: true,
            accountIsVerified: true,
        },
    });
};

const login = async (req) => {
    userForm = validate(loginFormValidation, req);

    const user = await prisma.user.findUnique({
        where: {
            username: userForm.username,
        },
    });

    // Check user exist
    if (user === null) {
        throw new CustomError(
            HttpStatusCodes.statusForbidden,
            "Cant find username"
        );
    }

    // Check Passowrd match
    const isPasswordMatch = await bcrypt.compare(
        userForm.password,
        user.password
    );
    if (!isPasswordMatch) {
        throw new CustomError(
            HttpStatusCodes.statusForbidden,
            "Username and password not match"
        );
    }

    // Generate Token
    const accessToken = generateAccessToken({
        username: user.username,
        user_id: user.id,
    });

    const refreshToken = await generateRefreshToken({
        username: user.username,
        user_id: user.id,
    });

    return { username: user.username, refreshToken, accessToken };
};

const logout = async (req) => {
    const token = validate(tokenFormValidation, req);

    // Get Incoming Token To get user_id and username
    const data = verifyRefreshToken(token.refreshToken);

    // Delete the token from database
    return prisma.token.delete({
        where: {
            token: token.refreshToken,
            userId: data.user_id,
        },
        select: {
            user: {
                select: {
                    username: true,
                    id: true,
                },
            },
        },
    });
};

const generateNewAccessToken = async (req) => {
    const token = validate(tokenFormValidation, req);

    // Get Incoming Token To get user_id and username
    const data = verifyRefreshToken(token.refreshToken);

    // Find The record, if not exist throw error
    const existingToken = await prisma.token.findUnique({
        where: {
            token: token.refreshToken,
        },
    });

    if (existingToken === null) {
        throw new CustomError(
            HttpStatusCodes.statusForbidden,
            "Please relogin, your token not valid"
        );
    }

    return generateAccessToken({
        user_id: data.user_id,
        username: data.username,
    });
};

module.exports = { register, login, logout, generateNewAccessToken };
