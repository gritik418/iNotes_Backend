const { userLogin } = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", userLogin);

module.exports = router;
