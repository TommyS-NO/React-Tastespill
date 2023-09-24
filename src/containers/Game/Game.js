import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./Game.scss";
import ScoreSystem from "./GameComponents/ScoreSystem";
import Highscore from "../../components/Highscore/Highscore";

const Game = ({ theme, playerName, onGameEnd, backToMain }) => {
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

  const displayRankMessage = (rank) => {
    const rankMessages = [
      "Gratulerer! Du er på 1. plass!",
      "Fantastisk! Du er på 2. plass!",
      "Bra jobbet! Du er på 3. plass!",
    ];
    return rank <= 3
      ? rankMessages[rank - 1]
      : rank
      ? `Du er på ${rank}. plass!`
      : "Dessverre nådde du ikke opp til topplisten denne gangen.";
  };

  const updateHighScores = (score) => {
    const currentScores = JSON.parse(localStorage.getItem("highScores")) || [];
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
    setUserRank(playerIndex !== -1 ? playerIndex + 1 : null);
    setGameStatus("gameOver");
  };

  useEffect(() => {
    if (gameStatus === "notStarted" && countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0 && gameStatus === "notStarted") {
      setGameStatus("inProgress");
      fetchRandomWord();
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
    }
  }, [countdown, fetchRandomWord, gameStatus]);

  useEffect(() => {
    const shouldBlink = [30, 60, 90].includes(timer);
    setBlinkTimer(shouldBlink);
    setPulseTimer(timer <= 10);
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
      setUserRank(playerIndex !== -1 ? playerIndex + 1 : null);
    }
  }, [gameStatus, playerName, totalScore]);

  return (
    <div className="game-box">
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
          <button onClick={restartGame}>Spill igjen med samme tema</button>
          <button onClick={onGameEnd}>Velg nytt tema</button>
        </Fragment>
      )}
    </div>
  );
};

export default Game;
