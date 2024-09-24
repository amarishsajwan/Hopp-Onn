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
router.post("/uploadProfileImg", multer_middleware_1.default.single("profileImg"), async (req, res) => {
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
    }
    catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).send({ msg: "Failed to update profile" });
    }
});
exports.default = router;
