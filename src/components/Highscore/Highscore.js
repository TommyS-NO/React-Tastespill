import React, { useEffect, useState } from "react";

const Highscore = ({ newScore }) => {
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("highScores")) || []
  );

  useEffect(() => {
    if (newScore && newScore.score >= 0) {
      let currentScores = JSON.parse(localStorage.getItem("highScores")) || [];

      const existingPlayerIndex = currentScores.findIndex(
        (score) => score.name === newScore.name
      );

      // Erstatter spillerens score hvis den nye scoren er høyere
      if (
        existingPlayerIndex !== -1 &&
        currentScores[existingPlayerIndex].score < newScore.score
      ) {
        currentScores.splice(existingPlayerIndex, 1);
      }

      currentScores.push(newScore);
      const updatedScores = currentScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setHighScores(updatedScores);
      localStorage.setItem("highScores", JSON.stringify(updatedScores));
    }
  }, [newScore]);

  return (
    <div>
      <h1>Highscore</h1>
      {highScores.length === 0 ? (
        <p>No highscore recorded yet...</p>
      ) : (
        highScores.map((scoreData, index) => (
          <p key={index}>
            {scoreData.name} - {scoreData.score}
          </p>
        ))
      )}
    </div>
  );
};

export default Highscore;
