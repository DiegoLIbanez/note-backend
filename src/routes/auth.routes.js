import express from "express";
import {
  login,
  logout,
  signup,
  VerifyEmail,
  forgotPasword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyAuth, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", VerifyEmail);
router.post("/forgot-password", forgotPasword);
router.post("/reset-password/:token", resetPassword);

export default router;
