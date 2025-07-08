import express from "express";
import {
    uploadMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
} from "../controllers/material.controllers.js";
import uploadCourseFile from "../middlewares/upload.middleware.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middlewares.js";


const router = express.Router();

router.post("/upload", authenticate, authorizeRoles("ADMIN"), uploadCourseFile.single("file"), uploadMaterial);
router.get("/get-all", authenticate, getAllMaterials);
router.get("/:id", authenticate, getMaterialById);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    uploadCourseFile.single("file"),
    updateMaterial,
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteMaterial);

export default router;
