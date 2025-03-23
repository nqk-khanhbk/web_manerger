const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/connect.controller');
//code phần router
router.get('/',controllers.index)

module.exports=router;