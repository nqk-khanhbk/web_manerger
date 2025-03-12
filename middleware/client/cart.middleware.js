//lưu giỏ hàng vào cookies
const Cart = require('../../models/cart.models')
module.exports.cartId = async (req, res, next) => {
   // console.log(req.cookies.cartId);
//    console.log("Luôn chạy vào đây")
   if (!req.cookies.cartId){
      // Tạo giỏ hàng khi chưa có giỏ hàng
      const cart = new Cart();
      await cart.save();
      // set time khi lưu trong cookies
      const expiresCookie = 365*24*60*60*1000;
      res.cookie("cartId", cart.id, {
        expires: new Date(Date.now() + expiresCookie),
      });
   }
   else{
     // Khi đã có giỏ hàng rồi thì hiển thị số lượng ra màn hình
     const cart = await Cart.findOne({
         _id:req.cookies.cartId,
     });
     // tính tổng số sản phẩm trong giỏ hàng
     cart.totalQuantity = cart.products.reduce((sum,item) =>{
         return sum + item.quantity;
     },0)
     res.locals.miniCart = cart;
   } 
   next();
};