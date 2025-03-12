const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/client/cart.controller');
//[GET]/cart
router.get('/',controllers.index);
//[GET]/cart/delete/:productId;
router.get('/delete/:productId',controllers.delete);
//[POST]/cart/add/:productId
router.post('/add/:productId',controllers.addPost)
//[GET]/cart/update/:productId/:quantity
router.get('/update/:productId/:quantity',controllers.update)
module.exports=router;