const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/setting-general.controller');
//upload ảnh
const multer  = require('multer');
//upload ảnh lên server
const uploadImage = require('../../middleware/admin/uploadImage.middleware');
const upload = multer();
//code phần router
//[GET]/settings/general
router.get('/general',controllers.general)
router.patch("/general",upload.single('logo'),uploadImage.upload,controllers.generalPatch)
module.exports=router;