const configSystem = require('../../config/system.js');
const Account = require('../../models/account.models');
const md5 = require("md5");
// [GET] /auth/login
module.exports.login = (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${configSystem.prefixAdmin}/deshboard`);
    }
    else {
        res.render('admin/pages/auth/login', {
            pageTitle: "Trang đăng nhập",
        });
    }
}
// [POST] /auth/login/
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        email: email,
        deleted: false,
    });
    //kiểm tra nếu nhập sai email
    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }
    //kiểm tra mật khẩu
    if (md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }
    //kiểm tra xem tài khoản có bị khóa ko
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect("back");
        return;
    }
    res.cookie("token", user.token);
    res.redirect(`${configSystem.prefixAdmin}/deshboard`);
}
// [GET] /auth/logout
module.exports.logout = (req, res) => {
    //xóa cái token
    res.clearCookie("token");
    res.redirect(`${configSystem.prefixAdmin}/auth/login`)
}