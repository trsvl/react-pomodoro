import React, { useEffect, useState } from "react";

export default function EditableTimer({ time, setTime, title }) {
  const [visibleTime, setVisibleTime] = useState(time);

  useEffect(() => {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    setVisibleTime(`${minute}:${second.toString().padStart(2, "0")}`);
  });
  const increment = () => {
    if (time != 59940) {
      setTime((time) => time + 60);
    }
  };
  const decrement = () => {
    if (time != 60) {
      setTime((time) => time - 60);
    }
  };
  return (
    <div className="editable-timer">
      <h2>{title}</h2>
      <div className="buttons">
        <button onClick={decrement}>
          <p>-</p>
        </button>
        <span>{visibleTime}</span>
        <button onClick={increment}>
          <p>+</p>
        </button>
      </div>
    </div>
  );
}
