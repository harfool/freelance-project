import express from "express";

//route import
import UserRouter from "./routes/user.routes.js";
import materialRouters from "./routes/material.routes.js";
import courseRouters from "./routes/course.routes.js";
import announcementRouters from "./routes/announcement.routes.js";
import testRouters from "./routes/test.routes.js";
const app = express();

// midquares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tests", testRouters);
app.use("/api/v1/materials", materialRouters);
app.use("/api/v1/courses", courseRouters);
app.use("/api/v1/announcements", announcementRouters);

export default app;
