const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/user.controller');
const userValidate = require('../../validates/client/user.validate');
const authMiddleware = require('../../middleware/client/auth.middleware')
//code phần router
//[GET]/user/register
router.get('/register',controllers.register)
//[POST]/user/register
router.post('/register',userValidate.registerValidate,controllers.registerPost);
//[GET]/user/login
router.get('/login',controllers.login);
//[POST]/user/login
router.post('/login',userValidate.loginValidate,controllers.loginPost)
//[GET]/user/logout
router.get('/logout',controllers.logout)
//[GET]/user/password/forgot
router.get('/password/forgot',controllers.forgotPassword)
//[POST]/user/password/forgot
router.post('/password/forgot',userValidate.forgotPasswordValidate,controllers.forgotPasswordPost)

//[GET]/user/password/otp
router.get('/password/otp',controllers.otpPassword);

//[POST]/user/password/otp
router.post('/password/otp',controllers.otpPasswordPost);
//reset lại mật khẩu [GET]/user/password/reset
router.get('/password/reset',controllers.resetPassword);
router.post('/password/reset',controllers.resetPasswordPost);

//  Thông tin cá nhân
router.get('/profile',authMiddleware.requireAuth,controllers.profile)
module.exports=router;