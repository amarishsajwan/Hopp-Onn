import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ClusterTime, DataKey, Timestamp } from "mongodb";

const prisma = new PrismaClient();
const router = Router();
interface RequestBody {
  pickup: string;
  drop: string;
  time: string;
}
router.get("/cities", async (req: Request, res: Response) => {
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
router.get("/city/places", async (req: Request, res: Response) => {
  console.log("reached in places route");
  //   fetch all city names
  try {
    const places = await prisma.location.findMany({
      select: {
        id: true,
        cityId: true,
        name: true,
      },
    });
    res.status(200).json(places);
  } catch (error) {
    console.log("error", error);
  }
});

export default router;
