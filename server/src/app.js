import express from "express"

//route import
import testRouters from "./routes/test.routes.js"
import materialRouters from "./routes/material.routes.js"
import courseRouters from "./routes/course.routes.js"
import announcementRouters from "./routes/announcement.routes.js"

const app = express()

// routes
app.use("/api/v1/tests", testRouters)
app.use("/api/v1/materials", materialRouters)
app.use("/api/v1/courses", courseRouters)
app.use("/api/v1/announcements", announcementRouters)

app.get("/",(req , res) => res.send("hello world"))

export default app