import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
import { getConfig, loadConfig } from "./modules/config/config.service";
import logger from "./config/logger";
import { loadRoutes } from "./modules/routes/route.loader";

dotenv.config({ quiet: true });

const startServer = async () => {
    const isCI = process.env.CI === "true";

    if (!isCI) {
        logger.info("Connecting to database...");
        await connectDB();
    } else {
        logger.info("Skipping DB connection (CI environment)");
    }

    await loadConfig();
    await loadRoutes(app);

    const PORT = getConfig("port");

    app.listen(PORT, () => {
        logger.info({ port: PORT }, "Server running on port");
    });
};

startServer();