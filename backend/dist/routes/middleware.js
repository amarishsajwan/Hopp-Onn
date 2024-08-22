"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
async function default_1(req, res, next) {
    const authHead = req.headers.authorization;
    if (!authHead || !authHead.startsWith("Bearer ")) {
        return res.status(403).json({ msg: "access denied" });
    }
    const token = authHead.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded) {
            req.userId = decoded.userId.id;
            next();
        }
        else {
            res.status(403).json({ msg: "authentication failed " });
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = default_1;
