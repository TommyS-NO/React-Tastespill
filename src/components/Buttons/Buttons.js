import React from "react";
import "./buttons_style.css";

function Button({ text, onClick, className, disabled }) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
