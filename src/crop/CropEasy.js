import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";

const CropEasy = ({ previewImg, setcrop, setPreviewImg }) => {
  const [photoURL, setPhotoURL] = useState(previewImg);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  //for display previous page
  const apply = () => {
    setcrop(false);
  };
  //apply the croped
  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      //set the last update of image
      setPreviewImg(file);
      //setCroppedImageUrl(file);
      //console.log(file);
      //console.log(URL.createObjectURL(file));

      //return the setting
      setZoom(1);
      setRotation(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#3433",
          position: "relative",
          height: 400,
          width: 400,
          marginLeft: 20,
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setcrop(false);
            }}
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleIcon />}
            onClick={apply}
          >
            APPLY
          </Button>
        </Box>
      </DialogActions>
      {/* Display the cropped image */}
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
