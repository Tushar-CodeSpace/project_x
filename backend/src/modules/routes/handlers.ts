// src/modules/routes/handlers.ts
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../user/user.model";

export const handlers: Record<string, any> = {
    signupHandler: async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        // basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    },
};