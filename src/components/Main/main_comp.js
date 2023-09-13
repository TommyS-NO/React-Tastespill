import React, { useState } from "react";
import Buttons from "../Buttons/buttons_comp";
import Modal from "../Modal/modal_comp";
import Instructions from "../instructions_comp";
import Game from "../Game/game_comp";
import "./main_style.css";

const Main = () => {
  const [username, setUsername] = useState("");
  const [modalState, setModalState] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState("");

  const handleConfirmUsername = () => {
    if (!username.trim()) {
      setErrorMessage("Vennligst oppgi et brukernavn for å fortsette.");
      return;
    }
    setErrorMessage("");
    setModalState("themeSelection");
  };

  const handleSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalState("game");
  };

  return (
    <main className="main-content">
      <h2>Velkommen til Høstens Tidsfordriv</h2>
      <p>
        Her kan du forbedre tastaturferdighetene dine samtidig som du lærer om
        ulike temaer.
      </p>

      <Buttons
        onStartGame={() => setModalState("username")}
        onShowRules={() => setModalState("instructions")}
        onShowHighscore={() => setModalState("highscore")}
      />

      <Modal isOpen={modalState !== null} onClose={() => setModalState(null)}>
        {modalState === "username" && (
          <>
            <h2>Opprett brukernavn</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input
              type="text"
              placeholder="Skriv ditt brukernavn her"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleConfirmUsername}>Bekreft</button>
          </>
        )}

        {modalState === "instructions" && <Instructions />}

        {modalState === "themeSelection" && (
          <>
            <h2>Velg et tema</h2>
            <button onClick={() => handleSelectTheme("OktoberFest")}>
              Tema 1: OktoberFest
            </button>
            <button
              onClick={() => handleSelectTheme("Breast Cancer Awareness Month")}
            >
              Tema 2: Breast Cancer Awareness Month
            </button>
            <button onClick={() => handleSelectTheme("Høst")}>
              Tema 3: Høst
            </button>
            <button onClick={() => handleSelectTheme("Halloween")}>
              Tema 4: Halloween
            </button>
          </>
        )}

        {modalState === "game" && <Game theme={theme} />}
      </Modal>
    </main>
  );
};

export default Main;
