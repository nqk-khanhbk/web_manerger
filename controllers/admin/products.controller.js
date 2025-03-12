const Account = require('../../models/account.models')
const Products = require('../../models/product.models');
const ProductsCategory = require('../../models/product-category.models');
const FilleStatusHelpers = require('../../helpers/fillesStatus.js');
const searchHelpers = require('../../helpers/search.js');
const objectPaginationHelpers = require('../../helpers/pagination.js');
const createTreeHelpers = require('../../helpers/createTree.js');
const configSystem = require('../../config/system.js');
module.exports.index = async (req,res)=>{
   
    const filleStatus = FilleStatusHelpers(req.query);
    //  console.log(filleStatus)

    //phần này chứa điều kiện muốn tìm kiếm
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
    // // console.log(countProduct); đếm số sản phẩm có trong dữ liệu
    // const totalPages = Math.ceil(countProduct / objectPagination.limitProduct);
    // objectPagination.totalPages = totalPages;
    
    //end pagination

    //sắp xếp sản phẩm theo tiêu chí
    const sort={}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position= "desc";
    }
    //end sắp xếp sản phẩm
    const products =  await Products.find(find).sort(sort).limit(objectPagination.limitProduct).skip(objectPagination.skip);
    // console.log(products);
    // hiển thị tên người tạo
    for (const product of products) {
        const user = await Account.findOne({
            _id:product.createdBy.account_id,
        });
        if(user){
            product.accountFullName = user.fullName;
        }
        // phaan lay thoong tin nhiều người
        // lay thong tin nguoi update cuoi cungf
        const updateBy = product.updatedBy.slice(-1)[0];
        if(updateBy){
        const userUpdated = await Account.findOne({
            _id : updateBy.account_id
        });
        updateBy.accountFullName = userUpdated.fullName;
        }
    }
    res.render('admin/pages/products/index',{
        pageTitle:"Trang products",
        product:products,
        filleStatus:filleStatus,
        keyword:searchObject.keyword,
        pagination:objectPagination,
    });
}

//thay đổi trạng thái  1 sản phẩm
module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await Products.updateOne({ _id: id },{ status:status });
    
    req.flash("success","Thay đổi trạng thái thành công!");
    res.redirect("back");
}
//thay đổi trạng thái nhiều sản phẩm
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
            await Products.updateMany({_id:{$in:ids}},{
                deleted:true, 
                deleteBy: {
                    account_id: res.locals.user.id,
                    deletedAt: new Date(),
              },
            });
            break;
        case("change-position"):
            // console.log(ids);
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
    await Products.updateOne({_id:id},{
        deleted:true, 
        deleteBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
      },
    });
    req.flash("success",`Đã xóa thành công sản phẩm!`);
    res.redirect("back");//quay lại trang
}

//Thêm mới 1 sản phẩm [GET]/product/create
module.exports.create = async(req,res)=>{
    let find={
        deleted:false,
    };
    const record = await ProductsCategory.find(find);
    // console.log(record)
    const newRecord = createTreeHelpers.tree(record);
    // console.log(newRecord)
    res.render('admin/pages/products/create-product',{
        pageTitle:"Thêm sản phẩm",
        record:newRecord,
    });
}
//[POST]/products/creat
module.exports.createPost = async(req,res)=>{
    // console.log(req.file)
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // console.log(req.body)
    // tự động tăng position
    if(!req.body.position || req.body.position.trim() === ""){
        const countProduct = await Products.countDocuments();
        console.log(countProduct)
        req.body.position = countProduct + 1;
    }
    else{
        req.body.position = parseInt(req.body.position )
    }
    // khi đẩy upload ảnh lên server thì ko cần cái này,chuyển qua bên router
    // if(req.file){
    //      req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
   
    //làm thêm tính năng lưu thông tin người tạo khi tạo product
    req.body.createdBy = {
        account_id:res.locals.user.id,
    }
    const product = new Products(req.body)
    product.save();
    req.flash("success", "Tạo thành công sản phẩm");
    res.redirect(`${configSystem.prefixAdmin}/products`)
}

//chỉnh sửa thông tin sản phẩm [GET] admin/product/editProduct/:id
module.exports.editProduct = async(req,res)=>{
    try{
        // console.log(req.params.id)
        const find = {
            deleted:false,
            _id:req.params.id
        }
        const product = await Products.findOne(find);
        const category = await ProductsCategory.find({ deleted: false });
        const newCategory = createTreeHelpers.tree(category);
        // console.log(product)
        res.render('admin/pages/products/edit-product',{
            pageTitle:"Chỉnh sửa sản phẩm",
            product:product,
            category: newCategory,
        });
    }
    catch(error){
        res.redirect(`${configSystem.prefixAdmin}/products`);
    }
    
}
module.exports.editPatch = async(req,res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position )
    if(req.file){
         req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date(),
          };
        await Products.updateOne({_id:id}, 
            {
                //luu car update truowcs dos
                ...req.body,
                $push: {
                  updatedBy: updatedBy,
                },
              });   
        req.flash("success",`Đã chỉnh sửa sản phẩm thành công!`);   
    } catch (error) {
        req.flash("error",`Chưa chỉnh sửa được sản phẩm!`);
    }
    res.redirect("back")
}
//trang chi tiết sản phẩm
module.exports.detailProduct = async(req,res)=>{
    try{
        // console.log(req.params.id)
        const find = {
            deleted:false,
            _id:req.params.id
        }
        const product = await Products.findOne(find);
        console.log(product);
        res.render('admin/pages/products/detail-product',{
            pageTitle:product.title,
            product:product,
        });
    }
    catch(error){
        res.redirect(`${configSystem.prefixAdmin}/products`);
    }
    
}
