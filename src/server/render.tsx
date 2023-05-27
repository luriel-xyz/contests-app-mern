/**
 * Server Render
 *
 * This module is responsible for rendering the initial markup
 * on the server side using ReactDOMServer. It fetches the
 * required data from the API and passes it as initial props
 * to the React App component.
 */

import ReactDOMServer from "react-dom/server";
import { fetchContest, fetchContests } from "../api-client";
import App from "../components/App";

/**
 * serverRender
 *
 * Renders the initial markup on the server side.
 *
 * @param {Object} req - The request object.
 * @returns {Object} - An object containing the initial markup and initial data.
 */
const serverRender = async (req) => {
  // Extract contestId from request parameters
  const { contestId } = req.params;

  // Fetch initial data based on the presence of contestId
  const initialData = contestId
    ? { contest: await fetchContest(contestId) }
    : { contests: await fetchContests() };

  // Render the initial markup using ReactDOMServer
  const initialMarkup = ReactDOMServer.renderToString(
    <App initialData={initialData} />
  );

  return { initialMarkup, initialData };
};

export default serverRender;
