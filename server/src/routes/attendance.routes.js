import express from "express";

import {
    createAttendance,
    getAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
    checkDatabaseIntegrity,
} from "../controllers/attendance.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middlewares.js";

const router = express.Router();
// Add this to your routes file temporarily
router.get("/debug/attendance-integrity", authenticate, checkDatabaseIntegrity);
router.post("/", authenticate, authorizeRoles("ADMIN"), createAttendance);
router.get("/", authenticate, getAttendance);
router.get("/:id", authenticate, getAttendanceById);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), updateAttendance);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteAttendance);
export default router;
