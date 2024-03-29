import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./Game.scss";
import ScoreSystem from "./GameComponents/ScoreSystem";
import Highscore from "../../components/Highscore/Highscore";

import { themes } from "../../themeConfig";

const Game = ({ theme, playerName, onGameEnd, backToMain }) => {
  const themeToClassMap = {
    OktoberFest: "bg-OktoberFest",
    Autum: "bg-Autum",
    Halloween: "bg-Halloween",
    BCAM: "bg-BCAM",
  };

  const selectedThemeClass = themeToClassMap[theme] || "";

  // 1. State-definisjoner
  const [inputValue, setInputValue] = useState("");
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(120);
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const [bufferedWordList, setBufferedWordList] = useState([]);
  const [blinkTimer, setBlinkTimer] = useState(false);
  const [pulseTimer, setPulseTimer] = useState(false);

  const selectedTheme = themes[theme] || {};

  const gameBackgroundStyle = {
    backgroundImage: `url(${selectedTheme.backgroundImage})`,
    color: selectedTheme.textColor,
  };
  // 2. Fetch-relaterte funksjoner
  const fetchRandomWord = useCallback(() => {
    if (bufferedWordList.length === 0) {
      setBufferedWordList([...wordList]);
    }
    const randomIndex = Math.floor(Math.random() * bufferedWordList.length);
    const selectedWord = bufferedWordList[randomIndex];
    setCurrentWord(selectedWord);
    const updatedBuffer = [...bufferedWordList];
    updatedBuffer.splice(randomIndex, 1);
    setBufferedWordList(updatedBuffer);
  }, [wordList, bufferedWordList]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/data/${theme}.json`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setWordList(data.ord);
        setBufferedWordList(data.ord);
      } catch (error) {
        console.error("Error fetching the word list:", error);
      }
    }
    fetchData();
  }, [theme]);

  // 3. Highscore-relaterte funksjoner
  const displayRankMessage = (rank) => {
    const rankMessages = [
      "Gratulerer! Du er på 1. plass!",
      "Fantastisk! Du er på 2. plass!",
      "Bra jobbet! Du er på 3. plass!",
    ];
    if (rank <= 3) {
      return rankMessages[rank - 1];
    } else if (rank) {
      return `Du er på ${rank}. plass!`;
    } else {
      return "Dessverre nådde du ikke opp til topplisten denne gangen.";
    }
  };

  const updateHighScores = (score) => {
    let currentScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const existingPlayerIndex = currentScores.findIndex(
      (scoreEntry) => scoreEntry.name === score.name
    );
    if (
      existingPlayerIndex !== -1 &&
      currentScores[existingPlayerIndex].score < score.score
    ) {
      currentScores.splice(existingPlayerIndex, 1);
    }
    currentScores.push(score);
    const updatedScores = currentScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(updatedScores));
  };

  // 4. Game-logikk funksjoner
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      if (inputValue.trim() === currentWord) {
        setConsecutiveCorrect((prev) => prev + 1);
      } else {
        setConsecutiveCorrect(0);
      }
      setTimeout(() => {
        fetchRandomWord();
        setInputValue("");
      }, 50);
    }
  };

  const restartGame = () => {
    setInputValue("");
    setCurrentWord("");
    setCountdown(3);
    setTimer(120);
    setGameStatus("notStarted");
    setConsecutiveCorrect(0);
    setTotalScore(0);
    setUserRank(null);
    fetchRandomWord();
  };

  const exitGame = () => {
    updateHighScores({ name: playerName, score: totalScore });
    const updatedHighScores =
      JSON.parse(localStorage.getItem("highScores")) || [];
    const playerIndex = updatedHighScores.findIndex(
      (scoreData) =>
        scoreData.name === playerName && scoreData.score === totalScore
    );
    if (playerIndex !== -1) {
      setUserRank(playerIndex + 1);
    } else {
      setUserRank(null);
    }
    setGameStatus("gameOver");
  };

  // 5. useEffect hooks
  useEffect(() => {
    if (gameStatus === "notStarted" && countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0 && gameStatus === "notStarted") {
      setGameStatus("inProgress");
      fetchRandomWord();
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

  useEffect(() => {
    if (timer === 30 || timer === 60 || timer === 90) {
      setBlinkTimer(true);
    } else {
      setBlinkTimer(false);
    }
    if (timer <= 10) {
      setPulseTimer(true);
    } else {
      setPulseTimer(false);
    }
  }, [timer]);

  useEffect(() => {
    if (gameStatus === "gameOver") {
      updateHighScores({ name: playerName, score: totalScore });
      const updatedHighScores =
        JSON.parse(localStorage.getItem("highScores")) || [];
      const playerIndex = updatedHighScores.findIndex(
        (scoreData) =>
          scoreData.name === playerName && scoreData.score === totalScore
      );
      if (playerIndex !== -1) {
        setUserRank(playerIndex + 1);
      } else {
        setUserRank(null);
      }
    }
  }, [gameStatus, playerName, totalScore]);

  return (
    <div
      className={`game-box ${selectedThemeClass}`}
      style={gameBackgroundStyle}
    >
      <div className="top-bar">
        <button
          className="close-button"
          onClick={
            gameStatus === "gameOver"
              ? backToMain
              : () => {
                  if (window.confirm("Er du sikker på at du vil avslutte?")) {
                    exitGame();
                  }
                }
          }
        >
          X
        </button>

        <div className="player-info">
          <div>{playerName}</div>
          <div>{totalScore} poeng</div>
        </div>
      </div>

      {gameStatus === "notStarted" && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      {gameStatus === "inProgress" && (
        <Fragment>
          <div className="word-display">{currentWord}</div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            onKeyDown={handleKeyDown}
            className="word-input"
          />
          <div
            className={`
            timer 
            ${timer <= 30 ? "timer-red" : ""} 
            ${blinkTimer ? "timer-blink" : ""} 
            ${pulseTimer ? "timer-pulse" : ""}
          `}
          >
            Tid igjen: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </div>

          <ScoreSystem
            input={inputValue}
            correctWord={currentWord}
            consecutiveCorrect={consecutiveCorrect}
            totalScore={totalScore}
            setTotalScore={setTotalScore}
          />
        </Fragment>
      )}

      {gameStatus === "gameOver" && (
        <Fragment>
          <div className="game-over-message">Game Over</div>
          <div className="rank-message">{displayRankMessage(userRank)}</div>
          <Highscore
            newScore={{ name: playerName, score: totalScore }}
            playerName={playerName}
            userRank={userRank}
          />
          <div className="highscore-btn-end-game-container">
            <button onClick={restartGame}>Spill igjen med samme tema</button>
            <button onClick={onGameEnd}>Velg nytt tema</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Game;
