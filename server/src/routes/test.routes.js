import express from "express";
import {
    createTest,
    attemptTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest,
    getAllTestsByStudent,
} from "../controllers/test.controllers.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middlewares.js";

const router = express.Router();


router.post("/create", authenticate, authorizeRoles("ADMIN"), createTest); 
router.post("/attempt", authenticate, attemptTest); 
router.get("/get-all", authenticate, getAllTests);
router.get("/:id", authenticate, getTestById);
router.get("/:id", authenticate, getAllTestsByStudent);
router.put("/:id", authenticate, authorizeRoles("ADMIN"), updateTest); 
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteTest); 

export default router;
