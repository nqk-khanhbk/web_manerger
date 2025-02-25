const configSystem = require('../../config/system.js');
const Account = require('../../models/account.models');
const Roles = require('../../models/roles.models');
const md5 = require("md5");
// [GET] /account
module.exports.index = async (req,res)=>{
    let find = {
        deleted: false,
      };
      //tìm các bản ghi mới để vẽ ra giao diện danh sách tài khoản
      const records = await Account.find(find).select("-password -token");
      for (const item of records) {
        const role = await Roles.findOne({
          _id: item.role_id,
          deleted: false,
        });
        item.roles = role;
      }
    res.render('admin/pages/account/index',{
        pageTitle:"Trang danh sách tài khoản",
        records:records
    });
}
// [GET] /account/create
module.exports.create = async (req,res)=>{
    let find = {
        deleted:false,
    }
    const roles = await Roles.find(find);
    res.render('admin/pages/account/create',{
        pageTitle:"Tạo tài khoản",
        roles:roles,
    });
}
// [PATCH] /account/create
module.exports.createPost = async (req,res)=>{
    //Kiểm tra xem email trong dữ liệu vs email thêm mới có trùng nhau ko
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false,
      });
    // nếu trùng nhau
      if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
      } 
      else {
        //mã hóa mật khẩu lưu vào db
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        req.flash("success", "Tạo tài khoản thành công");
        res.redirect(`${configSystem.prefixAdmin}/account`);
      }
}
// [GET] /account/edit/:id
module.exports.edit = async (req,res)=>{
    try {
        const id = req.params.id;
        let find = {
            deleted:false,
        }
        const data = await Account.findOne({
            _id:id,
            deleted:false
        })
        const roles = await Roles.find(find);
        res.render('admin/pages/account/edit',{
            pageTitle:"Chỉnh sửa tài khoản",
            roles:roles,
            data:data,   
        });
    } catch (error) {
        res.redirect(`${configSystem.prefixAdmin}/account`);
    }
   
}
//[PATCH]/admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id : {$ne : id },
        email: req.body.email,
        deleted: false,
    });
    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    } 
    else {
        //nếu có thay đổi mật khẩu 
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } 
        // nếu ko thay đổi thì giữ nguyên và xóa bỏ các dấu cách trắng đi
        else {
            delete req.body.password;
        }
     await Account.updateOne({ _id: id },req.body);
     req.flash("success", "Cập nhật tài khoản thành công");
   }
   res.redirect("back");
 };