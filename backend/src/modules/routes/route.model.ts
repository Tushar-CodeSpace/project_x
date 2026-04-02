import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    path: { type: String, required: true },
    method: { type: String, required: true },
    handler: { type: String, required: true },
});

export default mongoose.model("Route", routeSchema, "app_routes");