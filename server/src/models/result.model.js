import mongoose, { mongo } from "mongoose";

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
    totalMarks: {
        type: Number,
        required: true
    },
    percentage: {
        type: Float32Array,
        requried: true
    }
}, { timestamps: true })


const Result = mongoose.model("Result", resultSchema)
export default Result