import React from "react";
import "./buttons_style.css";

const Buttons = ({ onShowRules, onShowHighscore, onSelectTheme }) => {
  return (
    <div className="buttons-container">
      <button className="btn main-button" onClick={onSelectTheme}>
        Velg Tema
      </button>
      <div className="secondary-button">
        <button className="btn" onClick={onShowRules}>
          Vis Instruksjoner
        </button>
        <button className="btn" onClick={onShowHighscore}>
          Highscore
        </button>
      </div>
    </div>
  );
};

export default Buttons;
