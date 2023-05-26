import express, { Express, Request, Response } from "express";
import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

const app: Express = express();

app.use(express.static("dist"));

app.set("view engine", "ejs");

app.use("/api", apiRouter);

app.get(["/", "/contests/:contestId"], async (req: Request, res: Response) => {
  const { initialMarkup, initialData } = await serverRender(req);

  res.render("index", { initialMarkup, initialData });
});

app.listen(config.PORT, () => {
  console.info(`Express server is running on ${config.SERVER_URL}`);
});
