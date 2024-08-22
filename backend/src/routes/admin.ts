import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();
interface RequestBody {
  cityName: string;
  locationName: string;
}

router.post("/createCity", async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body as RequestBody;
    const createdCity = await prisma.city.create({
      data: {
        name: cityName,
      },
    });
    res.status(200).json({ createdCity });
  } catch (error) {
    console.log(error);
    res.status(501).json({ error });
  }
});

router.post("/createLocation", async (req: Request, res: Response) => {
  try {
    const { locationName, cityName } = req.body as RequestBody;
    const city = await prisma.city.findUnique({
      where: {
        name: cityName,
      },
      select: {
        id: true,
      },
    });
    const cityId = city!.id;
    const createdLocation = await prisma.location.create({
      data: {
        cityId,
        name: locationName,
      },
    });
    res.status(200).json({ createdLocation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/allCity", (req: Request, res: Response) => {});

export default router;
