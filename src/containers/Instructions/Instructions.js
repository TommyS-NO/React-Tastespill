import React from "react";
import instructionsData from "./instructions.json";
import "./Instructions.scss";

const Instructions = () => {
  const { howToPlay, rules } = instructionsData;

  return (
    <div className="instructions-container">
      <h2>Hvordan spille</h2>
      <ul className="instructions-list">
        {howToPlay.map((instruction, i) => (
          <li key={i}>{instruction}</li>
        ))}
      </ul>

      <h2>Regler</h2>
      <ul className="rules-list">
        {rules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions;
