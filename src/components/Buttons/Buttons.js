import React from "react";
import "./buttons_style.css";

function Buttons({ onStartGame, onShowRules, onShowHighscore }) {
  return (
    <div className="buttons-container">
      <button onClick={onStartGame} className="btn main-btn">
        Start Spill
      </button>
      <button onClick={onShowRules} className="btn second-btn">
        Instruksjoner
      </button>
      <button onClick={onShowHighscore} className="btn third-btn">
        HighScore
      </button>
    </div>
  );
}

export default Buttons;
