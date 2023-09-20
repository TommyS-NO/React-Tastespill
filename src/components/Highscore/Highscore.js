import React, { useEffect, useState } from "react";

const Highscore = ({ newScore, playerName, userRank }) => {
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("highScores")) || []
  );

  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
  }, [newScore]);

  return (
    <div>
      <h1>Highscore</h1>
      {userRank && <p>Din plassering: {userRank}</p>}
      {highScores.length === 0 ? (
        <p>No highscore recorded yet...</p>
      ) : (
        highScores.map((scoreData, index) => (
          <p key={index}>
            {scoreData.name}: {scoreData.score}
          </p>
        ))
      )}
    </div>
  );
};

export default Highscore;
