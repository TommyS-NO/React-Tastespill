import React from "react";
import instructionsData from "./instructions.json";
import "./Instructions.scss";

const Instructions = () => {
  const { howToPlay, scoring } = instructionsData;

  return (
    <div className="instructions-container">
      <h2>Hvordan spille</h2>
      <div className="instructions-list">
        {howToPlay.map((instruction, i) => (
          <p key={i}>{instruction}</p>
        ))}
      </div>

      <h2>Poenginfo</h2>
      <div className="scoring-list">
        {scoring.map((scoreInfo, i) => (
          <p key={i}>{scoreInfo}</p>
        ))}
      </div>
    </div>
  );
};

export default Instructions;
