import express, { Request, Response, NextFunction } from "express";
import bodyParser, { json } from "body-parser";
import mainRoute from "./src/routes/mainRoute";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerSpec from "./src/swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", async (req: Request, res: Response, next: NextFunction) => {
  req.userId = "66412f4f6a2b122fcb90684d";
  next();
});
app.use("/public", express.static("public"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", mainRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
