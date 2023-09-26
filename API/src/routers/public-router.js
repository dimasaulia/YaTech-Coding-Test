const router = require("express").Router();

const USER_ROUTER = require("./user-routers");
const DAHBOARD_ROUTER = require("./dashboard-routers");

router.use("/api/v1/user", USER_ROUTER);
router.use("/api/v1/dashboard", DAHBOARD_ROUTER);

module.exports = router;
