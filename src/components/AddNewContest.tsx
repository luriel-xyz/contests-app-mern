/**
 * AddNewContest Component
 *
 * This component represents the form to add a new contest.
 * It handles the form submission, calls the API to add the contest,
 * and notifies the parent component of the successful addition.
 */

import React, { useState } from "react";
import { addNewContest } from "../api-client";
import ContestForm from "./ContestForm";
import { ContestType } from "./Contest";

interface IAddNewContest {
  onSuccess: Function;
}

/**
 * AddNewContest Component
 *
 * @param {Object} onSuccess - The function to call when a new contest is successfully added.
 * @returns {JSX.Element} - The rendered component.
 */
const AddNewContest: React.FC<IAddNewContest> = ({
  onSuccess,
}: IAddNewContest) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickAddContest = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newContestData = {
      contestName: form.contestName.value,
      categoryName: form.categoryName.value,
      description: form.description.value,
    };

    try {
      setLoading(true);
      const newContest: ContestType = await addNewContest(newContestData);
      form.reset();
      onSuccess(newContest);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="title">{"Loading..."}</div>
  ) : (
    <div className="add-new-contest">
      {!showForm && (
        <div className="link" onClick={handleClickAddContest}>
          {"Add New Contest"}
        </div>
      )}

      {showForm && <ContestForm onSubmit={handleSubmit} />}
    </div>
  );
};

export default AddNewContest;
