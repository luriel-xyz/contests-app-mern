import React from "react";

const ContestPreview: React.FC = ({ contest }) => (
  <div className="contest-preview">
    <div className="category">{contest.categoryName}</div>
    <div className="contest">{contest.contestName}</div>
  </div>
);

export default ContestPreview;
