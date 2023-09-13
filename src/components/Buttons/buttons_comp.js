import React from "react";
import "./buttons_style.css";

function Buttons({ onStartGame, onShowRules, onShowHighscore }) {
  return (
    <div>
      <button onClick={onStartGame}>Start Spill</button>
      <button onClick={onShowRules}>Regler</button>
      <button onClick={onShowHighscore}>Høy poengsum</button>
    </div>
  );
}
export default Buttons;
