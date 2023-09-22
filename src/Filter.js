import React from "react";

function Filter({
  filterOptions,
  activeFilter,
  handleFilterClick,
  sliderValue,
  handleSliderChange,
  setcrop,
  UpdatedImage,
}) {
  return (
    <div className="filter">
      <label className="title">Filters</label>
      <div className="options">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            id={option.id}
            className={activeFilter === option.id ? "active" : ""}
            onClick={() => handleFilterClick(option)}
          >
            {option.name}
          </button>
        ))}
        <button
          style={{ border: "2px solid #0e94b9" }}
          key="crop"
          id="crop"
          onClick={() => {
            UpdatedImage();
            setTimeout(() => {
              setcrop(true);
            }, 10);
          }}
        >
          Crop <i className="fas fa-scissors" style={{ color: "#0e94b9" }}></i>
        </button>
      </div>
      <div className="slider">
        <div className="filter-info">
          <p className="name">{activeFilter}</p>
          <p className="value">{`${sliderValue}%`}</p>
        </div>
        <input
          type="range"
          min="0"
          max={
            activeFilter === "brightness" || activeFilter === "saturation"
              ? "200"
              : "100"
          }
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default Filter;
