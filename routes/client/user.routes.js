const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/user.controller');
//code phần router
//[GET]/user/register
router.get('/register',controllers.register)

module.exports=router;