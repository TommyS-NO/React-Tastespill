import React, { useState } from "react";
import "./../../../components/Modal/modal_style.css";

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
      <label htmlFor="username">Navn</label>
      <input
        id="username"
        type="text"
        value={inputValue}
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
        placeholder="Skriv inn ditt navn"
        autoFocus
        autoComplete="off"
      />
    </div>
  );
};

export default UserName;
