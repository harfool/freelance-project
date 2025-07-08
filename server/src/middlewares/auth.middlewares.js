import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized token");
        }

        const user = await User.findById(decodedToken?._id).select(
            "-password",
        );

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Error While verify JWT");
        throw new ApiError(500, error?.message || "Error While verify JWT");
    }
});

// Role-based access control
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "You do not have permission to access this resource",
                ),
            );
        }
        next();
    };
};
