import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import parsedTimeIST from "../utils/timeConversion";
const prisma = new PrismaClient();
const router = Router();
interface RequestBody {
  pickupId: string;
  dropId: string;
  fromTime: string;
  toTime: string;
}
router.post("", async (req: Request, res: Response) => {
  try {
    const { pickupId, dropId, fromTime, toTime } = req.body as RequestBody;
    console.log("req body", pickupId, dropId, fromTime, toTime);
    const parsedFromTimeIST = parsedTimeIST(fromTime);
    const parsedToTimeIST = parsedTimeIST(toTime);
    if (
      isNaN(parsedFromTimeIST.getTime()) ||
      isNaN(parsedToTimeIST.getTime())
    ) {
      return res.status(400).json({
        error: "Invalid time range.",
      });
    }
    console.log("reached in findEvents");
    console.log("parsed from time ", parsedFromTimeIST);
    console.log("parsed to time ", parsedToTimeIST);
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
    console.log("prisma pickup drop", pickup, drop);
    if (!pickup || !drop) {
      return res.status(400).json({
        error: "Invalid pickup or drop location.",
      });
    }

    const events = await prisma.event.findMany({
      where: {
        pickupLocation: pickup.name,
        dropLocation: drop.name,
        time: {
          gte: parsedFromTimeIST, // Event time greater than or equal to 'fromTime'
          lte: parsedToTimeIST, // Event time less than or equal to 'toTime'
        },
      },
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
    });
    console.log("events", events);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an issue with Db");
  }
});

export default router;
