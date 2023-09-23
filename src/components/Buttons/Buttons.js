import React from "react";
import "./Buttons.scss";

const Buttons = ({ onStartGame, onShowRules, onShowHighscore }) => (
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

export default Buttons;
