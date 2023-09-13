import React, { useState, useEffect, useCallback } from "react";
import "./game_style.css";

const Game = ({ theme }) => {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(120); // 2 minutter

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/data/${theme}.json`);

        const data = await response.json();
        setWordList(data.ord);
      } catch (error) {
        console.error("Error fetching the word list:", error);
      }
    }

    fetchData();
  }, [theme]);

  const fetchRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  }, [wordList]);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      fetchRandomWord();
      const timerId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [countdown, fetchRandomWord]);

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      fetchRandomWord();
    }
  };

  return (
    <div className="game-box">
      {countdown > 0 ? (
        <div className="countdown">{countdown}</div>
      ) : (
        <>
          <div className="word-display">{currentWord}</div>
          <input
            type="text"
            autoFocus
            onKeyDown={handleKeyDown}
            className="word-input"
          />
          <div className="timer">
            Tid igjen: {Math.floor(timer / 60)}:{timer % 60}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
