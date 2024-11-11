import { Router } from "express";
import userRoute from "./user";
import eventRoute from "./event";
import authMiddleware from "../middleware/auth.middleware";
import adminRoute from "./admin";
import findEvent from "./findEvent";
import locations from "./locations";
import authRoute from "./auth";
const router = Router();

router.use("/admin", adminRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/event", eventRoute);
router.use("/findEvent", findEvent);
router.use("/location", locations);
export default router;
