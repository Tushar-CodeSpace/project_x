// src/common/middleware/httpLogger.ts
import morgan from "morgan";
import logger from "../../config/logger";

// stream for morgan → pino
const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    },
};

const httpLogger = morgan(
    ":method :url :status :response-time ms",
    { stream }
);

export default httpLogger;