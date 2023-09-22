const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const cors = require("cors");
const multer = require("multer");
app.use(cors());

app.use(express.json());

app.post("/create-folder", (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: "input is required" });
  }

  const folderPath = `./public/assets/${input}`;

  // Check if the folder already exists
  fs.access(folderPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // Folder already exists, you can choose to return a success message or any other action here.
      return res
        .status(200)
        .json({
          message: `the image you edit will be stored in your previous folder ${input}`,
        });
    }

    // Folder does not exist, so create it
    fs.mkdir(folderPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Folder creation failed" });
      }
      return res
        .status(200)
        .json({ message: `Folder ${input} created successfully` });
    });
  });
});

// Set up Multer for file uploads
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    //const dynamic = req.body.category;
    const { category } = req.params;
    //const destinationPath = `./public/assets/${dynamic}`;
    cb(null, `./public/assets/${category}`); // The directory where uploaded images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + Date.now() + ".jpg"); // Generate a unique filename
  },
});

const upload = multer({ storage: fileStorageEngine });

// Serve static files (e.g., uploaded images)

// API endpoint to handle image uploads
app.post(
  "/upload-image/:category",
  upload.single("editedImage"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Here, you can perform additional processing on the uploaded image if needed
    const uploadedImagePath = req.file.path;
    console.log(uploadedImagePath);

    const { category } = req.params;
    // Send a response with the filename or URL of the saved image
    res
      .status(200)
      .json({
        message: `your edit image are saved in the path : public/assets/ ${category}`,
      });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
