const express = require("express");
const router = express.Router();
const controllers = require('../../controllers/admin/roles.controller');
//code phần router
router.get('/',controllers.index)

//[Get]/admin/roles/create
router.get('/create',controllers.create);
router.post('/create',controllers.createPost);

//[POST]/admin/roles/edit/:id
router.get('/edit/:id',controllers.edit);
router.patch('/edit/:id',controllers.editPatch);

//[DELETE]/admin/roles/delete/:id
router.delete('/delete/:id',controllers.delete)

//Phần phân quyền
router.get('/permission',controllers.permission)
router.patch('/permission',controllers.permissionPatch);
module.exports=router;