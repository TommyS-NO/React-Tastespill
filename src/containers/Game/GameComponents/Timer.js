import React from "react";

const Timer = ({ timeLeft }) => {
  return (
    <div className="timer">
      Tid igjen: {Math.floor(timeLeft / 60)}:
      {String(timeLeft % 60).padStart(2, "0")}
    </div>
  );
};

export default Timer;
