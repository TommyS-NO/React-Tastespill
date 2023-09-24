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
    return (
      <table className="highscore-table">
        <thead>
          <tr>
            <th>#</th>
            <th>NAVN</th>
            <th>POENG</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => {
            const { name = "*****", score = "*****" } = highScores[index] || {};
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{score !== "*****" ? `${score} Poeng` : "*****"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="high-h1">Highscore</h1>
      {renderHighScoreList()}
    </div>
  );
};

export default Highscore;
