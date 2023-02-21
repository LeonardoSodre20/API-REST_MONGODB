const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  name: String,
  amount: Number,
  status: String,
  price: Number,
  created_at: Date,
  updated_at: Date,
});

module.exports = Product;
