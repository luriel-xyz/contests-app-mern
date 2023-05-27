/**
 * Contest Component
 *
 * This component represents a contest page. It displays the contest details,
 * including the category, contest name, description, and provides a link
 * to navigate back to the contest list. It fetches the contest data from
 * the server if it is not already available.
 */

import React, { useState, useEffect } from "react";
import Header from "./Header";
import { fetchContest } from "../api-client";

type ContestType = {
  id: string;
  categoryName: string;
  contestName: string;
};

/**
 * Contest Component
 *
 * @param {Object} initialContest - The initial contest data.
 * @param {Function} onClickContestList - The function to call when clicking the contest list link.
 * @returns {JSX.Element} - The rendered component.
 */
const Contest: React.FC = ({ initialContest, onClickContestList }) => {
  const [contest, setContest] = useState<ContestType>(initialContest);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!contest.names) {
      setLoading(true);
      fetchContest(contest.id)
        .then(setContest)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [contest.id, contest.names]);

  /**
   * handleClickContestList
   *
   * Handles the click event on the contest list link.
   *
   * @param {Event} e - The click event.
   */
  const handleClickContestList = (e) => {
    e.preventDefault();
    onClickContestList();
  };

  if (loading) {
    return "Loading...";
  } else {
    return (
      <>
        <Header message={contest.contestName} />
        <div className="contest">
          <div className="title">{"Contest Description"}</div>
          <div className="description">{contest.description}</div>
          <a href="/" onClick={handleClickContestList} className="link">
            {"Contest List"}
          </a>
        </div>
      </>
    );
  }
};

export default Contest;
