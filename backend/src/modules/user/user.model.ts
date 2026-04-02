// src/modules/user/user.model.ts
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true, versionKey: false }
);

userSchema.set("id", false);

export default mongoose.model("User", userSchema, "users");