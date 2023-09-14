import React, { useState, useEffect, useCallback } from "react";
import "./game_style.css";

const Game = ({ theme }) => {
  const [inputValue, setInputValue] = useState("");
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(120);
  const [gameStatus, setGameStatus] = useState("notStarted");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`./../../data/${theme}.json`);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

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
    if (gameStatus === "notStarted" && countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0 && gameStatus === "notStarted") {
      setGameStatus("inProgress");
      fetchRandomWord();

      // Introduce a delay before starting the game timer
      setTimeout(() => {
        const timerId = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime <= 1) {
              setGameStatus("gameOver");
              clearInterval(timerId);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        return () => clearInterval(timerId);
      }, 500);
    }
  }, [countdown, fetchRandomWord, gameStatus]);

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      fetchRandomWord();
      setInputValue("");
    }
  };

  return (
    <div className="game-box">
      {gameStatus === "notStarted" && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}
      {gameStatus === "inProgress" && (
        <>
          <div className="word-display">{currentWord}</div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            onKeyDown={handleKeyDown}
            className="word-input"
          />
          <div className="timer">
            Tid igjen: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </div>
        </>
      )}
      {gameStatus === "gameOver" && (
        <div className="game-over-message">Game Over</div>
      )}
    </div>
  );
};

export default Game;
