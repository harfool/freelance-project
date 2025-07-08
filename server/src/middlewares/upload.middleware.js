import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "courses", // Cloudinary folder name
        allowedFormats: ["jpg", "png", "jpeg", "pdf"], // Allowed formats
    },
});

const upload = multer({ storage });

export default upload;
