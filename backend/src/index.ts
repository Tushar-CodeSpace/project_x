import { startServer } from "./server";

console.log("Hello via Bun!");

startServer().catch((error) => {
    console.error("Error starting server:", error);
});
