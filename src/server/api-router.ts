import express, { Request, Response } from "express";
import contests from "../contests.json";

const router = express.Router();

router.get("/contests", (req: Request, res: Response) => {
  res.send(contests);
});

export default router;
