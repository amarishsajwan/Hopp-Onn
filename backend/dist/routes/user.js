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
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET;
const Gender = ["Male", "Female"];
const signupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    contact: zod_1.default.string(),
    gender: zod_1.default.enum(Gender),
});
router.post("/signup", async (req, res) => {
    try {
        const { username, contact, gender } = req.body;
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
router.put("/updateProfile", async (req, res) => {
    const { username, contact, gender } = req.body;
    try {
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/signin", async (req, res) => { });
exports.default = router;
