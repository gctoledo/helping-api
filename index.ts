import "dotenv/config.js";
import express from "express";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/api/user", async (req: Request, res: Response) => {
  res.status(200).send({ message: "ok" });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
