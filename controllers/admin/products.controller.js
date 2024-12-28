
// [GET] /products
const Products = require('../../models/product.models');

const FilleStatusHelpers = require('../../helpers/fillesStatus.js');
const searchHelpers = require('../../helpers/search.js');
const objectPaginationHelpers = require('../../helpers/pagination.js');

const configSystem = require('../../config/system.js');
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

    const products =  await Products.find(find).sort({position:"desc"}).limit(objectPagination.limitProduct).skip(objectPagination.skip);
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
    
    req.flash("success","Thay đổi trạng thái thành công!");
    res.redirect("back");
}
module.exports.changeMultis = async (req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch(type){
        case("active"):
            await Products.updateMany({ _id: {$in:ids}},{status:"active"});
            req.flash("success",`Thay đổi trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case("inactive"):
            await Products.updateMany({ _id: {$in:ids}},{status:"inactive"});
            
            break;
        case("delete-all"):
            await Products.updateMany({_id:{$in:ids}},{deleted:true,deletedDate:new Date()})
            break;
        case("change-position"):
            for(const item of ids){
                let[id,position] = item.split("-");
                position = parseInt(position);
                // console.log(id);
                // console.log(position)
                await Products.updateOne({_id:id},{position:position});
            }
            req.flash("success",`Đã xóa thành công ${ids.length} sản phẩm!`);
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
    // await Products.deleteOne({_id:id});

    // xóa mềm 1 sản phẩm trong database
    await Products.updateOne({_id:id},{deleted:true,deletedDate:new Date()});
    req.flash("success",`Đã xóa thành công sản phẩm!`);
    res.redirect("back");//quay lại trang
}

//Thêm mới 1 sản phẩm [GET]/product/create
module.exports.create = async(req,res)=>{
    res.render('admin/pages/products/create-product',{
        pageTitle:"Thêm sản phẩm",
    });
}
//[POST]/products/creat
module.exports.createPost = async(req,res)=>{
    console.log(req.file)
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(!req.body.position || req.body.position.trim() === ""){
        const countProduct = await Products.countDocuments();
        console.log(countProduct)
        req.body.position = countProduct + 1;
    }
    else{
        req.body.position = parseInt(req.body.position )
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`
    const product = new Products(req.body)
    product.save();
    res.redirect(`${configSystem.prefixAdmin}/products`)
}