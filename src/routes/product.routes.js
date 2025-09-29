const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/product.controller");

//--------------------
// Multer Save Images
//--------------------
//Define the storage method for uploaded files using Multer
const storage = multer.diskStorage({
  // ----------------------------------------------
  // Specify the folder where the files are saved
  // ---------------------------------------------

  destination: (req, file, cb) => {
    // __dirname: The current folder path for this file
    // "../images": Moves to the images folder above the current folder
    // path.join merges them correctly depending on the operating system
    const dir = path.join(__dirname, "../images");

    // cb: callback function
    // null: means no error
    // dir: The directory where the file will be saved
    cb(null, dir);
  },

  // ----------------------------------
  // Specify the file name when saving
  // ----------------------------------
  filename: (req, file, cb) => {
    // file.originalname: The name of the original file uploaded by the user
    // path.extname(file.originalname): Extract the file extension (.jpg, .png, ...)
    // Date.now(): A unique number representing the current time in milliseconds
    // Combine them to produce a unique name for each file and retain the extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ---------------------------------------------------------------
// Create a middleware to upload files using the previous settings
// ---------------------------------------------------------------
// upload can be used in routes to accept files from the client
// Example: router.post("/create", upload.single("image"), createProduct);
// .single = Multiprocessing method for processing only one file.
// "image" = The name of the file field sent from the frontend (in the form or FormData).
const upload = multer({ storage });

router.post("/create", upload.single("image"), createProduct);
router.get("/allproducts", getAllProducts);
router.delete("/deleteproduct/:id", deleteProduct);
router.post("/update/:id", upload.single("image"), updateProduct);
router.get("/getbyid/:id", getProductById);

module.exports = router;
