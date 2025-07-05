import express from "express"

//route import
const app = express()

// routes 

app.get("/",(req , res) => res.send("hello world"))

export default app