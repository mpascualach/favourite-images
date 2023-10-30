const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
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

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const filePath = req.file.path;
  console.log(req.file.path);
  images.push({ id, title, filePath });
  id++;
  res.json({ message: "Image uploaded successfully!" });
});

app.get("/gallery", (req, res) => {
  res.json(images);
});

app.patch("/update/:id", (req, res) => {
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

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  images = images.filter((img) => img.id !== +id);
  res.json({ message: "Image deleted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
