const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/profile.controller');
//code phần router
router.get('/',controllers.index)

module.exports=router;