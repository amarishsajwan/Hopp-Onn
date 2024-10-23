import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import parsedTimeIST from "../utils/timeConversion";

const prisma = new PrismaClient();
const router = Router();
interface RequestBody {
  pickupId: string;
  dropId: string;
  time: string;
  id?: string;
  price: number;
}
router.post("/create", async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const { pickupId, dropId, time, price } = req.body as RequestBody;
    console.log("req.body", req.body);
    console.log("reached in create event route");
    console.log("input time", time);
    const parsedTime = parsedTimeIST(time);

    console.log("parsed time in IST:", parsedTime);
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

    const pickupLocation = pickup!.name;
    const dropLocation = drop!.name;
    console.log(pickup, drop);
    const createEvent = await prisma.event.create({
      data: {
        userId,
        pickupLocation,
        dropLocation,
        time: parsedTime,
        price,
      },
    });
    console.log(createEvent);
    res.status(200).json({ event: createEvent });
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an issue with Db");
  }
});

router.get("/myevents", async (req: Request, res: Response) => {
  console.log("reached in my events");
  const userId = req.userId;
  const getEvents = await prisma.event.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json(getEvents);
});

router.put("/update", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { pickupId, dropId, time, id } = req.body as RequestBody;
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
    const pickupLocation = pickup!.name;
    const dropLocation = drop!.name;
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating documents", error: error });
  }
});

router.put("/updateEventStatus", async (req: Request, res: Response) => {
  const userId = req.userId;
});
router.delete("/deleteEvent/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Get the event ID from the URL parameters

  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    // If event doesn't exist, return a 404 error
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the event
    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete event", error });
  }
});

export default router;
