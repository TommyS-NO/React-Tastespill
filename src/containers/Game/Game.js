import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./game_style.css";
import HighScoreList from "../../components/Highscore/highscore_comp";

const Game = ({ theme }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasEnteredName, setHasEnteredName] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);

  const [correctWordStreak, setCorrectWordStreak] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(45);
  const [gameStatus, setGameStatus] = useState("notStarted");

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

      // a delay before starting the game timer
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
    if (gameStatus === "gameOver") {
      const storedHighScores =
        JSON.parse(localStorage.getItem("highScores")) || [];

      const existingPlayerIndex = storedHighScores.findIndex(
        (entry) => entry.name === playerName
      );

      if (
        existingPlayerIndex > -1 &&
        storedHighScores[existingPlayerIndex].score < score
      ) {
        storedHighScores[existingPlayerIndex].score = score;
      } else {
        storedHighScores.push({ name: playerName, score: score });
      }

      const topScores = storedHighScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      localStorage.setItem("highScores", JSON.stringify(topScores));
      setHighScores(topScores);

      // Finn spillerens plassering etter at vi har oppdatert scorelisten
      const playerRanking =
        topScores.findIndex(
          (entry) => entry.name === playerName && entry.score === score
        ) + 1;
      setPlayerRank(playerRanking);
    }
  }, [gameStatus, playerName, score]);

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      // Hvis inntastet ord matcher det nåværende ordet
      if (inputValue === currentWord) {
        // RPB: Poeng per riktig bokstav
        setScore((prevScore) => prevScore + inputValue.length);
        // WBP: Poeng for ordavslutning
        setScore((prevScore) => prevScore + 50);
        // Ha-rick poeng (TBP)
        setCorrectWordStreak((prevStreak) => prevStreak + 1);
        if (correctWordStreak === 2) {
          setScore((prevScore) => prevScore + 100);
          setCorrectWordStreak(0);
        }
      } else {
        // TFB: Poengtrekk ved feil bokstav
        const penalty = Math.min(
          5,
          Math.abs(inputValue.length - currentWord.length)
        );
        setScore((prevScore) => prevScore - penalty);
        setCorrectWordStreak(0);
      }
      fetchRandomWord();
      setInputValue("");
    }
  };

  return (
    <div className="game-container">
      {!hasEnteredName ? (
        <div className="name-entry">
          <input
            type="text"
            placeholder="Skriv inn ditt navn"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => setHasEnteredName(true)}>Start Spill</button>
        </div>
      ) : (
        <div className="game-box">
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
            </Fragment>
          )}
          {gameStatus === "gameOver" && (
            <Fragment>
              <div className="game-over-message">Spill Over</div>
              <div className="score-message">Din Poengsum: {score}</div>
              <div className="ranking-message">
                {playerRank <= 3 && playerRank > 0
                  ? "WoHO! Du er blant topp 3!"
                  : playerRank
                  ? `Du fikk ${playerRank}. plass på Highscore listen.`
                  : `Din score nådde dessverre ikke topp 10.`}
              </div>
              <HighScoreList scores={highScores} />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Game;
