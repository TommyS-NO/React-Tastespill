import React, { Fragment } from "react";

const WordInteraction = ({
  currentWord,
  inputValue,
  handleInputChange,
  handleKeyDown,
}) => {
  return (
    <Fragment>
      <div className="word-display">{currentWord}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className="word-input"
      />
    </Fragment>
  );
};

export default WordInteraction;
