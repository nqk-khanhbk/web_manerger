const  mongoose  = require("mongoose");

const schemaProducts = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: String,
  deleted: Boolean,
});
const Product = mongoose.model("Product", schemaProducts, "Products");

module.exports = Product;
