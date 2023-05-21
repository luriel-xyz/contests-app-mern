import express, { Express, Request, Response } from "express";

import config from "./config";
import apiRouter from "./api-router";

const app: Express = express();

app.use(express.static("dist"));

app.set("view engine", "ejs");

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("index", { initialContent: "Loading..." });
});

app.listen(config.PORT, () => {
  console.info(`Express server is running on ${config.SERVER_URL}`);
});
