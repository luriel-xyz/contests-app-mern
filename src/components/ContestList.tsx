/**
 * ContestList Component
 *
 * This component represents a list of contests. It fetches the contest data
 * from the server if it is not provided as an initial prop. It renders a
 * header with the message "Naming Contests" and a list of ContestPreview
 * components for each contest in the contests array.
 */

import React, { useState, useEffect } from "react";
import Header from "./Header";
import ContestPreview from "./ContestPreview";
import { fetchContests } from "../api-client";

/**
 * ContestList Component
 *
 * @param {Array} initialContests - The initial contests data.
 * @param {Function} onContestClick - The function to call when a contest is clicked.
 * @returns {JSX.Element} - The rendered component.
 */
const ContestList: React.FC = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(initialContests ?? []);

  useEffect(() => {
    if (!initialContests) {
      fetchContests()
        .then((contests) => setContests(contests))
        .catch(console.error);
    }
  }, [initialContests]);

  return (
    <>
      <Header message="Naming Contests" />

      <div className="contest-list">
        {contests.map((contest) => (
          <ContestPreview
            key={contest.id}
            contest={contest}
            onClick={onContestClick}
          />
        ))}
      </div>
    </>
  );
};

export default ContestList;
