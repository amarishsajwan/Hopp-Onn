"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const timeConversion_1 = __importDefault(require("../utils/timeConversion"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/create", async (req, res) => {
    try {
        const userId = req.userId;
        const { pickupId, dropId, time, price } = req.body;
        console.log("req.body", req.body);
        console.log("reached in create event route");
        console.log("input time", time);
        const parsedTime = (0, timeConversion_1.default)(time);
        console.log("parsed time in IST:", parsedTime);
        console.log("parsed time", parsedTime);
        const pickup = await prisma.location.findUnique({
            where: {
                id: pickupId,
            },
            select: {
                name: true,
            },
        });
        const drop = await prisma.location.findUnique({
            where: {
                id: dropId,
            },
            select: {
                name: true,
            },
        });
        const pickupLocation = pickup.name;
        const dropLocation = drop.name;
        console.log(pickup, drop);
        const createEvent = await prisma.event.create({
            data: {
                userId,
                pickupLocation,
                dropLocation,
                time: parsedTime,
                price,
            },
        });
        console.log(createEvent);
        res.status(200).json({ event: createEvent });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("There is an issue with Db");
    }
});
router.get("/myevents", async (req, res) => {
    console.log("reached in my events");
    const userId = req.userId;
    const getEvents = await prisma.event.findMany({
        where: {
            userId,
        },
    });
    res.status(200).json(getEvents);
});
router.put("/update", async (req, res) => {
    try {
        const userId = req.userId;
        const { pickupId, dropId, time, id } = req.body;
        const parsedTime = new Date(time);
        console.log(parsedTime);
        const pickup = await prisma.location.findUnique({
            where: {
                id: pickupId,
            },
            select: {
                name: true,
            },
        });
        const drop = await prisma.location.findUnique({
            where: {
                id: dropId,
            },
            select: {
                name: true,
            },
        });
        const pickupLocation = pickup.name;
        const dropLocation = drop.name;
        const event = await prisma.event.findUnique({
            where: {
                id,
            },
        });
        const prevent = await prisma.event.findUnique({
            where: {
                id,
            },
        });
        const updatedEvent = await prisma.event.update({
            where: {
                id,
            },
            data: {
                userId,
                pickupLocation,
                dropLocation,
                time: parsedTime,
            },
        });
        res.status(200).json({
            prevEvent: prevent,
            updatedEvent: updatedEvent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating documents", error: error });
    }
});
router.put("/updateEventStatus", async (req, res) => {
    const userId = req.userId;
});
router.delete("/deleteEvent/:id", async (req, res) => {
    const { id } = req.params; // Get the event ID from the URL parameters
    try {
        const event = await prisma.event.findUnique({
            where: {
                id,
            },
        });
        // If event doesn't exist, return a 404 error
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Delete the event
        await prisma.event.delete({
            where: {
                id,
            },
        });
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event", error });
    }
});
exports.default = router;
