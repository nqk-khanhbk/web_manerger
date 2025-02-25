module.exports.postValidate = (req,res,next)=>{
    if(req.body.email == ""){
        req.flash("error",`Bạn chưa nhập email!`);
        res.redirect("back");//quay lại trang
        return;
    }
    if(req.body.password == ""){
        req.flash("error",`Bạn chưa nhập mật khẩu!`);
        res.redirect("back");//quay lại trang
        return;
    }
    next();
}