const ProductsCategory = require('../../models/product-category.models');
const createTreeHelpers = require('../../helpers/createTree.js');

module.exports.category = async (req, res, next) => {

  const productsCategory = await ProductsCategory.find({
    deleted : false,
  });
  const newProductsCategory = createTreeHelpers.tree(productsCategory);
  // console.log("Luôn chạy qua đây")
  res.locals.layoutProductsCategory = newProductsCategory;
  next();
};