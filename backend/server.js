const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const server = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let images = [];
let id = 0;

server.use(express.json());
server.use(cors());

server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.post("/upload", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const filePath = req.file.path;
  console.log(req.file.path);
  images.push({ id, title, filePath });
  id++;
  res.json({ message: "Image uploaded successfully!" });
});

server.get("/gallery", (req, res) => {
  res.json(images);
});

server.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const image = images.find((img) => img.id === +id);
  if (image) {
    image.title = title;
    res.json({ message: "Image title updated successfully!" });
  } else {
    res.status(404).json({ message: "Image not found!" });
  }
});

server.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  images = images.filter((img) => img.id !== +id);
  res.json({ message: "Image deleted successfully!" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
