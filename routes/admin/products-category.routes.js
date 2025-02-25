const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/products-category.controller');
//upload ảnh
const multer  = require('multer');
//upload ảnh lên server
const uploadImage = require('../../middleware/admin/uploadImage.middleware');
const upload = multer();

//phần validate dữ liệu
const validate = require('../../validates/admin/product-category.validate')
//code phần router
router.get('/',controllers.index)

//[GET]/product-category/create
router.get('/create',controllers.create)
router.post('/create',upload.single('thumbnail'),
  uploadImage.upload,
  validate.createValidate,controllers.createPost)

//GET/product-category/detail/:id
router.get('/edit/:id',controllers.edit)
router.patch('/edit/:id',upload.single('thumbnail'),uploadImage.upload,validate.createValidate,controllers.editPatch)

// xóa 1 sản phẩm
router.delete('/delete/:id',controllers.delete)

// chi tiết trang danh mục
router.get('/detail/:id',controllers.detail);
module.exports=router;
