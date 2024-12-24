const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/products.controller');
//code phần router
router.get('/',controllers.index)

//phần thay đổi status của sản phẩm
router.patch('/change-status/:status/:id',controllers.changeStatus)

router.patch('/change-multi',controllers.changeMultis)
router.delete('/delete/:id',controllers.deleteButton)
module.exports=router;