const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/account.controller');
//upload ảnh
const multer  = require('multer');
//upload ảnh lên máy tính
// const storegeImage = require('../../helpers/storegeImage');
// const upload = multer({ storage:storegeImage() });

//upload ảnh lên server
const uploadImage = require('../../middleware/admin/uploadImage.middleware');
const upload = multer();

//phần validate dữ liệu
const validate = require('../../validates/admin/account.validate')

//code phần router
router.get('/',controllers.index)
//[GET]/account/create
router.get('/create',controllers.create)
router.post('/create',upload.single('avatar'),uploadImage.upload,validate.createValidate,controllers.createPost)

//[GET]/account/edit/:id
router.get('/edit/:id',controllers.edit)
router.patch('/edit/:id',upload.single('avatar'),uploadImage.upload,validate.editValidate,controllers.editPatch)
module.exports=router;