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

export default router;
