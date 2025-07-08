import Announcement from "../models/announcement.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


export const createAnnouncement = asyncHandler(async (req, res) => {
    const { title, content, courseId } = req.body;

    if (!title || !content || !courseId) {
        throw new ApiError(400, "All fields are required");
    }

    const announcement = await Announcement.create({
        title,
        content,
        courseId,
    });

    if (!announcement) {
        throw new ApiError(500, "Failed to create announcement");
    }

    res.status(201).json(
        new ApiResponse(201, announcement, "Announcement created successfully"),
    );
});


export const getAllAnnouncements = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find({})
        .populate("courseId")
        .sort({ createdAt: -1 });

    if (!announcements || announcements.length === 0) {
        throw new ApiError(404, "No announcements found");
    }
    
    res.status(200).json(
        new ApiResponse(200, announcements, "All announcements fetched"),
    );
});


export const getAnnouncementById = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id).populate(
        "courseId",
    );

    if (!announcement) {
        throw new ApiError(404, "Announcement not found");
    }

    res.status(200).json(
        new ApiResponse(200, announcement, "Announcement fetched successfully"),
    );
});


export const updateAnnouncement = asyncHandler(async (req, res) => {
    const { title, content, courseId } = req.body;

    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) throw new ApiError(404, "Announcement not found");

    announcement.title = title ?? announcement.title;
    announcement.content = content ?? announcement.content;
    announcement.courseId = courseId ?? announcement.courseId;

    const updated = await announcement.save();
    if (!updated) throw new ApiError(500, "Failed to update announcement");

    res.status(200).json(
        new ApiResponse(200, updated, "Announcement updated successfully"),
    );
});


export const deleteAnnouncement = asyncHandler(async (req, res) => {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Announcement not found");

    res.status(200).json(
        new ApiResponse(200, null, "Announcement deleted successfully"),
    );
});
