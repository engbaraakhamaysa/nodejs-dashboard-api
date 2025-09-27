const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createProduct } = require("../controllers/product.controller");

//Multer Save Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../images");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/create", upload.single("image"), createProduct);

module.exports = router;
