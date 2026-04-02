import logger from "../../config/logger";
import Config from "./config.model";

let cachedConfig: Record<string, any> = {};

export const loadConfig = async () => {
    const config = await Config.findOne({ _id: process.env.APP_ID });
    if (!config) {
        logger.warn(
            { APP_ID: process.env.APP_ID },
            "No config found for the given APP_ID"
        );
        process.exit(1);
        return;
    }
    cachedConfig = config ? config.toObject() : {};

    logger.info({ config }, "Config loaded successfully");
};

export const getConfig = (key: string) => {
    return cachedConfig[key];
};