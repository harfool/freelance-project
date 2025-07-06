import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["assigment", "pdf", "notes", "other", "old-paper"],
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        notesUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Material = mongoose.model("Material", materialSchema);
export default Material;
