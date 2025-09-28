const Product = require("../models/product.model");

//Create New Product
// Create New Product
const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // ابني رابط الصورة كامل
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

module.exports = { createProduct, getAllProducts };
