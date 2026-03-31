import dotenv from "dotenv";
// import app from "./app";
import connectDB from "./config/db";
import { getConfig, loadConfig } from "./modules/config/config.service";

dotenv.config({ quiet: true });


const startServer = async () => {
    await connectDB();
    await loadConfig();
    const PORT = getConfig("port")
    
    console.log("Configuration loaded successfully, port:", PORT);

    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
    // });
};

startServer();