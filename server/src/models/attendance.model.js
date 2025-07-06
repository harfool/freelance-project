import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Attendance = mongoose.model("Attendance", attendanceSchema)
export default Attendance