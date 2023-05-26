import React, { useState, useEffect } from "react";
import Header from "./Header";
import ContestPreview from "./ContestPreview";
import { fetchContests } from "../api-client";

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
