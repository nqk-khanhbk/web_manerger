const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/auth.controller');
const validate = require('../../validates/admin/auth.validate')
//code phần router

//[GET]/admin/auth/login
router.get('/login',controllers.login)
router.post('/login',validate.postValidate,controllers.loginPost);
//[GET]/admin/auth/logout
router.get('/logout',controllers.logout)
module.exports=router;