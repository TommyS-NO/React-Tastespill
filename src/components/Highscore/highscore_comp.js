import React from "react";

const HighScoreList = () => {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  return (
    <div>
      <h2>High Scores</h2>
      <ul>
        {highScores.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HighScoreList;
