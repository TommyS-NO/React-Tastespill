import React from "react";
import "./buttons_style.css";

const Buttons = ({ onShowRules, onShowHighscore, onSelectTheme }) => {
  return (
    <div className="buttons-container">
      <button onClick={onShowRules}>Vis Regler</button>
      <button onClick={onShowHighscore}>Highscore</button>
      <button onClick={onSelectTheme}>Velg Tema</button>
    </div>
  );
};

export default Buttons;
