import React, { useState } from "react";
import Buttons from "../Buttons/buttons_comp";
import Modal from "../Modal/modal_comp";
import Instructions from "../instructions_comp";
import "./main_style.css";

const Main = () => {
  const [username, setUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showHighscoreModal, setShowHighscoreModal] = useState(false);

  const handleOpenUsernameModal = () => {
    setShowUsernameModal(true);
  };

  const handleShowInstructions = () => {
    setShowInstructionsModal(true);
  };

  const handleShowHighscore = () => {
    setShowHighscoreModal(true);
  };

  const handleSelectTheme = () => {
    if (!username) {
      handleOpenUsernameModal();
      return;
    }
  };

  const handleCloseModal = () => {
    setShowInstructionsModal(false);
    setShowHighscoreModal(false);
  };

  return (
    <main className="main-content">
      <h2>Velkommen til Høstens Tidsfordriv</h2>
      <p>
        Her kan du forbedre tastaturferdighetene dine samtidig som du lærer om
        ulike temaer.
      </p>
      <Buttons
        onShowRules={handleShowInstructions}
        onShowHighscore={handleShowHighscore}
        onSelectTheme={handleSelectTheme}
      />

      <Modal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
      >
        <h2>Opprett brukernavn</h2>
        <input
          type="text"
          placeholder="Skriv ditt brukernavn her"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setShowUsernameModal(false)}>Bekreft</button>
      </Modal>

      <Modal isOpen={showInstructionsModal} onClose={handleCloseModal}>
        <Instructions />
      </Modal>

      {/* modal for Highscore senere */}
      <Modal isOpen={showHighscoreModal} onClose={handleCloseModal}>
        {/* Innhold  Highscore modal */}
      </Modal>
    </main>
  );
};

export default Main;
