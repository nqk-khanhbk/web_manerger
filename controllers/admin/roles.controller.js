const configSystem = require('../../config/system.js');
const Roles = require('../../models/roles.models')
// [GET] /roles
module.exports.index =async  (req,res)=>{
    let find = {
        deleted:false,
    };
    const record = await Roles.find(find)
    res.render('admin/pages/roles/index',{
        pageTitle:"Trang phân quyền",
        record:record,
    });
    res.render('admin/layout/defaul',{
        record:record,
    });
}

//[GET]/roles/create
module.exports.create = (req,res)=>{
    res.render('admin/pages/roles/create',{
        pageTitle:"Tạo mới quyền",
       
    });
}
//[POST] /admin/role/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Roles(req.body);
        await record.save();
        req.flash("success","Tạo quyền thành công!");
        res.redirect("back");
    } 
    catch (error) {
        req.flash("error","Không tạo được quyền")
    }
    
  };
//[GET]/admin/roles/edit/:id
module.exports.edit =async (req,res)=>{
    const id = req.params.id;
    let find ={
        _id:id,
        deleted: false
    }
    const dataRoles = await Roles.findOne(find)
    res.render('admin/pages/roles/edit',{
        pageTitle:"Chỉnh sửa quyền",   
        dataRoles:dataRoles  
    });
}
module.exports.editPatch = async(req,res)=>{
    try {
        const id = req.params.id;
        await Roles.updateOne({ _id: id},req.body);
        req.flash("success", `Chỉnh sửa quyền ${req.body.title} thành công!`);
        res.redirect("back");
      } 
      catch (error) {
        req.flash("error", "Chỉnh sửa quyền thất bại thất bại");
      }
}
//[GET]/admin/roles/delete/:id
module.exports.delete = async (req, res) => {
    
    try {
      const id = req.params.id;
      await Roles.updateOne({_id:id},{deleted:true,deletedDate:new Date()});
      req.flash("success", `Xóa quyền thành công!`);
      res.redirect("back");//quay lại trang
    } 
    catch (error) {
      req.flash("error", "Xóa quyền không thành công");
    }
  };
//[GET]/admin/roles/permisson/
module.exports.permission = async (req,res)=>{
    let find = {
        deleted:false,
    };
    const record = await Roles.find(find)
    res.render('admin/pages/roles/permission',{
        pageTitle:"Trang phân quyền", 
        record:record      
    });
}
//[PATCH]/admin/roles/permission/
module.exports.permissionPatch = async(req,res)=>{
    const permission = JSON.parse(req.body.permission)
    try {
        for(const item of permission){
            const id = item.id;
            const permission=item.permission;
            await Roles.updateOne({_id:id},{permission:permission})
        }
        req.flash("success", `Cập nhật quyền thành công!`);
    } 
    catch (error) {
        req.flash("error", `Cập nhật quyền thất bại!`);
    }
    res.redirect("back")
}