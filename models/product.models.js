const  mongoose  = require("mongoose");
const  slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schemaProducts = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: String,
    default: "",
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  featured:String,
  status: String,
  slug: {
     type: String,
     slug: "title",// gọi theo tên tiêu đề
     unique: true // để ko bị trùng tiêu đề
     },
  position: String,
  createdBy:{
    account_id:String,
    createdAt:{
      type:Date,
      default:Date.now(),
    }
  },
  deleted:{
    type:Boolean,
    default:false
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date,
    },
  ],
  deleteBy: {
    account_id: String,
    deletedAt: Date,
  },
  deletedDate:Date,
},{
  timestamps:true,
});
const Product = mongoose.model("Product", schemaProducts, "Products");

module.exports = Product;
