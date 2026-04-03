import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connectionPromise = null;

const connectDB = async () => {
  // 1 = connected
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment");
  }

  // Prevent multiple concurrent connects (common on serverless)
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 15000,
      })
      .then(() => {
        console.log("MongoDB connected");
        return mongoose.connection;
      })
      .catch((err) => {
        // Reset so future requests can retry
        connectionPromise = null;
        console.log("❌ MongoDB connection failed:", err?.message || err);
        throw err;
      });
  }

  return connectionPromise;
};

export default connectDB;