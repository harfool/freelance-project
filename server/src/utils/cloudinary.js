// import { v2 as cloudinary } from "cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

import dotenv from "dotenv";
dotenv.config("../.env");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
