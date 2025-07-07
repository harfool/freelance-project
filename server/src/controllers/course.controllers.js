import Course from "../models/course.model.js";
import {asyncHandler} from "../utils/async-handler.js";
import {ApiError} from "../utils/api-error.js";
import {ApiResponse} from "../utils/api-response.js";


export const createCourse = asyncHandler(async (req, res) => {
    const { name, price, duration, description } = req.body;

    if (!req.file) throw new ApiError(400, "Thumbnail or PDF is required");

    if (!name || !price || !duration) {
        throw new ApiError(400, "Name, price, and duration are required");
    }

    const course = await Course.create({
        name,
        price,
        duration,
        description,
        thumbnail: req.file.path,
    });

    if (!course) throw new ApiError(500, "Failed to create course");

    res.status(201).json(
        new ApiResponse(201, course, "Course created successfully"),
    );
});


export const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find().sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
        throw new ApiError(404, "No courses found");
    }

    res.status(200).json(new ApiResponse(200, courses, "All courses fetched"));
});


export const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) throw new ApiError(404, "Course not found");

    res.status(200).json(
        new ApiResponse(200, course, "Course fetched successfully"),
    );
});


export const updateCourse = asyncHandler(async (req, res) => {
    const { name, price, duration, description } = req.body;

    let course = await Course.findById(req.params.id);
    if (!course) throw new ApiError(404, "Course not found");

    if (req.file) {
        course.thumbnail = req.file.path;
    }

    course.name = name ?? course.name;
    course.price = price ?? course.price;
    course.duration = duration ?? course.duration;
    course.description = description ?? course.description;

    const updated = await course.save();

    if (!updated) throw new ApiError(500, "Failed to update course");

    res.status(200).json(
        new ApiResponse(200, updated, "Course updated successfully"),
    );
});


export const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) throw new ApiError(404, "Course not found");

    res.status(200).json(
        new ApiResponse(200, null, "Course deleted successfully"),
    );
});
