import React, { useState } from "react";
import Timer from "./components/Timer";
import Status from "./components/Status";
import EditableTimer from "./components/EditableTimer";
import "./components/App.scss";

function App() {
  const [sessionTime, setSessionTime] = useState(20 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [currentText, setCurrentText] = useState("Work paused");
  return (
    <>
      <Timer
        sessionTime={sessionTime}
        setSessionTime={setSessionTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        setCurrentText={setCurrentText}
      />
      <Status currentText={currentText} />
      <div className="editable-timers">
        <EditableTimer
          title={"Session length"}
          time={sessionTime}
          setTime={setSessionTime}
        />
        <EditableTimer
          title={"Break length"}
          time={breakTime}
          setTime={setBreakTime}
        />
      </div>
    </>
  );
}

export default App;
