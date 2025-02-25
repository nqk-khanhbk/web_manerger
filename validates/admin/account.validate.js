module.exports.createValidate = (req,res,next)=>{
    if(req.body.fullName == ""){
        req.flash("error",`Bạn chưa nhập tên!`);
        res.redirect("back");//quay lại trang
        return;
    }
    if(req.body.email == ""){
        req.flash("error",`Bạn chưa nhập gmail!`);
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
module.exports.editValidate = (req,res,next)=>{
    if(req.body.fullName == ""){
        req.flash("error",`Bạn chưa nhập tên!`);
        res.redirect("back");//quay lại trang
        return;
    }
    if(req.body.email == ""){
        req.flash("error",`Bạn chưa nhập gmail!`);
        res.redirect("back");//quay lại trang
        return;
    }
    next();
}