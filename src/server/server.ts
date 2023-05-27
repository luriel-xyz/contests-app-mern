/**
 * Express Server
 *
 * This module sets up and starts the Express server for the application.
 * It handles static file serving, API routes, server-side rendering, and
 * listens for incoming requests on the specified port.
 */

import express, { Express, Request, Response } from "express";
import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

const app: Express = express();

// Serve static files from the "dist" directory
app.use(express.static("dist"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// API routes
app.use("/api", apiRouter);

// Handle requests for the home page and contest pages
app.get(["/", "/contests/:contestId"], async (req: Request, res: Response) => {
  const { initialMarkup, initialData } = await serverRender(req);

  // Render the "index" view with the initial markup and initial data
  res.render("index", { initialMarkup, initialData });
});

// Start the server and listen on the specified port
app.listen(config.PORT, () => {
  console.info(`Express server is running on ${config.SERVER_URL}`);
});
