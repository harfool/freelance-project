import Material from "../models/material.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


export const uploadMaterial = asyncHandler(async (req, res) => {
    const { title, description, category, courseId } = req.body;

    if (!req.file) {
        throw new ApiError(400, "File (PDF or Notes) is required");
    }

    if (!title || !description || !category || !courseId) {
        throw new ApiError(400, "All fields are required");
    }

    const allowedCategories = [
        "assigment",
        "pdf",
        "notes",
        "other",
        "old-paper",
    ];
    if (!allowedCategories.includes(category)) {
        throw new ApiError(400, "Invalid material category");
    }

    const material = await Material.create({
        title,
        description,
        category,
        courseId,
        notesUrl: req.file.path,
    });

    if (!material) throw new ApiError(500, "Failed to upload material");

    res.status(201).json(
        new ApiResponse(201, material, "Material uploaded successfully"),
    );
});


export const getAllMaterials = asyncHandler(async (req, res) => {
    const materials = await Material.find()
        .populate("courseId")
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, materials, "All materials fetched"),
    );
});


export const getMaterialById = asyncHandler(async (req, res) => {
    const material = await Material.findById(req.params.id).populate(
        "courseId",
    );
    if (!material) throw new ApiError(404, "Material not found");

    res.status(200).json(new ApiResponse(200, material, "Material fetched"));
});


export const updateMaterial = asyncHandler(async (req, res) => {
    const { title, description, category, courseId } = req.body;

    const material = await Material.findById(req.params.id);
    if (!material) throw new ApiError(404, "Material not found");

    if (
        category &&
        !["assigment", "pdf", "notes", "other", "old-paper"].includes(category)
    ) {
        throw new ApiError(400, "Invalid category");
    }

    if (req.file) {
        material.notesUrl = req.file.path;
    }

    material.title = title ?? material.title;
    material.description = description ?? material.description;
    material.category = category ?? material.category;
    material.courseId = courseId ?? material.courseId;

    const updated = await material.save();

    if (!updated) throw new ApiError(500, "Failed to update material");

    res.status(200).json(
        new ApiResponse(200, updated, "Material updated successfully"),
    );
});


export const deleteMaterial = asyncHandler(async (req, res) => {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Material not found");

    res.status(200).json(
        new ApiResponse(200, null, "Material deleted successfully"),
    );
});
