import React, { useState } from "react";
import Buttons from "../Buttons/buttons_comp";
import "./main_style.css";

const Main = () => {
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showHighscoreModal, setShowHighscoreModal] = useState(false);

  const handleShowRules = () => {
    setShowRulesModal(true);
  };

  const handleShowHighscore = () => {
    setShowHighscoreModal(true);
  };

  const handleSelectTheme = () => {
    // Her kan du legge til logikk for å velge tema og be brukeren om et brukernavn
  };

  const handleCloseModal = () => {
    setShowRulesModal(false);
    setShowHighscoreModal(false);
  };

  return (
    <main className="main-content">
      <h2>Velkommen til Tastespill!</h2>
      <p>
        Her kan du forbedre tastaturferdighetene dine samtidig som du lærer om
        ulike temaer.
      </p>
      <Buttons
        onShowRules={handleShowRules}
        onShowHighscore={handleShowHighscore}
        onSelectTheme={handleSelectTheme}
      />
      {showRulesModal && (
        <>
          <div className="overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            Her kan du legge til reglene for spillet.
          </div>
        </>
      )}
      {showHighscoreModal && (
        <>
          <div className="overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <button className="modal-close" onClick={handleCloseModal}>
              &times;
            </button>
            Her kan du vise highscore-listen.
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
