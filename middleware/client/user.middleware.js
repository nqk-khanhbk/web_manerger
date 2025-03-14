// lấy thông tin user
const User = require('../../models/user.models')
module.exports.infoUser = async(req,res,next) =>{
//    console.log(req.cookies.tokenUser)

   if (req.cookies.tokenUser){
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted : false,
        status : "active"
      }).select("-password");
      if(user){
         res.locals.user = user;
      }
   }
   next();
}