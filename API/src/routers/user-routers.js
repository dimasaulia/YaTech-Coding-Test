const router = require("express").Router();
const userController = require("../controllers/user-controllers");
const { logginRequired } = require("../middlewares/user-middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", logginRequired, userController.logout);
router.post("/token", userController.generateNewAccessToken);

module.exports = router;
