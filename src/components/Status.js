import React from "react";

export default function Status({ currentText }) {
  return (
    <div
      className="CurrentText"
      style={{ display: "flex", alignItems: "center", textAlign: "center" }}
    >
      <h1>{currentText}</h1>
    </div>
  );
}
