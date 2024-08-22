import express, { Request, Response, NextFunction } from "express";
import bodyParser, { json } from "body-parser";
import mainRoute from "./routes/mainRoute";
import * as dotenv from "dotenv";
import cors from "cors";
import swaggerSpec from "./swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", mainRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
