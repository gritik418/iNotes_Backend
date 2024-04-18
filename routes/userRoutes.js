import {
  updateAvatar,
  updateUserInfo,
  userLogin,
  userSignUp,
  verifyEmail,
} from "../controllers/userController.js";

import express from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../services/multerService.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/signup", userSignUp);

router.post("/verify", verifyEmail);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);

router.patch("/", authenticate, updateUserInfo);

export default router;
