import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in environment")
        }

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000,
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log("❌ MongoDB connection failed:", error?.message || error)
        // Don't kill the process; keep server alive for debugging / non-DB routes
        // Seed/admin routes will fail until DB is reachable.
    }
}

export default connectDB