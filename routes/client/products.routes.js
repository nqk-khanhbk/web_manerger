const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/product.controller');
//code phần router
router.get('/products',controllers.index )

module.exports=router;