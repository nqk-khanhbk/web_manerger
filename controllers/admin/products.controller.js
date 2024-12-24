
// [GET] /products
const Products = require('../../models/product.models');

const FilleStatusHelpers = require('../../helpers/fillesStatus.js');
const searchHelpers = require('../../helpers/search.js');
const objectPaginationHelpers = require('../../helpers/pagination.js');
module.exports.index = async (req,res)=>{
   
    const filleStatus = FilleStatusHelpers(req.query);
    //  console.log(filleStatus)
    let find = {
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    // phần tìm kiếm được tối ưu

    // let keyword = "";
    // // console.log(req.query.keyword)
    // if(req.query.keyword){
    //     keyword = req.query.keyword;
    //     const regex = new RegExp(keyword,"i");
    //     find.title = regex;
    // }
    const searchObject = searchHelpers(req.query);
    // console.log(searchObject)
    if(searchObject.regex){
        find.title = searchObject.regex;
    }
    //END SEARCH

    //pagination tối ưu
    const countProduct = await Products.countDocuments(find);
    const objectPagination = objectPaginationHelpers(
        {
            currentPage:2,
            limitProduct:4,
        },
        req.query,
        countProduct
    )
    // const objectPagination = {
    //     currentPage:2,
    //     limitProduct:4,
    // }
    // if(req.query.page){
    //     objectPagination.currentPage= parseInt(req.query.page);

    // }
    // objectPagination.skip= (objectPagination.currentPage - 1) * (objectPagination.limitProduct);

    // const countProduct = await Products.countDocuments(find);
    // // console.log(countProduct);
    // const totalPages = Math.ceil(countProduct / objectPagination.limitProduct);
    // objectPagination.totalPages = totalPages;
    
    //end pagination

    const products =  await Products.find(find).limit(objectPagination.limitProduct).skip(objectPagination.skip);
    // console.log(products);
    res.render('admin/pages/products/index',{
        pageTitle:"Trang products",
        product:products,
        filleStatus:filleStatus,
        keyword:searchObject.keyword,
        pagination:objectPagination,
    });
}

module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await Products.updateOne({ _id: id },{ status:status });
    res.redirect("back");
}
module.exports.changeMultis = async (req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch(type){
        case("active"):
            await Products.updateMany({ _id: {$in:ids}},{status:"active"});
            break;
        case("inactive"):
            await Products.updateMany({ _id: {$in:ids}},{status:"inactive"});
            break;
        default:
            break;
    }
    res.redirect("back");   
}

// xóa sản phẩm
module.exports.deleteButton = async(req,res)=>{
    const id = req.params.id;
    // xóa cứng 1 sản phẩm trong database
    await Products.deleteOne({_id:id});
    // xóa mềm 1 sản phẩm trong database
    res.redirect("back");//quay lại trang
}