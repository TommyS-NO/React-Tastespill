import React, { useState } from "react";

const UserName = ({ setPlayerName }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Skriv inn ditt navn"
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            setPlayerName(inputValue);
          }
        }}
      >
        Start spill
      </button>
    </div>
  );
};

export default UserName;
