const router = require("express").Router();
const dashboardController = require("../controllers/dashboard-controllers");
const { logginRequired } = require("../middlewares/user-middleware");
router.get("/", dashboardController.index);
router.get("/data", logginRequired, dashboardController.data);

module.exports = router;
