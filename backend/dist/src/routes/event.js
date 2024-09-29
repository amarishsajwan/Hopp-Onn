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
        const { pickupId, dropId, time } = req.body;
        const parsedTime = new Date(time);
        console.log("input time", time);
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
    const userId = req.userId;
    const getEvents = await prisma.event.findMany({
        where: {
            userId,
        },
        select: {
            pickupLocation: true,
            dropLocation: true,
            user: {
                select: {
                    username: true,
                    contact: true,
                    gender: true,
                },
            },
            time: true,
        },
    });
    res.status(200).json({ getEvents });
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
        res.status(500).json({ message: "Error updating document", error: error });
    }
});
router.put("/updateEventStatus", async (req, res) => {
    const userId = req.userId;
});
exports.default = router;
