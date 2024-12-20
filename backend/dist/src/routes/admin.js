"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/createCity", async (req, res) => {
    try {
        const { cityName } = req.body;
        const createdCity = await prisma.city.create({
            data: {
                name: cityName,
            },
        });
        res.status(200).json({ createdCity });
    }
    catch (error) {
        console.log(error);
        res.status(501).json({ error });
    }
});
router.post("/createLocation", async (req, res) => {
    try {
        const { locationName, cityName } = req.body;
        const city = await prisma.city.findUnique({
            where: {
                name: cityName,
            },
            select: {
                id: true,
            },
        });
        const cityId = city.id;
        const createdLocation = await prisma.location.create({
            data: {
                cityId,
                name: locationName,
            },
        });
        res.status(200).json({ createdLocation });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
router.get("/allCity", (req, res) => { });
router.get("/allEvents", async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                user: {
                    select: {
                        username: true,
                        contact: true,
                        gender: true,
                        profileImg: true,
                    },
                },
                pickupLocation: true,
                dropLocation: true,
                time: true,
                price: true,
            },
            orderBy: {
                time: "desc", // Sorting by date in descending order
            },
        });
        res.status(200).json(events);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.default = router;
