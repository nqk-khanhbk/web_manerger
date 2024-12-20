// [GET] /deshboard
module.exports.index = (req,res)=>{
    res.render('admin/pages/deshboard/index',{
        pageTitle:"Trang tổng quan",
    });
}