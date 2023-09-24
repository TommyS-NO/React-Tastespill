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
  const [globalTheme, setGlobalTheme] = useState("default");

  const nameInputRef = useRef(null);

  const themeToClassMap = {
    OktoberFest: "bg-OktoberFest",
    Breast_Cancer_Awareness_Month: "bg-BCAM",
    Høst: "bg-Autum",
    Halloween: "bg-Halloween",
  };
  const startGameWithTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setGlobalTheme(themeToClassMap[selectedTheme]);
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
    <main className={`main-content ${globalTheme}`}>
      <h2>Velkommen til TypeMester</h2>
      <p>
        Er du klar til å utfordre skriveferdighetene dine og bli en ekte
        tastaturekspert? TypeMester gir deg muligheten til å fordybe deg i en
        verden av ordutfordringer, hvor hvert riktig tastetrykk bringer deg
        nærmere toppscoren. Dette er ikke bare en morsom og engasjerende måte å
        forbedre skrivehastigheten og presisjonen din på, men også en test av
        din evne til å fokusere under press. Begynn din reise med TypeMester nå
        og se dine skriveferdigheter blomstre!
      </p>

      <Buttons
        onStartGame={() => setModalState("enterName")}
        onShowRules={() => setModalState("instructions")}
        onShowHighscore={() => setModalState("highscore")}
      />

      <Modal
        isOpen={modalState !== null}
        onClose={closeModal}
        canClose={modalState !== "game"}
      >
        <div
          className={`modal ${modalState === "game" ? "full-screen" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <h2>Velg et tema</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
        </div>
      </Modal>
    </main>
  );
};

export default Main;
