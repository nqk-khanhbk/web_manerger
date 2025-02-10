const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/product.controller');
//code phần router
router.get('/',controllers.index )

//chi tiet sanr phẩm bên client
router.get('/detail/:slug',controllers.detail)
module.exports=router;