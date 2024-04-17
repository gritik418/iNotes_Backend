import { userLogin, userSignUp } from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

export default router;
