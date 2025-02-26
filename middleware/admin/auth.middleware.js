const configSystem = require('../../config/system.js');
const Account = require('../../models/account.models.js');
const Roles = require('../../models/roles.models.js');
module.exports.requireAuth= async (req,res,next)=>{
    console.log(req.cookies.token);
    //nếu khác token thì quay lại trang đăng nhập
    if(!req.cookies.token){
        res.redirect(`${configSystem.prefixAdmin}/auth/login`)
    }
    else{
        // tìm đến user có token đc đăng nhập
        const user = await Account.findOne({ token: req.cookies.token }).select("-password");
        //nếu # thì quay lại trang đăng nhập
        if (!user) {
            res.redirect(`${configSystem.prefixAdmin}/auth/login`)
        } 
        // tìm đến các quyền của user đó
        else {
          const role = await Roles.findOne({_id: user.role_id}).select("title permission");
          res.locals.user = user;
          res.locals.role = role;
          next();
        }
      }
}