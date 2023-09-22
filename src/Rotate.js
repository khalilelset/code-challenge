// Rotate.js
import React from "react";

function Rotate({ handleRotate }) {
  return (
    <div className="rotate">
      <label className="title">Rotate & Flip</label>
      <div className="options">
        <button id="left" onClick={() => handleRotate("left")}>
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button id="right" onClick={() => handleRotate("right")}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button id="horizontal" onClick={() => handleRotate("horizontal")}>
          <i className="bx bx-reflect-vertical"></i>
        </button>
        <button id="vertical" onClick={() => handleRotate("vertical")}>
          <i className="bx bx-reflect-horizontal"></i>
        </button>
      </div>
    </div>
  );
}

export default Rotate;
