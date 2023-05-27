/**
 * ContestPreview Component
 *
 * This component represents a preview of a contest. It renders
 * the category and contest name and triggers the specified
 * onClick function when clicked.
 */

import React from "react";

/**
 * ContestPreview Component
 *
 * @param {Object} contest - The contest object to display.
 * @param {Function} onClick - The function to call when the contest preview is clicked.
 * @returns {JSX.Element} - The rendered component.
 */
const ContestPreview: React.FC = ({ contest, onClick }) => {
  /**
   * handleClick
   *
   * Handles the click event on the contest preview.
   */
  const handleClick = () => {
    onClick(contest.id);
  };

  return (
    <div className="contest-preview link" onClick={handleClick}>
      <div className="category">{contest.categoryName}</div>
      <div className="contest">{contest.contestName}</div>
    </div>
  );
};

export default ContestPreview;
