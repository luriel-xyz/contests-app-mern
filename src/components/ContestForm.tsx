/**
 * ContestForm Component
 *
 * This component represents a form to create a new contest.
 * It takes an onSubmit function as a prop to handle form submission.
 */

import React from "react";

interface IContestForm {
  onSubmit: Function;
}

/**
 * ContestForm Component
 *
 * @param {Object} onSubmit - The function to call when the form is submitted.
 * @returns {JSX.Element} - The rendered component.
 */
const ContestForm: React.FC<IContestForm> = ({ onSubmit }: IContestForm) => (
  <form onSubmit={onSubmit}>
    <input type="text" placeholder="Contest Name" name="contestName" />
    <input type="text" placeholder="Contest Category" name="categoryName" />
    <textarea placeholder="Contest Description" name="description" rows={5} />
    <button type="submit">{"Submit"}</button>
  </form>
);

export default ContestForm;
