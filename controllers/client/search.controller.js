const Product = require('../../models/product.models');
const productsHelper = require('../../helpers/newPriceProduct');
module.exports.index = async(req,res)=>{
    const keyword = req.query.keyword;
    console.log(keyword)
    let newProducts = [];
    if (keyword) {
      const regex = new RegExp(keyword, "i");
      const products = await Product.find({
        title: regex,
        deleted: false,
        status: "active",
      });
      newProducts = productsHelper.newPriceProduct(products);
    }
    res.render('client/pages/search/index',{
        pageTitle:"Sản phẩm tìm kiếm",
        products: newProducts,
        keyword:keyword
    });
   
}