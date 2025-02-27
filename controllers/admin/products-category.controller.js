const Account = require('../../models/account.models.js');
const ProductsCategory = require('../../models/product-category.models');
const configSystem = require('../../config/system.js');
const createTreeHelpers = require('../../helpers/createTree.js');
const FilleStatusHelpers = require('../../helpers/fillesStatus.js');
const searchHelpers = require('../../helpers/search.js');


// [GET] /products-category
module.exports.index = async (req,res)=>{
    const filleStatus = FilleStatusHelpers(req.query);
    let find = {
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    const searchObject = searchHelpers(req.query);
    // console.log(searchObject)
    if(searchObject.regex){
        find.title = searchObject.regex;
    }
    //END SEARCH
    const productCategory = await ProductsCategory.find(find);

    // hiển thị tên người tạo
    for (const product of productCategory) {
        const user = await Account.findOne({
            _id:product.createdBy.account_id,
        });
        if(user){
            product.accountFullName = user.fullName;
        }
        
    }
    const newProductCategory = createTreeHelpers.tree(productCategory);
    // console.log(newProductCategory)
    res.render('admin/pages/products-category/index',{
        pageTitle:"Danh mục sản phẩm",
        productCategory:newProductCategory,
        filleStatus:filleStatus,
        keyword:searchObject.keyword,
    });
}

// [GET] /products-category/create
module.exports.create = async (req,res)=>{
    let find = {
        deleted:false
    }
    const record = await ProductsCategory.find(find);
    // console.log(record)
    const newRecord = createTreeHelpers.tree(record);
    // console.log(newRecord)
    res.render('admin/pages/products-category/create',{
        pageTitle:"Tạo danh mục sản phẩm",
        record:newRecord,
    });
}
// [POST]/Products-category/create
module.exports.createPost = async(req,res)=>{
    // console.log(req.file)
    // tự động tăng position
    if(!req.body.position || req.body.position.trim() === ""){
        const countProductCategory = await ProductsCategory.countDocuments();
        req.body.position = countProductCategory + 1;
    }
    else{
        req.body.position = parseInt(req.body.position )
    }
    req.body.createdBy = {
        account_id:res.locals.user.id,
    };
    // khi đẩy upload ảnh lên server thì ko cần cái này,chuyển qua bên router
    // if(req.file){
    //      req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
   
    const productCategory = new ProductsCategory(req.body)
    productCategory.save();
    req.flash("success", "Tạo thành công danh mục sản phẩm");
    res.redirect(`${configSystem.prefixAdmin}/products-category`)
}
//GET/products-category/edit/:id
module.exports.edit = async(req,res)=>{
    try {
        const id = req.params.id;
        //tìm ra id sanr phẩm muốn sửa
        let find = {
            _id: id,
            deleted: false
        }
        const data = await ProductsCategory.findOne(find);
        const record = await ProductsCategory.find({ deleted: false });
        const newRecord = createTreeHelpers.tree(record);
        res.render('admin/pages/products-category/edit',{
            pageTitle:"Chỉnh sửa danh mục sản phẩm",
            data:data,
            record:newRecord
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`) 
    }
    
}
// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
      const id = req.params.id;
      req.body.position = parseInt(req.body.position);
      await ProductsCategory.updateOne({ _id: id},req.body);
      req.flash("success", "Cập nhật thành công");
      res.redirect("back");
    } 
    catch (error) {
      req.flash("error", "Cập nhật thất bại");
    }
  };
//[DELETE] 1 DANH mục
// [DELETE] /admin/products-category/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
      await ProductsCategory.updateOne(
        {_id:id},
        {
            deleted:true, 
            deleteBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
          },
        });
      req.flash("success", "Xóa danh mục thành công");
      res.redirect("back");//quay lại trang
    } 
    catch (error) {
      req.flash("error", "Xóa danh mục không thành công");
    }
  };
//[GET]/admin/products-category/detail/:id
module.exports.detail = async (req,res)=>{
    let find = {
        _id:req.params.id,
    }
    const record = await ProductsCategory.findOne(find);
    res.render('admin/pages/products-category/detail',{
        pageTitle:"Tạo danh mục sản phẩm",
        record:record,
    });
}