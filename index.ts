import "dotenv/config.js";
import express from "express";
import { Request, Response } from "express";

import { GetUserByIdController } from "./src/controller/get-user-by-id";

const app = express();

app.use(express.json());

app.get("/api/users/:userId", async (req: Request, res: Response) => {
  const getUserByIdController = new GetUserByIdController();

  const response = await getUserByIdController.execute(req);

  res.status(response.statusCode).send(response.body);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
