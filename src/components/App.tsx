/**
 * App Component
 *
 * This component represents the main application component.
 * It manages the state and navigation between the contest list
 * page and the contest page. It receives initial data from the
 * server and renders the appropriate page content based on the
 * current state.
 */

import React, { useState, useEffect } from "react";
import ContestList from "./ContestList";
import Contest from "./Contest";
import AddNewContest from "./AddNewContest";

type Page = "contestList" | "contest";

/**
 * App Component
 *
 * @param {Object} initialData - The initial data received from the server.
 * @returns {JSX.Element} - The rendered component.
 */
const App: React.FC = ({ initialData }) => {
  const contestListPage: Page = "contestList";
  const contestPage: Page = "contest";
  const [page, setPage] = useState<Page>(
    initialData.contest ? contestPage : contestListPage
  );
  const [currentContest, setCurrentContest] = useState<object | undefined>(
    initialData.contest
  );

  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      const newPage: Page = e.state?.contestId ? contestPage : contestListPage;
      setPage(newPage);
      setCurrentContest({ id: e.state?.contestId });
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  /**
   * navigateToContest
   *
   * Navigates to the contest page with the specified contest ID.
   *
   * @param {string} contestId - The ID of the contest to navigate to.
   */
  const navigateToContest = (contestId: string) => {
    window.history.pushState({ contestId }, "", `/contests/${contestId}`);

    setCurrentContest({ id: contestId });
    setPage(contestPage);
  };

  /**
   * navigateToContestsList
   *
   * Navigates to the contest list page.
   */
  const navigateToContestsList = () => {
    window.history.pushState({}, "", "/");
    setCurrentContest(undefined);
    setPage(contestListPage);
  };

  const handleNewContest = (newContest) => {
    window.history.pushState(
      { contestId: newContest.id },
      "",
      `/contest/${newContest.id}`
    );
    setPage(contestPage);
    setCurrentContest(newContest);
    initialData.contests.push(newContest);
  };

  /**
   * renderPageContent
   *
   * Renders the appropriate page content based on the current state.
   *
   * @returns {JSX.Element|undefined} - The rendered page content.
   */
  const renderPageContent = () => {
    switch (page) {
      case contestListPage:
        return (
          <>
            <ContestList
              initialContests={initialData.contests}
              onContestClick={navigateToContest}
            />
            <AddNewContest onSuccess={handleNewContest} />
          </>
        );
      case contestPage:
        return (
          <Contest
            initialContest={currentContest}
            onClickContestList={navigateToContestsList}
          />
        );
    }
  };

  return <div className="container">{renderPageContent()}</div>;
};

export default App;
