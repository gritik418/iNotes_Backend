const { userLogin, userSignUp } = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

module.exports = router;
