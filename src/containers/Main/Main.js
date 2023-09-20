import React, { useState } from "react";
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

  const handleSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalState("game");
  };
  const handleEndGame = () => {
    setModalState("themeSelection");
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
            setPlayerName={(name) => {
              console.log("name in Main", name);
              setPlayerName(name);
              setModalState("themeSelection");
            }}
          />
        )}

        {modalState === "themeSelection" && (
          <div>
            <h2>Velg et tema</h2>
            <button onClick={() => handleSelectTheme("OktoberFest")}>
              Tema 1: OktoberFest
            </button>
            <button
              onClick={() => handleSelectTheme("Breast_Cancer_Awareness_Month")}
            >
              Tema 2: Breast Cancer Awareness Month
            </button>
            <button onClick={() => handleSelectTheme("Høst")}>
              Tema 3: Høst
            </button>
            <button onClick={() => handleSelectTheme("Halloween")}>
              Tema 4: Halloween
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
