const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: String,
  width: Number,
  height: Number,
  url: String,
  filename: String,
  size: Number,
  type: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  colors: [String],
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  stock: { type: Number, required: true },
  reviews: { type: Number, required: true },
  stars: { type: Number, required: true },
  images: [imageSchema]
}, { timestamps: true });

const Product = mongoose.model('products', productSchema);

module.exports = { Product }; // Export as an object