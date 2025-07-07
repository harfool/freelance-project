import express from "express";
import {
    uploadMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
} from "../controllers/material.controllers.js";
import uploadCourseFile from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post("/upload", uploadCourseFile.single("file"), uploadMaterial);
router.get("/get-all", getAllMaterials);
router.get("/:id", getMaterialById);
router.put("/:id", uploadCourseFile.single("file"), updateMaterial);
router.delete("/:id", deleteMaterial);

export default router;
