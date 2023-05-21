const env = process.env;

// Set the PORT variable to the value from the environment variables, or default to 3000
export const PORT = env.PORT ?? 3000;

// Set the SERVER_URL variable using the PORT value
export const SERVER_URL = `http://localhost:${PORT}`;

// Set the MONGODB_URI variable to the value from the environment variables, or use a default connection string
export const MONGODB_URI =
  env.MONGODB_URI ??
  "mongodb+srv://sogoxew179:uqeMDkUF3WGe1RCs@cluster0.za3m9pq.mongodb.net/";

// Set the DATABASE_NAME variable to the value from the environment variables, or default to "contest"
export const DATABASE_NAME = env.DATABASE_NAME ?? "contest";

// Export the variables as an object
export default {
  PORT,
  SERVER_URL,
  MONGODB_URI,
  DATABASE_NAME,
};
