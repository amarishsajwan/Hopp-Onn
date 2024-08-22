"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const event_1 = __importDefault(require("./event"));
const admin_1 = __importDefault(require("./admin"));
const findEvent_1 = __importDefault(require("./findEvent"));
const router = (0, express_1.Router)();
router.use("/admin", admin_1.default);
router.use("/user", user_1.default);
router.use("/event", event_1.default);
router.use("/findEvent", findEvent_1.default);
exports.default = router;
