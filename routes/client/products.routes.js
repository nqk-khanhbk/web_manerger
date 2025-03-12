const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/product.controller');
//code phần router
router.get('/',controllers.index )

// làm thanh danh mục sản phẩm
router.get('/:slugCategory',controllers.category);

//chi tiet sanr phẩm bên client
router.get('/detail/:slugProduct',controllers.detail)
module.exports=router;