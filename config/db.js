import mongoose from "mongoose";

//config/db.js

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`DB connection error: ${error.message}`)
        process.exit(1)
    }
}