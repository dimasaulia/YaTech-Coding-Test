if (process.env.NODE_ENV !== "PRODUCTION") require("dotenv").config();
const { errorMiddleware } = require("../middlewares/error-middleware");
const express = require("express");
const cors = require("cors");
const MAIN_ROUTER = require("../routers/public-router");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", MAIN_ROUTER);
app.use(errorMiddleware);

module.exports = { app };
