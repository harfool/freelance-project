import express from "express";
import {
    createTest,
    attemptTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest,
} from "../controllers/test.controllers.js";

const router = express.Router();


router.post("/create", createTest); 
router.post("/attempt", attemptTest); 
router.get("/get-all", getAllTests);
router.get("/:id", getTestById);
router.put("/:id", updateTest); 
router.delete("/:id", deleteTest); 

export default router;
