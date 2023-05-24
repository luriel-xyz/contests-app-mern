import React from "react";
import ContestList from "./ContestList";
import Header from "./Header";

const App: React.FC = ({ initialData }) => (
  <div className="container">
    <Header message="Naming Contests" />
    <ContestList initialContests={initialData} />
  </div>
);

export default App;
