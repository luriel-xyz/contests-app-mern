/*
 * App Component
 * Handles navigation between "contestList" and "contest" pages
 */

import React, { useState, useEffect } from "react";
import ContestList from "./ContestList";
import Contest from "./Contest";

type Page = "contestList" | "contest";

const App: React.FC = ({ initialData }) => {
  // Define page state variables
  const contestListPage: Page = "contestList";
  const contestPage: Page = "contest";
  const [page, setPage] = useState<Page>(
    initialData.contest ? contestPage : contestListPage
  );
  const [currentContest, setCurrentContest] = useState<object | undefined>(
    initialData.contest
  );

  // Set up event listener for popstate
  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      // Determine the new page based on the state object of the popstate event
      const newPage: Page = e.state?.contestId ? contestPage : contestListPage;
      setPage(newPage);
      setCurrentContest({ id: e.state?.contestId });
    };

    window.addEventListener("popstate", handlePopstate);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  // Handle navigation to a contest
  const navigateToContest = (contestId: string) => {
    window.history.pushState({ contestId }, "", `/contests/${contestId}`);

    setCurrentContest({ id: contestId });
    setPage(contestPage);
  };

  const navigateToContestsList = () => {
    window.history.pushState({}, "", "/");
    setCurrentContest(undefined);
    setPage(contestListPage);
  };

  // Render page content based on the current page state
  const renderPageContent = () => {
    if (page === contestListPage) {
      return (
        <ContestList
          initialContests={initialData.contests}
          onContestClick={navigateToContest}
        />
      );
    } else if (page === contestPage) {
      return (
        <Contest
          initialContest={currentContest}
          onClickContestList={navigateToContestsList}
        />
      );
    }

    return null;
  };

  return <div className="container">{renderPageContent()}</div>;
};

export default App;
