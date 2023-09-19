import { Fragment } from "react";
import React from "react";

const Highscore = ({ setStageModeToHomeScreen }) => {
  const highScoreListData =
    JSON.parse(localStorage.getItem("highScores")) || [];

  return (
    <div>
      <h1>Highscore</h1>
      {highScoreListData.length === 0 ? (
        <p>No highscore recorded yet...</p>
      ) : (
        <Fragment>
          {highScoreListData.slice(0, 10).map((scoreData, index) => (
            <p key={index}>
              {scoreData.name} - {scoreData.score}
            </p>
          ))}
        </Fragment>
      )}
      <button onClick={() => setStageModeToHomeScreen()}>Home</button>
    </div>
  );
};

export default Highscore;
