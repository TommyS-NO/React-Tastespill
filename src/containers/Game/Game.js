import React, { useState, useEffect, useCallback, Fragment } from "react";
import "./game_style.css";
import HighScoreList from "../../components/Highscore/Highscore";
import UserName from "./GameComponents/UserName";
import Countdown from "./GameComponents/Countdown";
import Timer from "./GameComponents/Timer";
import WordInteraction from "./GameComponents/WordInteraction";

const Game = ({ theme }) => {
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [playerRank, setPlayerRank] = useState(null);
  const [gameStatus, setGameStatus] = useState("notStarted");
  const [wordList, setWordList] = useState([]);

  const fetchWords = useCallback(async () => {
    try {
      const response = await fetch(`/data/${theme}.json`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setWordList(data.ord);
    } catch (error) {
      console.error("Error fetching the word list:", error);
    }
  }, [theme]);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

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

      const playerRanking =
        topScores.findIndex(
          (entry) => entry.name === playerName && entry.score === score
        ) + 1;
      setPlayerRank(playerRanking);
    }
  }, [gameStatus, playerName, score]);

  return (
    <div className="game-container">
      {!playerName ? (
        <UserName onSetName={setPlayerName} />
      ) : (
        <Fragment>
          {gameStatus === "notStarted" && (
            <Countdown gameStatus={gameStatus} onStatusChange={setGameStatus} />
          )}
          {gameStatus === "inProgress" && (
            <Fragment>
              <WordInteraction
                wordList={wordList}
                onScoreChange={setScore}
                onGameOver={() => setGameStatus("gameOver")}
              />
              <Timer onTimeUp={() => setGameStatus("gameOver")} />
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
        </Fragment>
      )}
    </div>
  );
};

export default Game;
