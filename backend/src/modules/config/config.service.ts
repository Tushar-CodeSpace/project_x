import Config from "./config.model";

let cachedConfig: Record<string, any> = {};

export const loadConfig = async () => {
    const config = await Config.findOne();

    cachedConfig = config ? config.toObject() : {};

    console.log("Config loaded:", cachedConfig);
};

export const getConfig = (key: string) => {
    return cachedConfig[key];
};