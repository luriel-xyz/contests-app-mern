/**
 * ContestList Component
 *
 * This component represents a list of contests.
 * It fetches the contests data from the server if it is not already available.
 * It renders a header with a message and a list of contest previews.
 */

import React, { useState, useEffect } from "react";
import Header from "./Header";
import ContestPreview from "./ContestPreview";
import { fetchContests } from "../api-client";
import { ContestType } from "./Contest";

interface IContestList {
  initialContests: Array<ContestType>;
  onContestClick: Function;
}

/**
 * ContestList Component
 *
 * @param {Object} initialContests - The initial contests data.
 * @param {Function} onContestClick - The function to call when clicking on a contest.
 * @returns {JSX.Element} - The rendered component.
 */
const ContestList: React.FC = ({
  initialContests,
  onContestClick,
}: IContestList) => {
  const [contests, setContests] = useState<Array<ContestType>>(
    initialContests ?? []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initialContests) {
      setLoading(true);
      fetchContests()
        .then(setContests)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [initialContests]);

  return (
    <>
      <Header message="Naming Contests" />

      {loading ? (
        <div className="title">{"Loading..."}</div>
      ) : (
        <div className="contest-list">
          {contests.map((contest) => (
            <ContestPreview
              key={contest.id}
              contest={contest}
              onClick={onContestClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ContestList;
