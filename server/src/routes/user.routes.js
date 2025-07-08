import express from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
} from "../controllers/user.controllers.js";

const router = express.Router();
// Add this to your routes file temporarily
router.post("/register", registerUser);
router.get("/", authenticate,  getCurrentUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logOutUser);
router.post("/refresh-token", authenticate, refreshAccessToken);
router.put("/change-pass", authenticate, changeCurrentPassword);
router.put("/change-detail", authenticate, updateAccountDetails);
router.put("/user-avatar", authenticate, updateUserAvatar);


export default router;
