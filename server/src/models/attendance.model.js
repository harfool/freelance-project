import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: false,
        },
        date: {
            type: Date,
            required: true,
        },
        checkInTime: {
            type: Date,
            required: true,
        },
        checkOutTime: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        approvalDate: {
            type: Date,
        },
        rejectionReason: {
            type: String,
        },
        workingHours: {
            type: Number,
        },
        notes: {
            type: String,
        },
        isRemote: {
            type: Boolean,
            default: false,
        },
        checkInLocation: {
            type: {
                latitude: { type: Number },
                longitude: { type: Number },
            },
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

// Proper unique index with sparse option to handle null values
attendanceSchema.index(
    { employeeId: 1, date: 1 },
    {
        unique: true,
        sparse: true,
        name: "employee_date_unique",
    },
);

// Pre-save middleware to calculate working hours and validate project
attendanceSchema.pre("save", async function (next) {
    // Calculate working hours
    if (this.checkInTime && this.checkOutTime) {
        const checkInMs = this.checkInTime.getTime();
        const checkOutMs = this.checkOutTime.getTime();
        this.workingHours = (checkOutMs - checkInMs) / (1000 * 60 * 60);
    }

    // Validate project if provided
    if (this.project) {
        const projectExists = await mongoose
            .model("Project")
            .findById(this.project);
        if (!projectExists) {
            throw new Error("Invalid project ID: Project not found");
        }
        // Ensure employee is assigned to the project
        if (!projectExists.assignedEmployees.includes(this.employeeId)) {
            throw new Error(
                "Employee is not assigned to the specified project",
            );
        }
    }

    next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;