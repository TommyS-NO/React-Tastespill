import React, { useState, useEffect } from "react";

const Countdown = ({ initialCount, onCountdownComplete }) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }

    if (count === 0) {
      onCountdownComplete();
    }
  }, [count, onCountdownComplete]);

  return <div className="countdown">{count}</div>;
};

export default Countdown;
