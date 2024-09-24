"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("", async (req, res) => {
    const { pickup, drop, time } = req.body;
    const parsedTime = new Date(Number(time));
    console.log("reached in findEvents");
    console.log(pickup, drop, time);
    const events = await prisma.event.findMany({
        where: {
            pickupLocation: pickup,
            dropLocation: drop,
        },
        select: {
            id: true,
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
    res.status(200).json(events);
});
exports.default = router;
