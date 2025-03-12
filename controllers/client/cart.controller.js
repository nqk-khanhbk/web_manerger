const Cart = require('../../models/cart.models');
const Products = require('../../models/product.models');
const productHelper = require('../../helpers/newPriceProduct');
//[GET]/cart
module.exports.index = async(req,res)=>{
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      // Lấy thông tin của sản phẩm trong đơn hàng
      const productInfo = await Products.findOne({
         _id: productId,
      }).select("title thumbnail slug price discountPercentage");
      // tạo thêm 1 object mới là productInfo có priceNew trong productId
      productInfo.priceNew = productHelper.priceNewProduct(productInfo);
      item.productInfo = productInfo;
      // tính tổng tiền của từng sản phẩm
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }
  // tổng tiền cả đơn hàng
  cart.totalPrice = cart.products.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
}
//[POST]/cart/add/:productId
module.exports.addPost = async(req,res)=>{
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  //tìm đến cái giỏ hàng đó
  const cart = await Cart.findOne({
    _id: cartId,
  });
  //tìm đến cái sản phẩm thêm vào giỏ hàng để cập nhật số lượng
  const existProductInCart = cart.products.find((item) => item.product_id == productId);
  // nếu cùng sản phẩm
  if (existProductInCart) {
    // số lượng mới bằng số lượng cũ + mới
    const quantityNew = quantity + existProductInCart.quantity;
    // set lại giỏ hàng
    await Cart.updateOne(
      {
        // tìm đến id của giỏ hàng và id của sản phẩm trong giỏ hàng
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
            // set lại số lượng sản phẩm bằng số lượng mới
          "products.$.quantity": quantityNew,
        },
      }
    );
  } 
  // nếu sản phẩm đó chưa dc thêm vào giỏ hàng thì add vào
  else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: objectCart },
      }
    );
  }
  req.flash("success", "Thêm vào giỏ hàng thành công");
  res.redirect("back");
}
//[GET]/cart/delete/:productId
module.exports.delete = async(req,res)=>{
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: {
        products: {
          product_id: productId,
        },
      },
    }
  );

  req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng");
  res.redirect("back");
};
//[GET]/cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  //tìm đến sản phẩm đó
  const cart = await Cart.findOne({
    _id: cartId,
  });

  const updateProductCart = cart.products.find((item) => item.product_id == productId);
  if (updateProductCart) {
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": quantity,
        },
      }
    );
  }

  req.flash("success", "Cập nhật thành công");
  res.redirect("back");
};