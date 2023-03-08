const { query } = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  amount: Number,
  status: String,
  price: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
