/**
 * Contest Component
 *
 * This component represents a contest page. It displays the contest details,
 * including the category, contest name, description, and provides a link
 * to navigate back to the contest list. It fetches the contest data from
 * the server if it is not already available.
 */

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { addNewNameToContest, fetchContest } from "../api-client";

export type ContestType = {
  _id?: string;
  id?: string;
  categoryName: string;
  contestName: string;
  names?: Array<string>;
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
  const newNameInputRef = useRef<string>("");

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
  const handleClickContestList = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClickContestList();
  };

  /**
   * handleNewNameSubmit
   *
   * Handles the submission of the new name form.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleNewNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNameInput = e.currentTarget.newName as HTMLInputElement;

    const updatedContest = await addNewNameToContest(
      contest.id,
      newNameInput.value
    );

    setContest(updatedContest);

    newNameInputRef.current.value = "";
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Header message={contest.contestName} />
        <div className="contest">
          <div className="title">Contest Description</div>
          <div className="description">{contest.description}</div>

          <div className="title">Proposed Names</div>
          <div className="body">
            {contest.names?.length > 0 ? (
              <div className="list">
                {contest.names.map(({ id, name }) => (
                  <div key={id} className="item">
                    {name}
                  </div>
                ))}
              </div>
            ) : (
              <div>No names proposed</div>
            )}
          </div>

          <div className="title">Propose a new name</div>
          <div className="body">
            <form onSubmit={handleNewNameSubmit}>
              <input
                type="text"
                name="newName"
                placeholder="Name"
                ref={newNameInputRef}
              />
              <button type="submit">Submit</button>
            </form>
          </div>

          <a href="/" onClick={handleClickContestList} className="link">
            Contest List
          </a>
        </div>
      </>
    );
  }
};

export default Contest;
