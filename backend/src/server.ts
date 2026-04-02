import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
import { getConfig, loadConfig } from "./modules/config/config.service";
import logger from "./config/logger";

dotenv.config({ quiet: true });


const startServer = async () => {
    logger.info("Connecting to database...");

    await connectDB();
    await loadConfig();
    const PORT = getConfig("port")

    app.listen(PORT, () => {
        logger.info({ port: PORT }, "Server running on port");
    });
};

startServer();