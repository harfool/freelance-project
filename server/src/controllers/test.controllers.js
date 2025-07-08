import Result from "../models/result.model.js";
import Test from "../models/test.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import User from "../models/user.model.js";
export const createTest = asyncHandler(async (req, res) => {
    const { title, questions, courseId } = req.body;

    if (!title || !questions || !courseId) {
        throw new ApiError(400, "All fields are required");
    }

    const newTest = await Test.create({
        title,
        questions,
        courseId,
    });

    if (!newTest) {
        throw new ApiError(500, "Failed to create test");
    }

    res.status(201).json(
        new ApiResponse(201, newTest, "Test created successfully"),
    );
});

export const attemptTest = asyncHandler(async (req, res) => {
    const { testId, answers } = req.body;

    if (req.user.role !== "STUDENT") {
        throw new ApiError(403, "Only students can attempt tests");
    }

    if (!testId || !Array.isArray(answers)) {
        throw new ApiError(400, "Test ID and answers are required");
    }

    const test = await Test.findById(testId);
    if (!test) throw new ApiError(404, "Test not found");

    if (test.questions.length !== answers.length) {
        throw new ApiError(400, "Answer count does not match question count");
    }

    const alreadySubmitted = await Result.findOne({
        studentId: req.user._id,
        testId,
    });

    if (alreadySubmitted) {
        throw new ApiError(400, "You have already attempted this test");
    }

    let score = 0;
    test.questions.forEach((q, i) => {
        if (q.correctAnswer === answers[i]) score++;
    });

    const percentage = (score / test.questions.length) * 100;

    const result = await Result.create({
        studentId: req.user._id,
        testId,
        answers,
        totalMarks: score,
        percentage,
    });

    if (!result) {
        throw new ApiError(500, "Failed to save test result");
    }

    res.status(200).json(
        new ApiResponse(200, result, "Test submitted successfully"),
    );
});

export const getAllTests = asyncHandler(async (req, res) => {
    const tests = await Test.find({}).populate("courseId");

    if (!tests || tests.length === 0) {
        throw new ApiError(404, "No tests found");
    }

    res.status(200).json(new ApiResponse(200, tests, "Fetched all tests"));
});

export const getTestById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const test = await Test.findById(id).populate("courseId");
    if (!test) throw new ApiError(404, "Test not found");

    res.status(200).json(new ApiResponse(200, test, "Fetched test"));
});

export const updateTest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedTest = await Test.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!updatedTest)
        throw new ApiError(404, "Test not found or update failed");

    res.status(200).json(
        new ApiResponse(200, updatedTest, "Test updated successfully"),
    );
});

export const deleteTest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await Test.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Test not found");

    res.status(200).json(
        new ApiResponse(200, null, "Test deleted successfully"),
    );
});

export const getAllTestsByStudent = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const testSubmissions = await Test.find({ studentId: userId })
        .populate("testId")
        .sort({ createdAt: -1 });

    if (!testSubmissions || testSubmissions.length === 0) {
        throw new ApiError(404, "No test submissions found for this user");
    }

    res.status(200).json(
        new ApiResponse(200, testSubmissions, "All attempted tests fetched"),
    );
});
