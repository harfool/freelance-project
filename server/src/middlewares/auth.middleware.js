import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import User from "../models/user.model.js";

// when paremeter is empty give _
export const verifyJWT = asyncHandler(async (req, _, next) => {
    const REFRESH_TOKEN_SECRET =
        process.env.REFRESH_TOKEN_SECRET ||
        "YDTCGSJHBKsdwsHUGYDI7Q867R68DVHBUDGVUHIGYDTFSVHBDUBKJS";
    const ACCESS_TOKEN_SECRET =
        process.env.ACCESS_TOKEN_SECRET ||
        "YDTCGSJHBKsHUswGYDI7Q867R68DVHBUDGVUHIGYDTFSVHBDUBKJS";

    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorization request");
        }
        const ACCESS_TOKEN_SECRET =
            process.env.ACCESS_TOKEN_SECRET ||
            "YDTCGSJHBKsHUswGYDI7Q867R68DVHBUDGVUHIGYDTFSVHBDUBKJS";
        const decodedToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken",
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token ");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.massage || "Invalid access token ");
    }
});


