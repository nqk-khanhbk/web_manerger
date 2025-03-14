module.exports.registerValidate = (req, res, next) => {
    if (req.body.fullName.trim() === "") {
        req.flash("error", `Bạn phải nhập tên khi đăng ký!`);
        res.redirect("back");
        return;
    }
    if (req.body.email.trim() === "") {
        req.flash("error", `Bạn phải nhập email khi đăng ký!`);
        res.redirect("back");
        return;
    }
    if (req.body.password.trim() === "") {
        req.flash("error", `Bạn phải nhập mật khẩu khi đăng ký!`);
        res.redirect("back");
        return;
    }
    if (req.body.password.length < 6) {
        req.flash("error", `Mật khẩu phải có ít nhất 6 ký tự!`);
        res.redirect("back");
        return;
    }
    next();
};
module.exports.loginValidate = (req, res, next) => {
    if (req.body.email.trim() === "") {
        req.flash("error", `Bạn phải nhập email khi đăng nhập!`);
        res.redirect("back");
        return;
    }
    if (req.body.password.trim() === "") {
        req.flash("error", `Bạn phải nhập mật khẩu khi đăng nhập!`);
        res.redirect("back");
        return;
    }
    next();
};
module.exports.forgotPasswordValidate = (req, res, next) => {
    if (req.body.email.trim() === "") {
        req.flash("error", `Bạn phải nhập email khi lấy lại mật khẩu!`);
        res.redirect("back");
        return;
    }
    next();
};