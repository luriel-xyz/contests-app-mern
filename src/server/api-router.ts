/*
  This file contains the Express router configuration for handling contest-related routes.
*/

import express, { Request, Response } from "express";
import cors from "cors";
import { connectClient } from "./db";

// Creating an Express router
const router = express.Router();

// Applying CORS middleware
router.use(cors());

// Handling GET request for retrieving all contests
router.get("/contests", async (req: Request, res: Response) => {
  // Establishing a database connection
  const client = await connectClient();

  // Fetching contests from the "contests" collection and projecting only necessary fields
  const contests = await client
    .collection("contests")
    .find()
    .project({
      _id: 0,
      id: 1,
      categoryName: 1,
      contestName: 1,
    })
    .toArray();

  // Sending the retrieved contests as a response
  res.send({ contests });
});

// Handling GET request for retrieving a specific contest
router.get("/contests/:contestId", async (req: Request, res: Response) => {
  // Extracting the contest ID from the request parameters
  const id = req.params.contestId;

  // Establishing a database connection
  const client = await connectClient();

  // Fetching the contest with the given ID from the "contests" collection
  const contest = await client.collection("contests").findOne({ id });

  // Sending the retrieved contest as a response
  res.send({ contest });
});

export default router;
