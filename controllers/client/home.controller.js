const Product = require('../../models/product.models');
const newPriceHelper = require('../../helpers/newPriceProduct');
// [GET] /
module.exports.index = async (req,res)=>{
    const find = {
        deleted:false,
        status:"active",
        featured:"1",
    }
    const productFeatured = await Product.find(find).limit(6);
     // cập nhật giá sản phẩm mới
    const newProduct = newPriceHelper.newPriceProduct(productFeatured)
    // console.log(productFeatured);
    const productNew = await Product.find({
        deleted:false,
        status:"active",
    }).sort({position:"desc"}).limit(6);
    const productNeww = newPriceHelper.newPriceProduct(productNew)
    res.render('client/pages/home/index',{
        pageTitle:"Trang chủ",
        productFeatured:newProduct,
        Newproduct:productNeww,
    });
}