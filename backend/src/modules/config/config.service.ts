import logger from "../../config/logger";
import Config from "./config.model";

let cachedConfig: Record<string, any> = {};

export const loadConfig = async () => {
    const config = await Config.findOne();

    cachedConfig = config ? config.toObject() : {};

    logger.info({ config }, "Config loaded successfully");
};

export const getConfig = (key: string) => {
    return cachedConfig[key];
};