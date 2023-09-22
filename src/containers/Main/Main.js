import React, { useState, useRef } from "react";
import Buttons from "../../components/Buttons/Buttons";
import Modal from "../../components/Modal/Modal";
import Instructions from "../Instructions/instructions_comp";
import Game from "../Game/Game";
import Highscore from "../../components/Highscore/Highscore";
import UserName from "./../Game/GameComponents/UserName";
import "./main_style.css";

const Main = () => {
  const [modalState, setModalState] = useState(null);
  const [theme, setTheme] = useState("");
  const [playerName, setPlayerName] = useState("");
  const nameInputRef = useRef(null);

  const handleSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalState("game");
  };

  const handleEndGame = () => {
    setModalState("themeSelection");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setPlayerName(nameInputRef.current.value);
      setModalState("themeSelection");
    }
  };

  return (
    <main className="main-content">
      <h2>Velkommen til Høstens Tidsfordriv</h2>
      <p>
        Her kan du forbedre tastaturferdighetene dine samtidig som du lærer om
        ulike temaer.
      </p>

      <Buttons
        onStartGame={() => setModalState("enterName")}
        onShowRules={() => setModalState("instructions")}
        onShowHighscore={() => setModalState("highscore")}
      />

      <Modal isOpen={modalState !== null} onClose={() => setModalState(null)}>
        {modalState === "enterName" && (
          <UserName
            innerRef={nameInputRef}
            setPlayerName={(name) => {
              setPlayerName(name);
              setModalState("themeSelection");
            }}
            onKeyDown={handleKeyDown}
          />
        )}

        {modalState === "themeSelection" && (
          <div>
            <h2>Velg et tema</h2>
            <button
              onClick={() => handleSelectTheme("OktoberFest")}
              className="btn theme-button"
            >
              OktoberFest
            </button>
            <button
              onClick={() => handleSelectTheme("Breast_Cancer_Awareness_Month")}
              className="btn theme-button"
            >
              BreastCancer Awareness
            </button>
            <button
              onClick={() => handleSelectTheme("Høst")}
              className="btn theme-button"
            >
              Høst
            </button>
            <button
              onClick={() => handleSelectTheme("Halloween")}
              className="btn theme-button"
            >
              Halloween
            </button>
          </div>
        )}

        {modalState === "game" && (
          <Game
            theme={theme}
            playerName={playerName}
            onGameEnd={handleEndGame}
          />
        )}
        {modalState === "instructions" && <Instructions />}
        {modalState === "highscore" && <Highscore />}
      </Modal>
    </main>
  );
};

export default Main;
