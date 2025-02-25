const  mongoose  = require("mongoose");
const  slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schemaProducts = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  status: String,
  parent_id:{
    type:String,
    default:" "
  },
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
const ProductCategory = mongoose.model("ProductCategory", schemaProducts, "Products-category");

module.exports = ProductCategory;
