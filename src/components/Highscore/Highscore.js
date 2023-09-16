import React from "react";

const HighScoreList = ({ scores }) => {
  return (
    <div className="highscore-container">
      <h2>High Scores</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighScoreList;
