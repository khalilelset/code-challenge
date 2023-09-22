import React, { useState, useRef } from "react";
import "./App.css";
import Filter from "./Filter";
import Rotate from "./Rotate";
import ImagePreview from "./ImagePreview";
import Controls from "./Controls";
import Crop from "./crop/CropEasy";
import Category from "./Category";
const filterOptions = [
  { id: "brightness", name: "Brightness" },
  { id: "saturation", name: "Saturation" },
  { id: "grayscale", name: "Grayscale" },
];

function App() {
  const [crop, setcrop] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [category, setCategory] = useState("");
  const [activeFilter, setActiveFilter] = useState("brightness");
  const [sliderValue, setSliderValue] = useState(100);
  const [editedImage, setEditedImage] = useState(null);
  const [brightness, setBrightness] = useState("100");
  const [saturation, setSaturation] = useState("100");
  const [grayscale, setGrayscale] = useState("0");
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);
  const fileInputRef = useRef(null);
  const previewImgRef = useRef(null);

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImg(file);

    resetFilter();
  };
  const applyFilter = () => {
    previewImgRef.current.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)`;
    previewImgRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      // Convert the edited image to a data URL and set it in the state
      setEditedImage(canvas.toDataURL());
    };
  };

  const resetFilter = () => {
    setBrightness("100");
    setSaturation("100");

    setGrayscale("0");
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setActiveFilter("brightness");
    setSliderValue(100);
  };
  ////////////////////////////////////////////////////////////////
  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      console.log("     ");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%)grayscale(${grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      
    };
    image.src = URL.createObjectURL(previewImg);
    // Convert canvas data to a Blob and then to a File
    canvas.toBlob((blob) => {
      const imageFile = new File([blob], `${previewImg.name.split(' ')[0]}`, { type: "image/jpeg" });
    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append('editedImage', previewImg);
    
    // Send the FormData containing the file to the server using Fetch
    fetch(`http://localhost:3001/upload-image/${category}`, {
      method: "POST",
      body: formData,
    }, )
      .then((response) => response.json())
      .then((data) => {
       
        console.log("Image saved:", data);
      })
      .catch((error) => {
        console.error("Error saving image:", error);
      });
    });
    
  };

  ////////////////////////////////////////////////////////

  const UpdatedImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      // Convert the edited image to a data URL and set it in the state
      setEditedImage(canvas.toDataURL());
    };

    image.src = URL.createObjectURL(previewImg);
  };

  const handleFilterClick = (option) => {
    setActiveFilter(option.id);

    switch (option.id) {
      case "brightness":
        setSliderValue(brightness);
        break;
      case "saturation":
        setSliderValue(saturation);
        break;
      default:
        setSliderValue(grayscale);
    }
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    switch (activeFilter) {
      case "brightness":
        setBrightness(event.target.value);
        break;
      case "saturation":
        setSaturation(event.target.value);
        break;
      default:
        setGrayscale(event.target.value);
    }
  };

  const handleRotate = (option) => {
    if (option === "left") {
      setRotate(rotate - 90);
    } else if (option === "right") {
      setRotate(rotate + 90);
    } else if (option === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
  };

  return (
    <div className={`container ${!previewImg ? "disable" : ""}`}>
      <h2 className="mb-6">challenge Image Editor</h2>

      {category ? (
        !crop ? (
          <>
            <div className="wrapper">
              <div className="editor-panel">
                <Filter
                  filterOptions={filterOptions}
                  activeFilter={activeFilter}
                  handleFilterClick={handleFilterClick}
                  sliderValue={sliderValue}
                  handleSliderChange={handleSliderChange}
                  setcrop={setcrop}
                  UpdatedImage={UpdatedImage}
                />
                <Rotate handleRotate={handleRotate} />
              </div>
              <ImagePreview
                previewImg={previewImg}
                previewImgRef={previewImgRef}
                applyFilter={applyFilter}
              />
            </div>

            <Controls
              resetFilter={resetFilter}
              fileInputRef={fileInputRef}
              loadImage={loadImage}
              saveImage={saveImage}
            />
          </>
        ) : (
          <Crop
            previewImg={editedImage}
            setcrop={setcrop}
            setPreviewImg={setPreviewImg}
          />
        )
      ) : (
        <>
          <Category setCategory={setCategory} />
        </>
      )}
    </div>
  );
}

export default App;
