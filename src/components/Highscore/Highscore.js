import React, { useEffect, useState } from "react";
import "./../../containers/Game/game_style.css";

const Highscore = ({ newScore }) => {
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("highScores")) || []
  );

  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
  }, [newScore]);

  return (
    <div>
      <h1>Highscore</h1>
      {Array.from({ length: 10 }).map((_, index) => (
        <p key={index}>
          {index + 1},
          {highScores[index]
            ? `${highScores[index].name}: ${highScores[index].score}`
            : "*****"}
        </p>
      ))}
    </div>
  );
};

export default Highscore;
