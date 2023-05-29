// Set the default port to 3000 if no port is specified in the environment variables
export const PORT = process.env.PORT ?? 3000;

// Construct the server URL using the specified port
export const SERVER_URL = `http://localhost:${PORT}`;

// Construct the API server URL using the server URL
export const API_SERVER_URL = `${SERVER_URL}/api`;
