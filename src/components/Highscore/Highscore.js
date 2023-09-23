import React, { useEffect, useState } from "react";
import "./Highscore.scss";

const getHighScoresFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("highScores")) || [];
  } catch (error) {
    console.error("Failed to retrieve high scores from localStorage:", error);
    return [];
  }
};

const Highscore = ({ newScore }) => {
  const [highScores, setHighScores] = useState(getHighScoresFromLocalStorage());

  useEffect(() => {
    setHighScores(getHighScoresFromLocalStorage());
  }, [newScore]);

  const renderHighScoreList = () => {
    return Array.from({ length: 10 }).map((_, index) => {
      const { name = "*****", score = "*****" } = highScores[index] || {};
      return (
        <div className="highscore-entry" key={index}>
          <span className="highscore-rank">{index + 1}</span>
          <span className="highscore-name">{name}</span>
          <span className="highscore-score">
            {score !== "*****" ? `${score} Poeng` : "*****"}
          </span>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Highscore</h1>
      {renderHighScoreList()}
    </div>
  );
};

export default Highscore;
