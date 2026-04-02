// src/modules/controllers/controller.model.ts
import mongoose from "mongoose";

const controllerSchema = new mongoose.Schema({
    _id: String, // controller1
    handler: String, // function name
});

export default mongoose.model("Controller", controllerSchema, "app_controllers");