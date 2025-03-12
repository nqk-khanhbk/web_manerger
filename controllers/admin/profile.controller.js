const Roles = require('../../models/roles.models')
const Account = require('../../models/account.models')
// [GET] /profile
module.exports.index = async (req,res)=>{
    const user = await Account.findOne({token:req.cookies.token})
    const role = await Roles.findOne({
        _id:user.role_id,
    })
    // console.log(role)
    // console.log(user)
    res.render('admin/pages/profile/index',{
        role:role,
        user:user,
        pageTitle:"Thông tin tài khoản",
    });
}
//GET/profile/edit
module.exports.edit = async (req,res)=>{
    const user = await Account.findOne({token:req.cookies.token})
    const role = await Roles.findOne({
        _id:user.role_id,
    })
    res.render('admin/pages/profile/edit',{
        role:role,
        user:user,
        pageTitle:"Thông tin tài khoản",
    });
}
//PATCH/profile/edit
module.exports.editPatch = async (req,res)=>{
  console.log(res.locals.user)
  const id = res.locals.user.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } 
  else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } 
    else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
  }
  res.redirect("back");
}