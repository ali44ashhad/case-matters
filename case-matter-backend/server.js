import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import seedAdmin from "./seeding/seedAdmin.js"
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors(
    {   
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
))
app.use(express.json())
app.use(cookieParser())
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)

connectDB()

mongoose.connection.once("open", async () => {
    try {
        await seedAdmin()
    } catch (e) {
        console.log("❌ Seed admin failed:", e?.message || e)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})