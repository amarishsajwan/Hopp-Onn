import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "access denied" });
  }
  const token = authHead.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (decoded) {
      req.userId = decoded.userId.id;
      next();
    } else {
      res.status(403).json({ msg: "authentication failed " });
    }
  } catch (error) {
    console.log(error);
  }
}
