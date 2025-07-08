import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout/", verifyJWT , logOutUser);
router.post("/refresh", refreshAccessToken);
router.post("/change-password", changeCurrentPassword);
router.get("/current-user", getCurrentUser);

export default router;
