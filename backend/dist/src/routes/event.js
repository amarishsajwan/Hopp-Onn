"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/create", async (req, res) => {
    try {
        // const userId = req.userId!;
        const userId = "66412f4f6a2b122fcb90684d";
        const { pickupId, dropId, time, price } = req.body;
        console.log("req.body", req.body);
        console.log("reached in create event route");
        console.log("input time", time);
        const today = new Date();
        const dateString = today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
        // Combine today's date with the provided time from frontend (e.g., '11:35')
        const parsedTimeUTC = new Date(`${dateString}T${time}:00`);
        if (isNaN(parsedTimeUTC.getTime())) {
            return res.status(400).json({ error: "Invalid time format" });
        }
        const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
        const parsedTimeIST = new Date(parsedTimeUTC.getTime() + istOffset);
        console.log("parsed time in IST:", parsedTimeIST);
        console.log("parsed time", parsedTimeIST);
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
                time: parsedTimeIST,
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
    const userId = "66412f4f6a2b122fcb90684d";
    const getEvents = await prisma.event.findMany({
        where: {
            userId,
        },
    });
    res.status(200).json(getEvents);
});
router.post("/find", async (req, res) => {
    const { pickupId, dropId, time } = req.body;
    const parsedTime = new Date(time);
    // fetch pickup and drop location wrt id
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
    const events = await prisma.event.findMany({
        where: {
            pickupLocation,
            dropLocation,
            time: parsedTime,
        },
        select: {
            user: {
                select: {
                    username: true,
                    contact: true,
                    gender: true,
                },
            },
            pickupLocation: true,
            dropLocation: true,
            time: true,
        },
    });
    res.status(200).json({ events });
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
exports.default = router;
