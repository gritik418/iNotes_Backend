import {
  updateAvatar,
  userLogin,
  userSignUp,
  verifyEmail,
} from "../controllers/userController.js";

import express from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../services/multerService.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.post("/verify", verifyEmail);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);

export default router;
