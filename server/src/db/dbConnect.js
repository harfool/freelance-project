import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log(process.env.MONGO_URI , "url")
    console.log("mongoDB connected");
  } catch (error) {
    console.error("mongoDB connection failed", error);
    process.exit(1)
    
  }
};


export default connectDB