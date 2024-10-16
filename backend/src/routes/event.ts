import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ClusterTime, DataKey, Timestamp } from "mongodb";

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
    // const userId = req.userId!;
    const userId = "66412f4f6a2b122fcb90684d";

    const { pickupId, dropId, time, price } = req.body as RequestBody;
    console.log("req.body", req.body);
    console.log("reached in create event route");
    console.log("input time", time);
    const today = new Date();
    const dateString = today.toISOString().split("T")[0]; // Extract YYYY-MM-DD

    // Combine today's date with the provided time from frontend (e.g., '11:35')
    const parsedTimeUTC = new Date(`${dateString}T${time}:00`);
    if (isNaN(parsedTimeUTC.getTime())) {
      return res.status(400).json({ error: "Invalid time format" });
    }
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const parsedTimeIST = new Date(parsedTimeUTC.getTime() + istOffset);

    console.log("parsed time in IST:", parsedTimeIST);
    console.log("parsed time", parsedTimeIST);

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
        time: parsedTimeIST,
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
  const userId = "66412f4f6a2b122fcb90684d";
  const getEvents = await prisma.event.findMany({
    where: {
      userId,
    },
  });

  res.status(200).json(getEvents);
});

router.post("/find", async (req: Request, res: Response) => {
  const { pickupId, dropId, time } = req.body as RequestBody;
  const parsedTime = new Date(time);
  // fetch pickup and drop location wrt id
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

  const events = await prisma.event.findMany({
    where: {
      pickupLocation,
      dropLocation,
      time: parsedTime,
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
