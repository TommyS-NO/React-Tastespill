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
      // strip the space
      const wordInput = input.trim();

      let scoreForCurrentWord = 0;

      // Basic scoring system
      if (wordInput === correctWord) {
        scoreForCurrentWord = correctWord.length * 2; // 2 points for each correct character
        if (consecutiveCorrect >= 2) {
          scoreForCurrentWord += 10; // Bonus 10 points for every third consecutive correct word
        }
      } else {
        const incorrectChars = [...wordInput].filter(
          (char, index) => char !== correctWord[index]
        ).length;

        scoreForCurrentWord = -Math.min(incorrectChars, 5); // Deduct 1 point for each incorrect character, up to a maximum of 5
      }

      setTotalScore((prev) => prev + scoreForCurrentWord);
    }
  }, [input, correctWord, consecutiveCorrect, setTotalScore]);

  return <div>Poeng: {totalScore}</div>;
};

export default ScoreSystem;
