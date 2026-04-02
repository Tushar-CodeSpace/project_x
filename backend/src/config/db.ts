import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        logger.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;