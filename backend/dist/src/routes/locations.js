"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/cities", async (req, res) => {
    console.log("reached in findEvents route");
    //   fetch all city names
    const cities = await prisma.city.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    res.status(200).json(cities);
});
router.get("/city/places", async (req, res) => {
    console.log("reached in findEvents route");
    //   fetch all city names
    const places = await prisma.location.findMany({
        select: {
            id: true,
            cityId: true,
            name: true,
        },
    });
    res.status(200).json(places);
});
exports.default = router;
