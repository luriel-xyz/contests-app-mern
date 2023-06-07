/**
 * This is a router file that handles various endpoints related to contests.
 */

import express, { Request, Response } from "express";
import cors from "cors";
import { connectClient } from "./db";

const router = express.Router();

router.use(cors());

/**
 * GET /contests
 * Retrieves all contests
 */
router.get("/contests", async (req: Request, res: Response) => {
  const client = await connectClient();

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

  res.send({ contests });
});

/**
 * GET /contests/:contestId
 * Retrieves a specific contest by its ID
 */
router.get("/contests/:contestId", async (req: Request, res: Response) => {
  const id = req.params.contestId;

  const client = await connectClient();

  const contest = await client.collection("contests").findOne({ id });

  res.send({ contest });
});

/**
 * POST /contests/:contestId
 * Adds a name to a specific contest
 */
router.post("/contests/:contestId", async (req: Request, res: Response) => {
  const id = req.params.contestId;

  const { name } = req.body;

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

/**
 * POST /contests
 * Creates a new contest
 */
router.post("/contests", async (req: Request, res: Response) => {
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
