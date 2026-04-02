import express from "express";
import defaultRoutes from "./modules/default/default.routes";
import httpLogger from "./common/middleware/httpLogger";


const app = express();

app.use(express.json());
app.use(httpLogger);

app.use("/api", defaultRoutes);


export default app;