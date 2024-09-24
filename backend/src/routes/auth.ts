import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import zod from "zod";
import jwt, { Secret } from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
import admin from "../services/firebaseAdmin";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const signupSchema = zod.object({
  phoneNumber: zod.string(),
});

router.post("/sendOTP", async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const { success, error } = signupSchema.safeParse(req.body);
  console.log(phoneNumber);
  if (!success) {
    return res
      .status(400)
      .json({ msg: "Phone number is required", error: error });
  }

  try {
    const session = await admin
      .auth()
      .createSessionCookie(phoneNumber, { expiresIn: 60 * 60 * 24 * 1000 }); // 1-day session
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Error sending OTP: ", error);
    return res.status(500).json({ error: error });
  }
});

router.post("/verifyOTP", async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(otp);

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
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
});

export default router;
