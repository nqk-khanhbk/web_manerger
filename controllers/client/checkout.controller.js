//phần đặt hàng
const Cart = require('../../models/cart.models');
const Product = require('../../models/product.models')
const Order = require('../../models/order.models');
const productHelper = require('../../helpers/newPriceProduct');
//[GET]/checkout
module.exports.index = async(req,res)=>{
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    //duyệt qua từng sản phẩm trong giỏ hàng
    for (const item of cart.products) {
      const productId = item.product_id;
      //lấy thông tin chi tiết của đơn hàng
      const productInfo = await Product.findOne({
        _id: productId,
      }).select("title thumbnail slug price discountPercentage");
      //tính giá mới sau khuyến mại
      productInfo.priceNew = productHelper.priceNewProduct(productInfo);
      item.productInfo = productInfo;
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }

  cart.totalPrice = cart.products.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);
  // console.log(cart)
  res.render("client/pages/checkout/index", {
      pageTilte: "Đặt hàng",
      cartDetail: cart,
  });
}
//[POST]/checkout/order
module.exports.orderPost = async(req,res)=>{
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  console.log(userInfo)
  const cart = await Cart.findOne({
    _id: cartId,
  });
  // tạo ra một mảng product rỗng
  const products = [];
  //duyệt qua từng sản phẩm lưu vào obj products
  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("price discountPercentage");
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;
    products.push(objectProduct);
  }
  const orderInfo = {
    userInfo: userInfo,
    products: products,
  };
  const order = new Order(orderInfo);
  order.save();
  //khi đã bấm thanh toán thì sẽ xóa hết đơn hàng trong giỏ
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    }
  );
  res.redirect(`/checkout/success/${order.id}`);
}
//[GET]/checkout/success/:orderId
module.exports.success = async(req,res)=>{
  const order = await Order.findOne({
    _id: req.params.orderId,
  });
  //duyệt qua các sản phẩm trong giỏ hàng
  for(const product of order.products){
    // lấy thông tin sản phẩm(chỉ lấy tên và ảnh)
    const productInfo = await Product.findOne({
      _id : product.product_id
    }).select("title thumbnail");
    product.productInfo = productInfo;
    product.priceNew = productHelper.priceNewProduct(product);
    product.totalPrice = product.priceNew * product.quantity;
  }
  order.totalPrice = order.products.reduce((sum,item) =>{
    return sum + item.totalPrice;
  },0)
   res.render("client/pages/checkout/success",{
      pageTilte: "Đặt hàng thành công",
      order : order
   })
}