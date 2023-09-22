import React, { useEffect } from "react";

const ScoreSystem = ({
  input,
  correctWord,
  consecutiveCorrect,
  totalScore,
  setTotalScore,
}) => {
  useEffect(() => {
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
          (char, i) => char !== correctWord[i]
        ).length;
        scoreForCurrentWord = -Math.min(incorrectChars, 5);
      }
      setTotalScore((prev) => Math.max(0, prev + scoreForCurrentWord)); // Total scoren skal ikke kunne bli -
    }
  }, [input, correctWord, consecutiveCorrect, setTotalScore]);

  return null;
};

export default ScoreSystem;
