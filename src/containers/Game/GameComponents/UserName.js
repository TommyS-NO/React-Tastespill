import React from "react";

const UserNameInput = ({ playerName, setPlayerName, setHasEnteredName }) => {
  return (
    <div className="userName-input">
      <input
        type="text"
        placeholder="Skriv inn ditt navn"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={() => setHasEnteredName(true)}>Start Spill</button>
    </div>
  );
};

export default UserNameInput;
