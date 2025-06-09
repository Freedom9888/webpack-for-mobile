import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'

interface CountdownProps {
  endTime: number; // 未来的某个时间戳
}

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(endTime - Date.now());
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setHasEnded(true);
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = endTime - Date.now();
      if (newTimeLeft <= 0) {
        setTimeLeft(0);
        setHasEnded(true);
        clearInterval(timer);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, endTime]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 60000) % 60;
    const hours = Math.floor(milliseconds / 3600000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {hasEnded ? (
        <button onClick={() => alert('Button clicked!')}>Click Me!</button>
      ) : (
        <div className={styles.countdown}>{formatTime(timeLeft)}</div>
      )}
    </div>
  );
};

export default Countdown;
