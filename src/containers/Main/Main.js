import React, { useState, useRef } from "react";
import Buttons from "../../components/Buttons/Buttons";
import Modal from "../../components/Modal/Modal";
import Instructions from "./../Instructions/Instructions";
import Game from "../Game/Game";
import Highscore from "../../components/Highscore/Highscore";
import UserName from "./../Game/GameComponents/UserName";
import "./Main.scss";

const Main = () => {
  const [modalState, setModalState] = useState(null);
  const [theme, setTheme] = useState("");
  const [playerName, setPlayerName] = useState("");
  const nameInputRef = useRef(null);

  const startGameWithTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalState("game");
  };

  const finishGame = () => {
    setModalState("themeSelection");
  };

  const handleNameEntry = (event) => {
    if (event.key === "Enter") {
      setPlayerName(nameInputRef.current.value);
      setModalState("themeSelection");
    }
  };

  const closeModal = () => {
    setModalState(null);
  };

  return (
    <main className="main-content bg-main">
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

      <Modal isOpen={modalState !== null} onClose={closeModal}>
        {modalState === "enterName" && (
          <UserName
            innerRef={nameInputRef}
            setPlayerName={(name) => {
              setPlayerName(name);
              setModalState("themeSelection");
            }}
            onKeyDown={handleNameEntry}
          />
        )}
        {modalState === "themeSelection" && (
          <div>
            <h2>Velg et tema</h2>
            <button
              onClick={() => startGameWithTheme("OktoberFest")}
              className="btn theme-button"
            >
              OktoberFest
            </button>
            <button
              onClick={() =>
                startGameWithTheme("Breast_Cancer_Awareness_Month")
              }
              className="btn theme-button"
            >
              BreastCancer Awareness
            </button>
            <button
              onClick={() => startGameWithTheme("Høst")}
              className="btn theme-button"
            >
              Høst
            </button>
            <button
              onClick={() => startGameWithTheme("Halloween")}
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
            onGameEnd={finishGame}
            backToMain={closeModal}
          />
        )}
        {modalState === "instructions" && <Instructions />}
        {modalState === "highscore" && <Highscore />}
      </Modal>
    </main>
  );
};

export default Main;
