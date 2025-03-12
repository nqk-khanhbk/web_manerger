//[GET]/user/register
module.exports.register = async(req,res)=>{
    res.render('client/pages/user/register',{
        pageTitle:"Trang đăng ký",
    });
}