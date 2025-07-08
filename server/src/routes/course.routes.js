import express from "express";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/course.controllers.js";
import uploadCourseFile from "../middlewares/upload.middleware.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middlewares.js";

const router = express.Router();


router.post("/create", authenticate, authorizeRoles("ADMIN"), uploadCourseFile.single("file"), createCourse);
router.get("/get-all", getAllCourses);
router.get("/:id", getCourseById);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("ADMIN"),
    uploadCourseFile.single("file"),
    updateCourse,
);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteCourse);

export default router;
