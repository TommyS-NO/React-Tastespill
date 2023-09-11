import React, { useState } from "react";
import Buttons from "../Buttons/buttons_comp";
import Modal from "../Modal/modal_comp";
import Instructions from "../instructions_comp";
import "./main_style.css";

const Main = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const [showHighscoreModal, setShowHighscoreModal] = useState(false);

  const handleShowInstructions = () => {
    setShowInstructionsModal(true);
  };

  const handleShowHighscore = () => {
    setShowHighscoreModal(true);
  };

  const handleSelectTheme = () => {};

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

      <Modal isOpen={showInstructionsModal} onClose={handleCloseModal}>
        <Instructions />
      </Modal>
    </main>
  );
};

export default Main;
