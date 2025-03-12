const newPriceHelper = require('../../helpers/newPriceProduct');
const Product = require('../../models/product.models');
const ProductsCategory = require('../../models/product-category.models');
const ProductCategoryHelper = require('../../helpers/getSubCategory');
// [GET] /product
module.exports.index = async(req,res)=>{
    const products = await Product.find({
        status:"active",
        deleted:false
    }).sort({position:"desc"});
   
    // console.log(products)
    // cập nhật giá sản phẩm mới
    const newProduct = newPriceHelper.newPriceProduct(products)
    res.render('client/pages/products/index',{
        pageTitle:"Danh sách sản phẩm",
        products:newProduct,
    });
}
//GET /product/detail/:slugProduct
module.exports.detail = async(req,res)=>{
    try{
        // console.log(req.params.slug)
        const find = {
            deleted:false,
            slug:req.params.slugProduct,
            status:"active"
        }
        const product = await Product.findOne(find);
        // console.log(product);
        if (product.product_category_id) {
            // tìm đến cái category của sản phẩm đó
            const category = await ProductsCategory.findOne({
              _id: product.product_category_id,
              status: "active",
              deleted: false,
            });
            // thêm 1 trường category trong object product
            product.category = category;
        }
        // lấy ra giá của từng sản phẩm
        product.priceNew = newPriceHelper.priceNewProduct(product)
        console.log(product)
        res.render('client/pages/products/detail-product',{
            pageTitle:product.title,
            product:product,
        });
    }
    catch(error){
        res.redirect(`/products`);
    }
}
//[GET]/product/:slugCategory
module.exports.category = async(req,res)=>{
    // tìm đến category có slug bằng với đường dẫn vào :slugCategory
    const category = await ProductsCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false,
      });
    const listSubCategory = await ProductCategoryHelper.getSubCategory(category.id);
    // duyệt qua từng phần tử lấy id của danh mục con
    const listSubCategoryId = listSubCategory.map(item => item.id);
    // tìm đến sản phẩm có product_category_id bằng với id của category
    console.log(listSubCategoryId);
    const products = await Product.find({
        product_category_id:{ $in: [category.id, ...listSubCategoryId] },
        deleted: false,
    }).sort({ position: "desc" });
    console.log(products);
    const newProduct = newPriceHelper.newPriceProduct(products)
    res.render('client/pages/products/index',{
        pageTitle: `Sản phẩm của danh mục ${category.title}`,
        products:newProduct,
    });
}