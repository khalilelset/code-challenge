// Controls.js
import React from "react";

function Controls({ resetFilter, fileInputRef, loadImage, saveImage }) {
  return (
    <div className="controls">
      <button className="reset-filter" onClick={resetFilter}>
        Reset Filters
      </button>
      <div className="row">
        <input
          type="file"
          className="file-input"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={loadImage}
        />
        <button
          className="choose-img"
          onClick={() => fileInputRef.current.click()}
        >
          Choose Image
        </button>
        <button onClick={saveImage} className="save-img">
          Save Image
        </button>
      </div>
    </div>
  );
}

export default Controls;
