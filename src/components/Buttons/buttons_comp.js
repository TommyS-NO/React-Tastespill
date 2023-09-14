import React from "react";
import "./buttons_style.css";

function Buttons({ onStartGame, onShowRules, onShowHighscore }) {
  return (
    <div>
      <button onClick={onStartGame}>Start Spill</button>
      <button onClick={onShowRules}>Regler</button>
      <button onClick={onShowHighscore}>High score</button>
    </div>
  );
}
export default Buttons;
