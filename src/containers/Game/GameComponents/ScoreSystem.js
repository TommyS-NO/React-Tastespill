import React, { useEffect } from "react";

const ScoreSystem = ({
  input,
  correctWord,
  consecutiveCorrect,
  totalScore,
  setTotalScore,
}) => {
  useEffect(() => {
    console.log("Ends with space?", input.endsWith(" "));
    if (input.endsWith(" ")) {
      const wordInput = input.trim();
      let scoreForCurrentWord = 0;

      if (wordInput === correctWord) {
        scoreForCurrentWord = correctWord.length * 2;
        if (consecutiveCorrect >= 2) {
          scoreForCurrentWord += 10;
        }
      } else {
        const incorrectChars = [...wordInput].filter(
          (char, index) => char !== correctWord[index]
        ).length;
        scoreForCurrentWord = -Math.min(incorrectChars, 5);
      }
      setTotalScore((prev) => Math.max(0, prev + scoreForCurrentWord)); // Ensure total score doesn't go negative
    }
  }, [input, correctWord, consecutiveCorrect, setTotalScore]);

  return <div>Poeng: {totalScore}</div>;
};

export default ScoreSystem;
