"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebaseAdmin_1 = __importDefault(require("../services/firebaseAdmin"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET;
const signupSchema = zod_1.default.object({
    phoneNumber: zod_1.default.string(),
});
router.post("/sendOTP", async (req, res) => {
    const { phoneNumber } = req.body;
    const { success, error } = signupSchema.safeParse(req.body);
    console.log(phoneNumber);
    if (!success) {
        return res
            .status(400)
            .json({ msg: "Phone number is required", error: error });
    }
    try {
        const session = await firebaseAdmin_1.default
            .auth()
            .createSessionCookie(phoneNumber, { expiresIn: 60 * 60 * 24 * 1000 }); // 1-day session
        return res.status(200).json({ session });
    }
    catch (error) {
        console.error("Error sending OTP: ", error);
        return res.status(500).json({ error: error });
    }
});
router.post("/verifyOTP", async (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        return res.status(400).json({ error: "Phone number and OTP are required" });
    }
    try {
        // Verify the ID token
        const decodedToken = await firebaseAdmin_1.default.auth().verifyIdToken(otp);
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid OTP" });
        }
        // Check if user exists
        let user = await prisma.user.findFirst({ where: { contact: phoneNumber } });
        // If user doesn't exist, create a new one
        if (!user) {
            user = await prisma.user.create({
                data: {
                    username: "Aman", // Replace with actual user details if available
                    contact: phoneNumber,
                    gender: "Male", // Placeholder value
                },
            });
        }
        // Generate a custom JWT token for session management
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error verifying OTP: ", error);
        return res.status(500).json({ error: "Failed to verify OTP" });
    }
});
exports.default = router;
