import React from "react";
import instructionsData from "./../data/instructions.json";

const Instructions = () => {
  return (
    <div>
      <h2>Hvordan spille</h2>
      <ul>
        {instructionsData.howToPlay.map((instruction, i) => (
          <li key={i}>{instruction}</li>
        ))}
      </ul>

      <h2>Regler</h2>
      <ul>
        {instructionsData.rules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Instructions;
