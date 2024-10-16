"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const multer_middleware_1 = __importDefault(require("../middleware/multer.middleware"));
const prisma = new client_1.PrismaClient();
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET;
const Gender = ["Male", "Female"];
const signupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    contact: zod_1.default.string(),
    gender: zod_1.default.enum(Gender),
    profileImg: zod_1.default.string(),
});
// const upload = multer({ dest: "./public/profileImages" });
router.post("/signup", async (req, res) => {
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
        if (existingUser)
            return res.status(403).send("user already exist");
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
        const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET);
        return res.status(200).json({
            msg: "user created successfully",
            token: token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ error: err });
    }
});
router.get("/userProfile", async (req, res) => {
    try {
        const userId = "66412f4f6a2b122fcb90684d";
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ msg: "Failed to fetch profile" });
    }
});
router.post("/uploadProfileImg", multer_middleware_1.default.single("profileImg"), async (req, res) => {
    const userId = "66412f4f6a2b122fcb90684d";
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
    }
    catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ msg: "Failed to update profile" });
    }
});
router.post("/uploadDrivingLicense", multer_middleware_1.default.array("licenseImg", 2), async (req, res) => {
    console.log("in update license and user details route");
    const userId = "66412f4f6a2b122fcb90684d"; // Ensure this is set correctly from your authentication middleware
    const files = req.files;
    const { contact, email, username } = req.body;
    if (!files || files.length < 2) {
        return res
            .status(400)
            .json({ msg: "Both front and back images are required" });
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
    }
    catch (error) {
        console.log("Error uploading License and updating details:", error);
        return res
            .status(500)
            .json({ msg: "Failed to update license and details" });
    }
});
exports.default = router;
