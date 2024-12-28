
const Product = require('../../models/product.models');
// [GET] /product
module.exports.index = async(req,res)=>{
    const products = await Product.find({
        status:"active",
        deleted:false
    }).sort({position:"desc"});
   
    // console.log(products)
    // cập nhật giá sản phẩm mới
    const  newProduct = products.map(item=>{
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    console.log(newProduct);
    res.render('client/pages/products/index',{
        pageTitle:"Sản phẩm",
        products:newProduct,
    });
}