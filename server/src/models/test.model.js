import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: String,
        },
    ],
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
}, { timestamps: true });


const Test = mongoose.model("Test", testSchema)
export default Test