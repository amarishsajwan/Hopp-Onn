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
router.post("", async (req: Request, res: Response) => {
  const { pickup, drop, time } = req.body as RequestBody;
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

export default router;
