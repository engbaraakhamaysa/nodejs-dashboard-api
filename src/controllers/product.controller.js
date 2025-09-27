const Product = require("../models/product.model");

//Create New Product
const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const image = req.file ? req.file.filename : null;

    const product = new Product({
      title,
      description,
      image,
    });

    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProduct };
