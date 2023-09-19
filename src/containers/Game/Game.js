import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./game_style.css";
import ScoreSystem from "./GameComponents/ScoreSystem";
import UserName from "./GameComponents/UserName";

const Game = ({ theme }) => {
  const [inputValue, setInputValue] = useState("");
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(20); //Spill tid.
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [playerName, setPlayerName] = useState(null);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userRank, setUserRank] = useState(null);

  const fetchRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  }, [wordList]);

  const updateHighScores = (newScore) => {
    let currentScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const existingPlayerIndex = currentScores.findIndex(
      (score) => score.name === newScore.name
    );
    if (
      existingPlayerIndex !== -1 &&
      currentScores[existingPlayerIndex].score < newScore.score
    ) {
      currentScores.splice(existingPlayerIndex, 1);
    }
    currentScores.push(newScore);
    const updatedScores = currentScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem("highScores", JSON.stringify(updatedScores));
    const rank =
      updatedScores.findIndex(
        (score) =>
          score.name === newScore.name && score.score === newScore.score
      ) + 1;
    if (rank === 0) {
      setUserRank("utenfor topp 10");
    } else {
      setUserRank(rank);
    }
  };

  const handleKeyDown = (e) => {
    console.log("Space pressed. Input:", inputValue);
    if (e.key === " ") {
      if (inputValue.trim() === currentWord) {
        setConsecutiveCorrect((prev) => prev + 1);
      } else {
        setConsecutiveCorrect(0);
      }

      // Forsink tømmingen av inputValue for å la ScoreSystem behandle den nåværende verdien.
      setTimeout(() => {
        fetchRandomWord();
        setInputValue("");
      }, 50);
    }
  };

  const displayRankMessage = (rank) => {
    if (rank === 1) {
      return "Gratulerer! Du er på 1. plass!";
    } else if (rank === 2) {
      return "Fantastisk! Du er på 2. plass!";
    } else if (rank === 3) {
      return "Bra jobbet! Du er på 3. plass!";
    } else {
      return `Du er på ${rank}. plass!`;
    }
  };

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
      } catch (error) {
        console.error("Error fetching the word list:", error);
      }
    }
    fetchData();
  }, [theme]);

  useEffect(() => {
    if (gameStatus === "notStarted" && countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (countdown === 0 && gameStatus === "notStarted") {
      setGameStatus("inProgress");
      fetchRandomWord();

      setTimeout(() => {
        const timerId = setInterval(() => {
          setTimer((prevTime) => {
            if (prevTime <= 1) {
              setGameStatus("gameOver");
              updateHighScores({ name: playerName, score: totalScore });
              clearInterval(timerId);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        return () => clearInterval(timerId);
      }, 500);
    }
  }, [countdown, fetchRandomWord, gameStatus, playerName, totalScore]);

  return (
    <div className="game-box">
      {!playerName ? (
        <UserName setPlayerName={setPlayerName} />
      ) : (
        <Fragment>
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
              <div className="timer">
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
              <div className="highscore-list">
                <h2>Top 10 Highscores</h2>
                {JSON.parse(localStorage.getItem("highScores") || "[]").map(
                  (score, index) => (
                    <div key={index}>
                      {score.name} - {score.score}
                    </div>
                  )
                )}
                <button onClick={() => window.location.reload()}>
                  Spill igjen
                </button>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Game;
