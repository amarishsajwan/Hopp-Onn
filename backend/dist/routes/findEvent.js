"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("", async (req, res) => {
    const { pickup, drop, time } = req.body;
    const parsedTime = new Date(Number(time));
    console.log("reached in findEvents route");
    console.log(pickup, drop, time);
    // fetch pickup and drop location wrt id
    //   const pickupId = await prisma.location.findFirst({
    //     where: {
    //       name: pickup,
    //     },
    //     select: {
    //       id: true,
    //       name: true,
    //     },
    //   });
    //   const dropId = await prisma.location.findFirst({
    //     where: {
    //       name: drop,
    //     },
    //     select: {
    //       id: true,
    //       name: true,
    //     },
    //   });
    //   const pickupLocation = pickup!.name;
    //   const dropLocation = drop!.name;
    const events = await prisma.event.findMany({
        where: {
            pickupLocation: pickup,
            dropLocation: drop,
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
exports.default = router;
