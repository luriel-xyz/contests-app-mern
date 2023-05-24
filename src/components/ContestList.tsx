import React, { useState, useEffect } from "react";
import ContestPreview from "./ContestPreview";
import { fetchContests } from "../api-client";

const ContestList: React.FC = ({ initialContests }) => {
  const [contests, setContests] = useState(initialContests);

  // useEffect(() => {
  //   fetchContests().then((contests) => setContests(contests));
  // }, []);

  return (
    <div className="contest-list">
      {contests.map((contest) => (
        <ContestPreview key={contest.id} contest={contest} />
      ))}
    </div>
  );
};

export default ContestList;
