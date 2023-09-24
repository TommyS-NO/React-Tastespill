import React, { useState } from "react";
import "./../../../components/Modal/Modal.scss";

const UserName = ({ setPlayerName }) => {
  const [inputValue, setInputValue] = useState("");

  const isValidNameInput = (input) => {
    return /^[a-zA-ZåäöÅÄÖ\s]{3,}$/g.test(input);
  };

  const handleEnter = () => {
    if (!inputValue || !isValidNameInput(inputValue)) {
      alert("Vennligst skriv inn et gyldig navn med minst 3 bokstaver.");
      return;
    }
    setPlayerName(inputValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className="user-name-title">NAVN</div>
      <input
        id="username"
        type="text"
        value={inputValue}
        className="user-input-field"
        onChange={(e) => {
          if (
            e.target.value.length <= 20 &&
            /^[a-zA-ZåäöÅÄÖ\s]*$/g.test(e.target.value)
          ) {
            setInputValue(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEnter();
          }
        }}
        placeholder="Ditt Navn"
        autoFocus
        autoComplete="off"
      />
    </div>
  );
};

export default UserName;
