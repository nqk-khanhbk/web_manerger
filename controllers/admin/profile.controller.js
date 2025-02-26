const { findOne } = require("../../models/account.models");
const Account = require('../../models/account.models')
// [GET] /profile
module.exports.index = async (req,res)=>{
    const user = await Account.findOne({token:req.cookies.token})
    // console.log(user)
    res.render('admin/pages/profile/index',{
        user:user,
        pageTitle:"Thông tin tài khoản",
    });
}