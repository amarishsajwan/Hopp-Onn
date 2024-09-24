import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import upload from "../middleware/multer.middleware";
import multer from "multer";
const prisma = new PrismaClient();
import zod from "zod";
import jwt, { Secret } from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
import admin from "firebase-admin";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const Gender = ["Male", "Female"] as const;
const signupSchema = zod.object({
  username: zod.string(),
  contact: zod.string(),
  gender: zod.enum(Gender),
  profileImg: zod.string(),
});
// const upload = multer({ dest: "./public/profileImages" });

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, contact, gender, profileImg } = req.body;

    const { success, error } = signupSchema.safeParse(req.body);
    console.log("validation", signupSchema.safeParse(req.body));
    if (!success) {
      return res.status(403).json({
        msg: "validation failed",
        error: error,
      });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        contact,
      },
    });
    if (existingUser) return res.status(403).send("user already exist");

    await prisma.user.create({
      data: {
        username,
        contact,
        gender,
        profileImg,
      },
    });
    const userId = await prisma.user.findUnique({
      where: {
        contact, // Assuming 'contact' is the field to filter by
      },
      select: {
        id: true, // Select the 'id' field instead of '_id'
      },
    });
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(200).json({
      msg: "user created successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: err });
  }
});

router.post(
  "/uploadProfileImg",
  upload.single("profileImg"),
  async (req: Request, res: Response) => {
    console.log("body", req.body);
    console.log("file", req.file);
    res.status(200).send({ msg: "received" });
    const profileImgPath = req.body.profileImgPath; // Assuming the frontend sends the profile image path
    const userId = req.userId;

    if (!profileImgPath) {
      return res.status(400).send({ msg: "Profile image path is required" });
    }

    try {
      // Assuming the contact is unique and used to find the user
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileImg: profileImgPath, // Update the profileImg field with the uploaded image path
        },
      });

      // Send back the updated user data
      res.status(200).send({
        msg: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).send({ msg: "Failed to update profile" });
    }
  }
);
export default router;
