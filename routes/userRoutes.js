import {
  userLogin,
  userSignUp,
  verifyEmail,
} from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.post("/verify", verifyEmail);

export default router;
