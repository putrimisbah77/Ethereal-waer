const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    salePercentage: {
      type: Number,
      default: 0, // Default to 0% if no sale is active
    },
    saleTitle: {
      type: String,
      default: "", // Optional title for the sale
    },
    totalStock: Number,
    averageReview: {
      type: Number,
      default: 0, // Default average review
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
