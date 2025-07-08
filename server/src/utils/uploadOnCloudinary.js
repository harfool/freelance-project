// import { v2 as cloudinary } from "cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "df2maejnd",
  api_key: "347619653134964",
  api_secret: "hVkEmTo86C5COBuzpMcNCWWttgA",
});

const uploadOnCloudinary = async (filePath) => {
  try {
    // Log the file path to ensure it exists
    console.log("Uploading file to Cloudinary:", filePath);

    const response = await cloudinary.uploader.upload(filePath, {
      folder: "user_avatars", // You can specify a folder name
    });

    // Log the response for debugging
    //   console.log("Cloudinary upload response:", response);

    if (!response || !response.url) {
      throw new Error("Cloudinary upload did not return a URL");
    }

    fs.unlinkSync(filePath);
    return response;
    
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Error uploading file to Cloudinary:", error.message);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

export default uploadOnCloudinary;