/**
 * Server Configuration
 *
 * This file loads the environment variables from the .env file
 * and exports them as constants for use in the server.
 */

import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "../../.env") });

const env = process.env;

export const PORT = env.PORT ?? 3000;

export const SERVER_URL = `http://localhost:${PORT}`;

export const MONGODB_URI = env.MONGODB_URI;

export const DATABASE_NAME = env.DATABASE_NAME ?? "contest";

export default {
  PORT,
  SERVER_URL,
  MONGODB_URI,
  DATABASE_NAME,
};
