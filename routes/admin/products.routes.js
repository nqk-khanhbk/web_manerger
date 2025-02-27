const express = require("express");
const router = express.Router();


const controllers = require('../../controllers/admin/products.controller');
//upload ảnh
const multer  = require('multer');
//upload ảnh lên máy tính
// const storegeImage = require('../../helpers/storegeImage');
// const upload = multer({ storage:storegeImage() });

//upload ảnh lên server
const uploadImage = require('../../middleware/admin/uploadImage.middleware');
const upload = multer();

//phần validate dữ liệu
const validate = require('../../validates/admin/product.validate')

//code phần router
router.get('/',controllers.index)

//phần thay đổi status của sản phẩm
router.patch('/change-status/:status/:id',controllers.changeStatus)

//thay đổi trạng thái  nhiều sản phẩm
router.patch('/change-multi',controllers.changeMultis)

// xóa 1 sản phẩm
router.delete('/delete/:id',controllers.deleteButton)

//thêm mới 1 sản phẩm
router.get('/create',controllers.create)
router.post('/create',
  upload.single('thumbnail'),
  uploadImage.upload,
  validate.createValidate,controllers.createPost)

//chỉnh sửa sản phẩm [get] admin/products/editProduct/:id
router.get('/editProduct/:id', uploadImage.upload,controllers.editProduct)
//[PATCH]/admin/products/editProduct/id
router.patch('/editProduct/:id',upload.single('thumbnail'),validate.createValidate,controllers.editPatch);

//chi tiết sản phẩm
router.get('/detailProduct/:id',controllers.detailProduct);
module.exports=router;