const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

// Create New Product
const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;

    const product = new Product({
      title,
      description,
      image: imageUrl,
    });

    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete Producr Controller
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const imageFileName = product.image.split("/").pop();
      const imagePath = path.join(__dirname, "../images", imageFileName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update Product Controller
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.image;
    if (req.file) {
      if (product.image) {
        const oldFileName = product.image.split("/").pop();
        const oldPath = path.join(__dirname, "../images", oldFileName);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.image = imageUrl;

    await product.save();

    res.status(200).json({ message: "Product Updated Successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductById,
};
