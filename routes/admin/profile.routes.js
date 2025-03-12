const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/profile.controller');
//upload ảnh
const multer  = require('multer');
//upload ảnh lên server
const uploadImage = require('../../middleware/admin/uploadImage.middleware');
const upload = multer();
//phần validate dữ liệu
const validate = require('../../validates/admin/account.validate')
//code phần router
router.get('/',controllers.index)
router.get('/edit',controllers.edit);
router.patch('/edit',upload.single('avatar'),uploadImage.upload,validate.editValidate,controllers.editPatch)
module.exports=router;