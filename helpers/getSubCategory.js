// Tìm đến các danh mục con trong product-category
const ProductCategory = require('../models/product-category.models');

module.exports.getSubCategory = async (parentId) => {
  const getCategory = async (parentId) => {
    // tìm đến danh mục con 
    const subs = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });
    let allSub = [...subs];
    // gọi đến từng danh mục con trong danh mục cha và gọi lại đệ quy
    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSub = allSub.concat(childs);
    }
    return allSub;
  };
  const result = await getCategory(parentId);
  return result;
};