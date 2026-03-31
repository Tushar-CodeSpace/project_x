// src/modules/config/config.model.ts
import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true },
        value: { type: mongoose.Schema.Types.Mixed },
        port: { type: Number },
    },
    { timestamps: true }
);

// 👇 force collection name = "configs"
export default mongoose.model("Config", configSchema, "app_configs");