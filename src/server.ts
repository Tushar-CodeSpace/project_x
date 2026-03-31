export const startServer = async () => {
    console.log("Starting server...");
    // Simulate some async initialization work
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Server started successfully!");
};
