import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRouter from "./routes/users.js";
import validateRouter from "./routes/validate.js";

const app: Express = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use("/", usersRouter);
app.use("/", validateRouter);

console.log(`Running on port ${PORT}`);

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.json({ message: "alive" });
});

app.listen(PORT);
