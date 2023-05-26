import React, { useState, useEffect } from "react";
import Header from "./Header";
import { fetchContest } from "../api-client";

type ContestType = {
  id: string;
  categoryName: string;
  contestName: string;
};

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
