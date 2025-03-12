module.exports.orderValidate = (req,res,next)=>{
    if(req.body.fullName == ""){
        req.flash("error",`Bạn phải nhập tên khi đặt hàng!`);
        res.redirect("back");//quay lại trang
        return;
    }
    if(req.body.phone == ""){
        req.flash("error",`Bạn phải nhập số điện thoại khi đặt hàng!`);
        res.redirect("back");//quay lại trang
        return;
    }
    if(req.body.address == ""){
        req.flash("error",`Bạn phải nhập địa chỉ khi đặt hàng!`);
        res.redirect("back");//quay lại trang
        return;
    }
    next();
}