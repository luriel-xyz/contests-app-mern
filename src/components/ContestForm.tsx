import React from "react";

interface IContestForm {
  onSubmit: Function;
}

const ContestForm: React.FC<IContestForm> = ({ onSubmit }: IContestForm) => (
  <form onSubmit={onSubmit}>
    <input type="text" placeholder="Contest Name" name="contestName" />
    <input type="text" placeholder="Contest Category" name="categoryName" />
    <textarea placeholder="Contest Description" name="description" rows={5} />
    <button type="submit">{"Submit"}</button>
  </form>
);

export default ContestForm;
