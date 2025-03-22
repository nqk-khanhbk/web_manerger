const User = require('../../models/user.models');
const md5 = require("md5");
const generateHelper = require('../../helpers/generate')
const ForgotPassword = require('../../models/forgot-password.models');
const sendMailHelper = require('../../helpers/sendMail');
//[GET]/user/register
module.exports.register = async(req,res)=>{
    res.render('client/pages/user/register',{
        pageTitle:"Trang đăng ký",
    });
}
//[POST]/user/register
module.exports.registerPost = async(req,res)=>{
    console.log(req.body)
    // tìm đến email để kiểm tra xem đã tồn tại chưa
    const existEmail = await User.findOne({
        email: req.body.email,
      });
    if (existEmail) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }
    // mã hóa mật khẩu
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}
//[GET]/user/login
module.exports.login = async(req,res)=>{
    res.render('client/pages/user/login',{
        pageTitle:"Trang đăng nhập",
    });
}
//[POST]/user/login
module.exports.loginPost = async(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  //kiểm tra xem email có nhập đúng chưa
  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`), $options: "i" },
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  // kiểm tra xem mật khẩu đúng chưa
  if (md5(password) != user.password) {
    req.flash("error", "Sai mật khẩu");
    res.redirect("back");
    return;
  }
  // kiểm tra xem tài khoản có bị khóa ko
  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đang bị khóa");
    res.redirect("back");
    return;
  }
  // khi đăng nhập thành công thì lưu cookies và chuyển đến trang chủ
  req.flash("success", "Đăng nhập thành công!");
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
}
//[GET]/user/logout
module.exports.logout = async(req,res)=>{
    req.flash("success", "Đăng xuất thành công!");
    res.clearCookie("tokenUser");
    res.redirect("/");
}
//[GET]/user/password/forgot
module.exports.forgotPassword = async(req,res)=>{
  res.render('client/pages/user/forgot-password',{
    pageTitle:"Trang quên mật khẩu",
  });
}
//[POST]/user/password/forgot
module.exports.forgotPasswordPost = async(req,res)=>{
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: "false",
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  //B1:Tạo mã otp và gmail lưu vào database forgot-password

  //tạo 1 object lưu vào database
  const otp = generateHelper.generateRandomNumber(6);
  const objectForgotPassword = {
    email:email,
    otp:otp,
    expireAt: Date.now(),
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  // B2:Gửi thông báo mã otp về gmail bằng thư viện nodemailer
  console.log("Gửi mã OTP qua email ", otp);
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `Mã OTP để lấy lại mật khẩu là: <b>${otp}</b>. Thời gian sử dụng là 1 phút.Lưu ý ko cho thằng nào biết nhé!`;
  sendMailHelper.sendMail(email, subject, html);
  //Khi lưu xong sẽ sang trang otp và email
  res.redirect(`/user/password/otp?email=${email}`);

}
//[GET]/user/password/otp
module.exports.otpPassword = async(req,res)=>{
  const email = req.query.email;
  res.render('client/pages/user/otp-password',{
    pageTitle:"Trang quên mật khẩu",
    email:email,
  });
}
//[POST]/user/password/otp
module.exports.otpPasswordPost = async(req,res)=>{
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  //ckeck xem mã otp có hợp lệ ko
  if (!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  //gửi cookies của user lên để tý dựa vào đó tìm đến tài khoản để đổi mk
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
}
//[GET]/user/password/reset
module.exports.resetPassword = async(req,res)=>{
  res.render('client/pages/user/reset-password',{
    pageTitle:"Trang đổi mật khẩu",
  });
}
//[POST]/user/password/reset
module.exports.resetPasswordPost = async(req,res)=>{
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    }
  );
  // đổi xong vào trang chủ luôn
  res.redirect("/");
}
//[GET]/user/profile
module.exports.profile = async(req,res)=>{
  res.render('client/pages/user/profile',{
    pageTitle:"Thông tin cá nhân",
  });
}
