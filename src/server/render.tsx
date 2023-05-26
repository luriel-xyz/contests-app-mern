import ReactDOMServer from "react-dom/server";
import { fetchContest, fetchContests } from "../api-client";
import App from "../components/App";

/**
 * Asynchronous function for server-side rendering.
 * Fetches contest data from the API and renders the App component with the initial data.
 * @returns {string} The initial markup of the application.
 */
const serverRender = async (req) => {
  const { contestId } = req.params;

  // Fetch contests data from the API
  const initialData = contestId
    ? { contest: await fetchContest(contestId) }
    : { contests: await fetchContests() };

  // Render the App component with initial data
  const initialMarkup = ReactDOMServer.renderToString(
    <App initialData={initialData} />
  );

  // Return the initial markup and data to be used by the server
  return { initialMarkup, initialData };
};

export default serverRender;
