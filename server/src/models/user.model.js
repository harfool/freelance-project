import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        // required: true,
        trim: true,
    },
    lname: {
        type: String,
        // required: true,
        trim: true,
    },
    userName: {
        type: String,
        // required: true,
        trim: true,
        
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["STUDENT", "ADMIN"],
        default: "STUDENT",
    },
    rollNo: {
        type: String,
        unique: true,
        sparse: true,
        // required: function () {
        //     return this.role === "STUDENT";
        // },
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        },
    ],
    attendance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
    // Announcements: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Announcements",
    //     }
    // ]

}, {timestamps: true});


// Pre-sxe middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});


const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "YDTCGSJHBKsdwsHUGYDI7Q867R68DVHBUDGVUHIGYDTFSVHBDUBKJS"
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET   ||"YDTCGSJHBKsHUswGYDI7Q867R68DVHBUDGVUHIGYDTFSVHBDUBKJS"


// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: `${this.fname} ${this.lname}`,
      email: this.email,
      userName: this.userName,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY  || "1d" }
  );
};


userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );
};


const User = mongoose.model("User", userSchema);
export default User;