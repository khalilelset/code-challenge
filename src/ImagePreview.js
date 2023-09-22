import React, { useEffect } from "react";
import img from "./image-placeholder.svg"

function ImagePreview({ previewImg,previewImgRef, applyFilter }) {
  

  useEffect(() => {
    if (!previewImgRef.current) {
      console.error("Image element not found.");
      return;
    }

    if (!previewImg) {
      console.error("Preview image is missing.");
      return;
    }
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
