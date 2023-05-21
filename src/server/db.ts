import { MongoClient } from "mongodb";

import { MONGODB_URI, DATABASE_NAME } from "./config";

let connectedClient;

// Function to connect to the MongoDB server and return the database object
export const connectClient = async () => {
  if (connectedClient) {
    // If already connected, return the existing database object
    return connectedClient.db(DATABASE_NAME);
  }

  // Create a new MongoClient instance
  const client = new MongoClient(MONGODB_URI);

  // Connect to the MongoDB server
  await client.connect();

  // Ping the database to check the connection
  await client.db(DATABASE_NAME).command({ ping: 1 });
  console.info("Connected to MongoDB");

  // Store the connected client for reuse
  connectedClient = client;

  // Return the database object
  return connectedClient.db(DATABASE_NAME);
};

// Function to stop the MongoDB client and close the connection
export const stopClient = async () => {
  if (connectedClient) {
    await connectedClient.close();
    console.log("Connection closed");
  }
};
