const  mongoose  = require("mongoose");
const  slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schemaProducts = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  slug: {
     type: String,
     slug: "title",// gọi theo tên tiêu đề
     unique: true // để ko bị trùng tiêu đề
     },
  position: String,
  deleted:{
    type:Boolean,
    default:false
  },
  deletedDate:Date,
},{
  timestamps:true,
});
const Product = mongoose.model("Product", schemaProducts, "Products");

module.exports = Product;
