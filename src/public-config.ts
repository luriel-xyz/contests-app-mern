// Set the PORT variable to the value from the environment variables, or default to 3000
export const PORT = process.env.PORT ?? 3000;

// Set the SERVER_URL variable using the PORT value
export const SERVER_URL = `http://localhost:${PORT}`;

export const API_SERVER_URL = `${SERVER_URL}/api`;
