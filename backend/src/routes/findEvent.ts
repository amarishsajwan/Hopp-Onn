import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ClusterTime, DataKey, Timestamp } from "mongodb";

const prisma = new PrismaClient();
const router = Router();
interface RequestBody {
  pickupId: string;
  dropId: string;
  time: string;
}
router.post("", async (req: Request, res: Response) => {
  try {
    const { pickupId, dropId, time } = req.body as RequestBody;
    const parsedTime = new Date(Number(time));
    console.log("reached in findEvents");
    console.log(pickupId, dropId, parsedTime);
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
      },
    });

    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an issue with Db");
  }
});

export default router;
