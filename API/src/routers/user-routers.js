const router = require("express").Router();
const userController = require("../controllers/user-controllers");
const {
    logginRequired,
    logoutRequired,
} = require("../middlewares/user-middleware");

router.post("/register", logoutRequired, userController.register);
router.post("/login", logoutRequired, userController.login);
router.post("/logout", logginRequired, userController.logout);
router.post("/token", userController.generateNewAccessToken);

module.exports = router;
