import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import zod from "zod";
import jwt, { Secret } from "jsonwebtoken";
import authMiddleware from "./middleware.js";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const Gender = ["Male", "Female"] as const;
const signupSchema = zod.object({
  username: zod.string(),
  contact: zod.string(),
  gender: zod.enum(Gender),
});

router.post("/signup", async (req: Request, res: Response) => {
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
    if (existingUser) return res.status(403).send("user already exist");

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
router.put("/updateProfile", async (req: Request, res: Response) => {
  const { username, contact, gender } = req.body;

  try {
  } catch (error) {
    console.log(error);
  }
});
router.post("/signin", async (req: Request, res: Response) => {});

export default router;
