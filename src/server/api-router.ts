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

router.post("/contests/:contestId", async (req: Request, res: Response) => {
  // Extracting the contest ID from the request parameters
  const id = req.params.contestId;

  const { name } = req.body;

  // Establishing a database connection
  const client = await connectClient();

  const doc = await client.collection("contests").findOneAndUpdate(
    { id },
    {
      $push: {
        names: {
          id: name.toLowerCase().replace(/\s/g, "-"),
          name: name,
          timestamp: new Date(),
        },
      },
    },
    { returnDocument: "after" }
  );

  res.send({ updatedContest: doc.value });
});

router.post("/contests", async (req: Request, res: Response) => {
  // Establishing a database connection
  const client = await connectClient();

  const { categoryName, contestName, description } = req.body;

  const id: string = description.toLowerCase().replace(/\s/g, "-");

  const doc = await client.collection("contests").insertOne({
    id,
    categoryName,
    contestName,
    description,
    names: [],
  });

  const contest = await client
    .collection("contests")
    .findOne({ _id: doc.insertedId });

  res.send({ contest });
});

export default router;
