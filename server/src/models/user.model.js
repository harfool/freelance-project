import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        requried: true,
        trim: true,
    },
    lname: {
        type: String,
        requried: true,
        trim: true,
    },
    mobileno: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["STUDENT", "ADMIN"],
        default: "STUDENT",
    },
    rollNo: {
        type: String,
        unique: true,
        sparse: true,
        required: function () {
            return this.role === "STUDENT";
        },
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },
    ],
    attendance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
    // Announcements: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Announcements",
    //     }
    // ]

}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;