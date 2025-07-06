import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)
export default Course