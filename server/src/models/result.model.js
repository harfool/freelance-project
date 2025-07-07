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
    answers: [
        {
            type: String,
            required: true
        }
    ],
    totalMarks: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
}, { timestamps: true })


const Result = mongoose.model("Result", resultSchema)
export default Result