import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import Sound from "../assets/sound.mp3";
import PauseSVG from "../assets/PauseSVG";
import PlaySVG from "../assets/PlaySVG";
import "./Timer.scss";
export default function Timer({ sessionTime, setSessionTime, breakTime,  setBreakTime, setCurrentText }) {
  const [playSound] = useSound(Sound);
  const red = "#c31432";
  const green = "#33b249";
  const [timerTime, setTimerTime] = useState(sessionTime);
  const [visibleTime, setVisibleTime] = useState(0);
  const [stateBtn, setStateBtn] = useState(false);
  const [toggleSession, setToggleSession] = useState(false);
  const [numberDegree, setNumberDegree] = useState(sessionTime);
  const [color, setColor] = useState(red);
  const [styleCicrle, setStyleCircle] = useState({
    background: `conic-gradient(#c31432 360deg, rgba(0, 0, 0, 0) 0deg)`,
  });

  const toggleBtn = () => {
    setStateBtn(!stateBtn);
    if (stateBtn) {
      if (color === red) {
        setCurrentText("Work paused");
      } else {
        setCurrentText("Break paused");
      }
    } else {
      if (color === red) {
        setCurrentText("Time to work!");
      } else {
        setCurrentText("Break time!");
      }
    }
  };
  useEffect(() => {
    const sessionValue = localStorage.getItem('session-time');
    setSessionTime(JSON.parse(sessionValue));
    const breakValue = localStorage.getItem('break-time');
    setBreakTime(JSON.parse(breakValue));
  }, [])

  useEffect(() => {
    localStorage.setItem('session-time', JSON.stringify(sessionTime));
    if (color === red) {
      setTimerTime(sessionTime);
      setNumberDegree(sessionTime);
     
    }
  }, [sessionTime]);
  useEffect(() => {
    localStorage.setItem('break-time', JSON.stringify(breakTime));
    if (color === green) {
      setTimerTime(breakTime);
      setNumberDegree(breakTime);
    }
  }, [breakTime]);
  useEffect(() => {
    let test;
    let degree = (360 / numberDegree) * timerTime;
    let minute = Math.floor(timerTime / 60);
    let second = timerTime % 60;
    setStyleCircle({
      background: `conic-gradient(${color} ${degree}deg, rgba(0, 0, 0, 0) 0deg)`,
    });
    setVisibleTime(`${minute}:${second.toString().padStart(2, "0")}`);
    if (stateBtn) {
      test = setInterval(() => {
        setTimerTime((sessionTime) => sessionTime - 1);
      }, 1000);
      if (timerTime === 0) {
        playSound();
        clearInterval(test);
        setColor(green);
        setCurrentText("Break time!");
        setNumberDegree(breakTime);
        setTimerTime(breakTime);
        setToggleSession((toggleSession) => !toggleSession);
        if (toggleSession) {
          setCurrentText("Time to work!");
          setColor(red);
          setNumberDegree(sessionTime);
          setTimerTime(sessionTime);
        }
      }
    }
    return () => {
      clearInterval(test);
    };
  }, [stateBtn, timerTime]);
  return (
    <div className="timer">
      <div className="timer__outer">
        <div className="timer__circle" style={styleCicrle}>
          <div className="timer__inner">
            <div className="timer__number">
              <span>{visibleTime}</span>
              <button onClick={toggleBtn}>
                {stateBtn ? <PauseSVG /> : <PlaySVG />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
