import React, { useEffect } from "react";
import img from "./image-placeholder.svg";

// this component to display default image and when user select image display the new image

function ImagePreview({ previewImg, previewImgRef, applyFilter }) {
  useEffect(() => {
    if (!previewImgRef.current) {
      console.log("Image element not found.");
      return;
    }

    if (!previewImg) {
      alert("Preview image is missing.");
      return;
    }
    //display live change in image when the user change in filter setting
    applyFilter();
  }, [previewImg, applyFilter]);

  return (
    <div className="preview-img">
      {previewImg ? (
        <img
          src={URL.createObjectURL(previewImg)}
          alt="preview"
          ref={previewImgRef}
        />
      ) : (
        <img src={img} alt="preview-img" />
      )}
    </div>
  );
}

export default ImagePreview;
