import express from "express";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/course.controllers.js";
import uploadCourseFile from "../middlewares/upload.middleware.js";

const router = express.Router();



router.post("/create", uploadCourseFile.single("file"), createCourse);
router.get("/get-all", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", uploadCourseFile.single("file"), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
