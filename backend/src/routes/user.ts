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

router.get("/userProfile", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        licence: true, // Includes all fields of the related licence table
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ msg: "Failed to fetch profile" });
  }
});

router.post(
  "/uploadProfileImg",
  upload.single("profileImg"),
  async (req: Request, res: Response) => {
    const userId = req.userId;
    console.log("file", req.file);
    console.log("recieved at backend route");
    const profileImgPath = req.file?.path; // Assuming the frontend sends the profile image path
    console.log(userId);
    console.log("ImagePath", profileImgPath);

    try {
      if (!profileImgPath) {
        return res.status(400).json({ msg: "Profile image path is required" });
      }

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
      return res.status(200).json({
        msg: "Profile Photo updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ msg: "Failed to update profile" });
    }
  }
);

router.post(
  "/uploadDrivingLicense",
  upload.array("licenseImg", 2),
  async (req: Request, res: Response) => {
    console.log("in update license and user details route");
    const userId = "66412f4f6a2b122fcb90684d"; // Ensure this is set correctly from your authentication middleware
    const files = req.files as Express.Multer.File[];
    const { contact, email, username } = req.body;

    if (!files || files.length < 2) {
      return res
        .status(400)
        .json({ msg: "Both front and back images are requires" });
    }

    const frontImagePath = files[0]?.path;
    const backImagePath = files[1]?.path;

    try {
      // Start a transaction to handle both the license update and user details
      const [updatedLicense, updatedUser] = await prisma.$transaction([
        // Check if the license already exists for the user
        prisma.license.upsert({
          where: { userId: userId },
          update: {
            frontImg: frontImagePath,
            backImg: backImagePath,
          },
          create: {
            userId: userId,
            frontImg: frontImagePath,
            backImg: backImagePath,
          },
        }),
        // Update user details
        prisma.user.update({
          where: { id: userId },
          data: {
            contact,
            email,
            username,
          },
        }),
      ]);

      return res.status(200).json({
        msg: "License and user details updated successfully",
        license: updatedLicense,
        user: updatedUser,
      });
    } catch (error) {
      console.log("Error uploading License and updating details:", error);
      return res
        .status(500)
        .json({ msg: "Failed to update license and details" });
    }
  }
);

export default router;
