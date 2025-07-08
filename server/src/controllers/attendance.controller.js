import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import moment from "moment-timezone";
import cron from "node-cron";

export const checkIn = async (req, res) => {
    try {
        const { isRemote, employeeId, latitude, longitude } = req.body;
        console.log("Received check-in request:", {
            isRemote,
            employeeId,
            latitude,
            longitude,
        });

        // Use employeeId from payload, fallback to req.user.id
        const targetEmployeeId = employeeId || req.user.id;
        console.log(
            "User role:",
            req.user.role,
            "Target employee ID:",
            targetEmployeeId,
        );

        // Validate employeeId
        if (
            !targetEmployeeId ||
            !mongoose.Types.ObjectId.isValid(targetEmployeeId)
        ) {
            return res.status(400).json({
                error: `Invalid or missing employee ID. Provided employeeId: ${employeeId}`,
                UseID: `${req.user.id}`,
            });
        }

        // Prevent non-admins from checking in for another employee
        if (req.user.role !== "admin" && targetEmployeeId !== req.user.id) {
            return res.status(403).json({
                error: "Unauthorized: Non-admin users can only check in for themselves",
            });
        }

        // Verify employee exists
        const employee = await User.findById(targetEmployeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Set date to start of current day in IST
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const tomorrow = moment(today)
            .tz("Asia/Kolkata")
            .add(1, "day")
            .toDate();
        console.log("Query date range:", { gte: today, lt: tomorrow });

        // Check for existing attendance
        const existingAttendance = await Attendance.findOne({
            employeeId: new mongoose.Types.ObjectId(targetEmployeeId),
            date: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        console.log("Existing attendance check:", existingAttendance);

        if (existingAttendance) {
            return res.status(400).json({
                error: "You have already checked in today. Each employee can only check in once per day.",
                existingRecord: {
                    employeeId: existingAttendance.employeeId,
                    date: existingAttendance.date,
                    checkInTime: existingAttendance.checkInTime,
                },
            });
        }

        // Create new attendance record
        const attendanceData = {
            employeeId: new mongoose.Types.ObjectId(targetEmployeeId),
            date: today,
            checkInTime: moment().tz("Asia/Kolkata").toDate(),
            isRemote: isRemote || false,
            status: "pending",
        };

        // Add geolocation if provided
        if (latitude !== undefined && longitude !== undefined) {
            attendanceData.checkInLocation = { latitude, longitude };
            console.log(
                "Adding checkInLocation:",
                attendanceData.checkInLocation,
            );
        }

        console.log("Attendance data before save:", attendanceData);

        // Create attendance record
        try {
            const attendance = await Attendance.create(attendanceData);
            console.log(
                "Attendance created successfully:",
                attendance.toObject(),
            );

            // Populate project details in the response
            await attendance.populate("project", "name");

            res.status(201).json({
                message: "Check-in successful",
                attendance,
            });
        } catch (createError) {
            console.error("Error creating attendance:", createError);

            // Handle duplicate key error
            if (createError.code === 11000) {
                return res.status(400).json({
                    error: "You have already checked in today. Each employee can only check in once per day.",
                    details: "Duplicate attendance record detected",
                });
            }
            throw createError;
        }
    } catch (error) {
        console.error("Check-in error details:", error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                error: "You have already checked in today. Each employee can only check in once per day.",
            });
        }

        res.status(500).json({
            error: "Internal server error during check-in",
            details: error.message,
        });
    }
};

export const checkOut = async (req, res) => {
    try {
        const { notes = "", employeeId, projectId, project } = req.body; // Support both projectId and project
        console.log("Received check-out request:", {
            notes,
            employeeId,
            projectId,
            project,
        }); // Debug log

        // Use projectId if provided, fallback to project
        const projectValue = projectId || project;
        console.log("Received project value:", projectValue); // Debug log

        // Determine employeeId: use req.body.employeeId for admins, else req.user.id
        const targetEmployeeId =
            req.user.role === "admin" && employeeId ? employeeId : req.user.id;

        // Validate employeeId
        if (
            !targetEmployeeId ||
            !mongoose.Types.ObjectId.isValid(targetEmployeeId)
        ) {
            return res
                .status(400)
                .json({ error: "Invalid or missing employee ID" });
        }

        // Verify employee exists
        const employee = await User.findById(targetEmployeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Validate project if provided
        if (projectValue) {
            if (!mongoose.Types.ObjectId.isValid(projectValue)) {
                return res
                    .status(400)
                    .json({
                        error: `Invalid project ID format: ${projectValue}`,
                    });
            }
            const projectExists = await Project.findById(projectValue);
            if (!projectExists) {
                return res.status(404).json({ error: "Project not found" });
            }
            if (!projectExists.assignedEmployees.includes(targetEmployeeId)) {
                return res
                    .status(403)
                    .json({
                        error: "Employee is not assigned to the specified project",
                    });
            }
        }

        // Set date to start of current day in IST
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const tomorrow = moment(today)
            .tz("Asia/Kolkata")
            .add(1, "day")
            .toDate();

        // Find today's attendance record
        const attendance = await Attendance.findOne({
            employeeId: targetEmployeeId,
            date: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        if (!attendance) {
            return res
                .status(404)
                .json({
                    error: "No check-in record found for today. Please check in first.",
                });
        }

        if (attendance.checkOutTime) {
            return res.status(400).json({ error: "Already checked out today" });
        }

        // Update attendance record
        attendance.checkOutTime = moment().tz("Asia/Kolkata").toDate();
        attendance.notes = notes ? `${notes}` : "";
        if (projectValue) {
            console.log("Assigning project to attendance:", projectValue); // Debug log
            attendance.project = new mongoose.Types.ObjectId(projectValue); // Cast to ObjectId
        } else {
            console.log("No project provided"); // Debug log
            attendance.project = undefined; // Clear project if not provided
        }

        // Save the updated attendance record
        await attendance.save();
        console.log("Saved attendance:", JSON.stringify(attendance, null, 2)); // Detailed debug log

        // Populate project and employee details in the response
        await attendance.populate([
            { path: "employeeId", select: "name employeeId" },
            { path: "project", select: "name" },
        ]);

        res.json({
            message: "Check-out successful",
            attendance,
        });
    } catch (error) {
        console.error("Check-out error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getMyAttendance = async (req, res) => {
    try {
        const { month, year, employeeId } = req.query;

        // Determine employeeId: use req.query.employeeId for admins, else req.user.id
        const targetEmployeeId =
            req.user.role === "admin" && employeeId ? employeeId : req.user.id;

        // Validate employeeId
        if (
            !targetEmployeeId ||
            !mongoose.Types.ObjectId.isValid(targetEmployeeId)
        ) {
            return res
                .status(400)
                .json({ error: "Invalid or missing employee ID" });
        }

        // Verify employee exists
        const employee = await User.findById(targetEmployeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        let query = { employeeId: targetEmployeeId };

        if (month && year) {
            const startDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .startOf("month")
                .toDate();
            const endDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .endOf("month")
                .toDate();
            query.date = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        const attendance = await Attendance.find(query)
            .select(
                "employeeId date checkInTime checkOutTime workingHours status notes isRemote checkInLocation project rejectionReason",
            ) // Explicitly include rejectionReason
            .populate([
                { path: "employeeId", select: "name employeeId" },
                { path: "project", select: "name" }, // Populate project details
            ])
            .sort({ date: -1 });

        res.json(attendance);
    } catch (error) {
        console.error("Get my attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { month, year, status } = req.query;

        // Validate employeeId
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ error: "Invalid employee ID" });
        }

        const employee = await User.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        let query = { employeeId };

        if (month && year) {
            const startDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .startOf("month")
                .toDate();
            const endDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .endOf("month")
                .toDate();
            query.date = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        if (status) {
            query.status = status;
        }

        const attendance = await Attendance.find(query)
            .populate([
                { path: "employeeId", select: "name employeeId" },
                { path: "project", select: "name" }, // Populate project details
            ])
            .sort({ date: -1 });

        res.json(attendance);
    } catch (error) {
        console.error("Get employee attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllAttendance = async (req, res) => {
    try {
        const { date, status, month, year } = req.query;

        let query = {};

        if (date) {
            const searchDate = moment
                .tz(date, "Asia/Kolkata")
                .startOf("day")
                .toDate();
            const nextDay = moment(searchDate)
                .tz("Asia/Kolkata")
                .add(1, "day")
                .toDate();
            query.date = {
                $gte: searchDate,
                $lt: nextDay,
            };
        } else if (month && year) {
            const startDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .startOf("month")
                .toDate();
            const endDate = moment
                .tz(`${year}-${month}-01`, "Asia/Kolkata")
                .endOf("month")
                .toDate();
            query.date = {
                $gte: startDate,
                $lte: endDate,
            };
        }

        if (status) {
            query.status = status;
        }

        const attendance = await Attendance.find(query)
            .populate([
                {
                    path: "employeeId",
                    select: "name employeeId profilePicture",
                },
                { path: "project", select: "name" },
            ])
            .sort({ date: -1 });

        res.json(attendance);
    } catch (error) {
        console.error("Get all attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const approveAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, rejectionReason } = req.body || {}; // Fallback to empty object

        // Log for debugging
        console.log("approveAttendance called:", {
            id,
            body: req.body,
            user: req.user,
            url: req.originalUrl,
        });

        if (!status || !["approved", "rejected"].includes(status)) {
            return res
                .status(400)
                .json({
                    error: "Invalid or missing status. Must be approved or rejected",
                });
        }

        // Validate rejectionReason if status is rejected
        if (
            status === "rejected" &&
            (!rejectionReason ||
                typeof rejectionReason !== "string" ||
                rejectionReason.trim() === "")
        ) {
            return res
                .status(400)
                .json({
                    error: "Rejection reason is required when status is rejected",
                });
        }

        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res
                .status(404)
                .json({ error: "Attendance record not found" });
        }

        attendance.status = status;
        attendance.approvedBy = req.user.id;
        attendance.approvalDate = moment().tz("Asia/Kolkata").toDate();

        // Set or clear rejectionReason based on status
        attendance.rejectionReason =
            status === "rejected" ? rejectionReason : undefined;

        await attendance.save();

        // Populate project and employee details in the response
        await attendance.populate([
            { path: "employeeId", select: "name employeeId" },
            { path: "project", select: "name" },
        ]);

        res.json({
            message: `Attendance ${status}`,
            attendance,
        });
    } catch (error) {
        console.error("Approve attendance error:", error);
        res.status(500).json({
            error: "Internal server error during approve attendance",
        });
    }
};

export const approveTodayAttendance = async (req, res) => {
    try {
        // Log the incoming request for debugging
        console.log("approveTodayAttendance called:", {
            user: req.user,
            body: req.body,
            method: req.method,
            url: req.originalUrl,
        });

        // Check if user is admin
        if (req.user.role !== "admin") {
            return res
                .status(403)
                .json({
                    error: "Unauthorized: Only admins can approve attendance",
                });
        }

        // Set date range for today in IST
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const tomorrow = moment(today)
            .tz("Asia/Kolkata")
            .add(1, "day")
            .toDate();

        // Find all pending attendance records for today
        const pendingRecords = await Attendance.find({
            date: {
                $gte: today,
                $lt: tomorrow,
            },
            status: "pending",
        });

        console.log(`Found ${pendingRecords.length} pending records for today`);

        // Update all pending records to approved
        const updateResult = await Attendance.updateMany(
            {
                date: {
                    $gte: today,
                    $lt: tomorrow,
                },
                status: "pending",
            },
            {
                $set: {
                    status: "approved",
                    approvedBy: req.user.id,
                    approvalDate: moment().tz("Asia/Kolkata").toDate(),
                    rejectionReason: null,
                },
            },
        );

        // Check if no records were updated
        if (updateResult.modifiedCount === 0) {
            return res.status(200).json({
                message: "All today's attendance records are already approved",
                updatedRecords: [],
            });
        }

        // Fetch updated records for response
        const updatedRecords = await Attendance.find({
            date: {
                $gte: today,
                $lt: tomorrow,
            },
            status: "approved",
        })
            .populate([
                { path: "employeeId", select: "name employeeId" },
                { path: "project", select: "name" },
            ])
            .sort({ checkInTime: -1 });

        res.json({
            message: `Successfully approved ${updateResult.modifiedCount} attendance records for today`,
            updatedRecords,
        });
    } catch (error) {
        console.error("Approve today attendance error:", error);
        res.status(500).json({
            error: "Internal server error during approve today attendance",
        });
    }
};

export const approveAllAttendance = async (req, res) => {
    try {
        // Log the incoming request for debugging
        console.log("approveAllAttendance called:", {
            user: req.user,
            body: req.body,
            method: req.method,
            url: req.originalUrl,
        });

        // Check if user is admin
        if (req.user.role !== "admin") {
            return res
                .status(403)
                .json({
                    error: "Unauthorized: Only admins can approve attendance",
                });
        }

        // Find all pending attendance records
        const pendingRecords = await Attendance.find({
            status: "pending",
        });

        console.log(`Found ${pendingRecords.length} pending records`);

        // Update all pending records to approved
        const updateResult = await Attendance.updateMany(
            { status: "pending" },
            {
                $set: {
                    status: "approved",
                    approvedBy: req.user.id,
                    approvalDate: moment().tz("Asia/Kolkata").toDate(),
                    rejectionReason: null,
                },
            },
        );

        // Check if no records were updated
        if (updateResult.modifiedCount === 0) {
            return res.status(200).json({
                message: "All attendance records are already approved",
                updatedRecords: [],
            });
        }

        // Fetch updated records for response
        const updatedRecords = await Attendance.find({
            status: "approved",
        })
            .populate([
                { path: "employeeId", select: "name employeeId" },
                { path: "project", select: "name" },
            ])
            .sort({ date: -1, checkInTime: -1 });

        res.json({
            message: `Successfully approved ${updateResult.modifiedCount} attendance records`,
            updatedRecords,
        });
    } catch (error) {
        console.error("Approve all attendance error:", error);
        res.status(500).json({
            error: "Internal server error during approve all attendance",
        });
    }
};

export const generateAttendanceReport = async (req, res) => {
    try {
        const { month, year, employeeId } = req.query;

        if (!month || !year) {
            return res
                .status(400)
                .json({ error: "Month and year are required" });
        }

        const startDate = moment
            .tz(`${year}-${month}-01`, "Asia/Kolkata")
            .startOf("month")
            .toDate();
        const endDate = moment
            .tz(`${year}-${month}-01`, "Asia/Kolkata")
            .endOf("month")
            .toDate();

        let matchQuery = {
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        if (employeeId) {
            // Find the user by employeeId (string) to get the corresponding _id
            const user = await User.findOne({ employeeId: employeeId });
            if (!user) {
                return res.status(400).json({ error: "Invalid employee ID" });
            }
            // Use the user's _id in the match query
            matchQuery.employeeId = user._id;
        }

        const report = await Attendance.aggregate([
            {
                $match: matchQuery,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employee",
                },
            },
            {
                $unwind: "$employee",
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project",
                    foreignField: "_id",
                    as: "projectDetails",
                },
            },
            {
                $unwind: {
                    path: "$projectDetails",
                    preserveNullAndEmptyArrays: true, // Handle cases where project is null
                },
            },
            {
                $group: {
                    _id: "$employeeId",
                    employeeName: { $first: "$employee.name" },
                    employeeId: { $first: "$employee.employeeId" },
                    totalDays: { $sum: 1 },
                    approvedDays: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
                        },
                    },
                    pendingDays: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
                        },
                    },
                    rejectedDays: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "rejected"] }, 1, 0],
                        },
                    },
                    totalWorkingHours: { $sum: "$workingHours" },
                    averageWorkingHours: { $avg: "$workingHours" },
                    projects: { $addToSet: "$projectDetails.name" }, // Collect unique project names
                    rejectionReasons: {
                        $push: {
                            $cond: [
                                { $eq: ["$status", "rejected"] },
                                "$rejectionReason",
                                null,
                            ],
                        },
                    }, // Collect rejection reasons
                },
            },
            {
                $project: {
                    _id: 0,
                    employeeId: "$_id",
                    employeeName: 1,
                    employeeCode: "$employeeId",
                    totalDays: 1,
                    approvedDays: 1,
                    pendingDays: 1,
                    rejectedDays: 1,
                    totalWorkingHours: { $round: ["$totalWorkingHours", 2] },
                    averageWorkingHours: {
                        $round: ["$averageWorkingHours", 2],
                    },
                    projects: 1,
                    rejectionReasons: {
                        $setDifference: ["$rejectionReasons", [null]],
                    }, // Remove null values from rejection reasons
                },
            },
        ]);

        res.json({
            month,
            year,
            report,
        });
    } catch (error) {
        console.error("Generate attendance report error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { isRemote, notes, status, projectId, project, rejectionReason } =
            req.body;

        // Validate attendance ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid attendance ID" });
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res
                .status(401)
                .json({ error: "Unauthorized: No user authenticated" });
        }

        // Find attendance record
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res
                .status(404)
                .json({ error: "Attendance record not found" });
        }

        // Check if employeeId exists
        if (!attendance.employeeId) {
            return res
                .status(500)
                .json({
                    error: "Invalid attendance record: Missing employeeId",
                });
        }

        // Check if user has permission
        if (
            req.user.id !== attendance.employeeId.toString() &&
            req.user.role !== "admin"
        ) {
            return res
                .status(403)
                .json({
                    error: "Unauthorized to update this attendance record",
                });
        }

        // Validate project if provided
        const projectValue = projectId || project;
        if (projectValue) {
            if (!mongoose.Types.ObjectId.isValid(projectValue)) {
                return res
                    .status(400)
                    .json({
                        error: `Invalid project ID format: ${projectValue}`,
                    });
            }
            const projectExists = await Project.findById(projectValue);
            if (!projectExists) {
                return res.status(404).json({ error: "Project not found" });
            }
            if (
                !projectExists.assignedEmployees.includes(attendance.employeeId)
            ) {
                return res
                    .status(403)
                    .json({
                        error: "Employee is not assigned to the specified project",
                    });
            }
            attendance.project = new mongoose.Types.ObjectId(projectValue);
        }

        // Update fields if provided
        if (isRemote !== undefined) {
            attendance.isRemote = isRemote;
        }
        if (notes !== undefined) {
            attendance.notes = notes ? `${notes}` : "";
        }
        if (status && ["pending", "approved", "rejected"].includes(status)) {
            attendance.status = status;
            if (status !== "pending") {
                attendance.approvedBy = req.user.id;
                attendance.approvalDate = moment().tz("Asia/Kolkata").toDate();
            }
            // Handle rejectionReason
            if (status === "rejected") {
                if (
                    !rejectionReason ||
                    typeof rejectionReason !== "string" ||
                    rejectionReason.trim() === ""
                ) {
                    return res
                        .status(400)
                        .json({
                            error: "Rejection reason is required when status is rejected",
                        });
                }
                attendance.rejectionReason = rejectionReason;
            } else {
                attendance.rejectionReason = undefined; // Clear rejectionReason if status is not rejected
            }
        } else if (status) {
            return res
                .status(400)
                .json({
                    error: "Invalid status. Must be pending, approved, or rejected",
                });
        }

        await attendance.save();

        // Populate project and employee details in the response
        await attendance.populate([
            { path: "employeeId", select: "name employeeId" },
            { path: "project", select: "name" },
        ]);

        res.json({
            message: "Attendance updated successfully",
            attendance,
        });
    } catch (error) {
        console.error("Update attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid attendance ID" });
        }

        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res
                .status(404)
                .json({ error: "Attendance record not found" });
        }

        if (req.user.role !== "admin") {
            return res
                .status(403)
                .json({ error: "Unauthorized to delete attendance records" });
        }

        await Attendance.deleteOne({ _id: id });

        res.json({
            message: "Attendance record deleted successfully",
        });
    } catch (error) {
        console.error("Delete attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getTodayAttendance = async (req, res) => {
    try {
        const { status, employeeId } = req.query;

        // Set date range for today in IST
        const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
        const tomorrow = moment(today)
            .tz("Asia/Kolkata")
            .add(1, "day")
            .toDate();

        let query = {
            date: {
                $gte: today,
                $lt: tomorrow,
            },
        };

        // Filter by status if provided
        if (status) {
            query.status = status;
        }

        // Filter by employeeId if provided and user is admin
        if (employeeId && req.user.role === "admin") {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({ error: "Invalid employee ID" });
            }
            query.employeeId = employeeId;
        } else if (employeeId) {
            return res
                .status(403)
                .json({
                    error: "Unauthorized to view other employee attendance",
                });
        }

        // Fetch all attendance records matching the query
        const attendance = await Attendance.find(query)
            .populate([
                {
                    path: "employeeId",
                    select: "name employeeId profilePicture",
                },
                { path: "project", select: "name" }, // Populate project details
            ])
            .sort({ checkInTime: -1 });

        console.log(
            `Fetched ${attendance.length} attendance records for today`,
        );

        res.json({
            date: today,
            attendance,
        });
    } catch (error) {
        console.error("Get today attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getWeeklyAttendance = async (req, res) => {
    try {
        const { status, employeeId, weekStart } = req.query;

        let startDate = weekStart
            ? moment.tz(weekStart, "Asia/Kolkata").startOf("day").toDate()
            : moment().tz("Asia/Kolkata").startOf("day").toDate();

        // If no weekStart provided, use current week's start (Monday)
        if (!weekStart) {
            const dayOfWeek = moment(startDate).tz("Asia/Kolkata").day();
            const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            startDate.setDate(startDate.getDate() - diffToMonday);
        }

        const endDate = moment(startDate)
            .tz("Asia/Kolkata")
            .add(6, "days")
            .endOf("day")
            .toDate();

        let query = {
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        if (status) {
            query.status = status;
        }

        if (employeeId && req.user.role === "admin") {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({ error: "Invalid employee ID" });
            }
            query.employeeId = employeeId;
        } else if (employeeId) {
            return res
                .status(403)
                .json({
                    error: "Unauthorized to view other employee attendance",
                });
        }

        const attendance = await Attendance.find(query)
            .populate([
                {
                    path: "employeeId",
                    select: "name employeeId profilePicture",
                },
                { path: "project", select: "name" }, // Populate project details
            ])
            .sort({ date: -1, checkInTime: -1 });

        res.json({
            weekStart: startDate,
            weekEnd: endDate,
            attendance,
        });
    } catch (error) {
        console.error("Get weekly attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getMonthlyAttendance = async (req, res) => {
    try {
        const { status, employeeId, month, year } = req.query;

        if (!month || !year) {
            return res
                .status(400)
                .json({ error: "Month and year are required" });
        }

        const startDate = moment
            .tz(`${year}-${month}-01`, "Asia/Kolkata")
            .startOf("month")
            .toDate();
        const endDate = moment
            .tz(`${year}-${month}-01`, "Asia/Kolkata")
            .endOf("month")
            .toDate();

        let query = {
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        if (status) {
            query.status = status;
        }

        if (employeeId && req.user.role === "admin") {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(400).json({ error: "Invalid employee ID" });
            }
            query.employeeId = employeeId;
        } else if (employeeId) {
            return res
                .status(403)
                .json({
                    error: "Unauthorized to view other employee attendance",
                });
        }

        const attendance = await Attendance.find(query)
            .populate([
                {
                    path: "employeeId",
                    select: "name employeeId profilePicture",
                },
                { path: "project", select: "name" }, // Populate project details
            ])
            .sort({ date: -1, checkInTime: -1 });

        res.json({
            month,
            year,
            attendance,
        });
    } catch (error) {
        console.error("Get monthly attendance error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Cron job for automatic check-out after 8 hours
export const autoCheckOut = () => {
    // Run every hour
    cron.schedule("0 * * * *", async () => {
        try {
            console.log(
                "Running auto check-out cron job at:",
                moment().tz("Asia/Kolkata").toDate(),
            );
            const eightHoursAgo = moment()
                .tz("Asia/Kolkata")
                .subtract(8, "hours")
                .toDate();

            // Find records with no checkOutTime and checkInTime older than 10 hours
            const pendingRecords = await Attendance.find({
                checkOutTime: { $exists: false },
                checkInTime: { $lte: eightHoursAgo },
            });

            console.log(
                `Found ${pendingRecords.length} records for auto check-out`,
            );

            for (const record of pendingRecords) {
                record.checkOutTime = moment(record.checkInTime)
                    .tz("Asia/Kolkata")
                    .add(8, "hours")
                    .toDate();
                record.notes = "Automatic checkout after 8 hours";
                await record.save();
                console.log(
                    `Auto checked out record for employee ${record.employeeId} at ${record.checkOutTime}`,
                );
            }
        } catch (error) {
            console.error("Auto check-out cron job error:", error);
        }
    });
};

// Initialize cron job when server starts
autoCheckOut();
