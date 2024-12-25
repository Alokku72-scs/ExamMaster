import React, { useState, useEffect } from "react";

const ExamTimer = ({ timeDuration }) => {
  const [remainingTime, setRemainingTime] = useState(timeDuration * 60); // Assuming timeDuration is in minutes

  useEffect(() => {
    if (!remainingTime) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Clear timer when it reaches 0
          return 0;
        }
        return prev - 1; // Decrease remaining time by 1 second
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [remainingTime]);

  // Format time into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
        {formatTime(remainingTime)}
    </div>
  );
};

export default ExamTimer;
