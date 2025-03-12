const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/checkout.controller');
const orderValidate = require('../../validates/client/order.validate')
//code phần router
//[GET]/checkout (đặt hàng)
router.get('/',controllers.index)
//[POST]/checkout/order
router.post('/order',orderValidate.orderValidate,controllers.orderPost)
//[GET]/checkout/success/:orderId
router.get('/success/:orderId',controllers.success);
module.exports=router;