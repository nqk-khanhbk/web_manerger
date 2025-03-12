module.exports.newPriceProduct = (product)=>{
     // cập nhật giá sản phẩm mới
     const  newProduct = product.map(item =>{
        item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    return newProduct;
}
// tính tiền 1 sản phẩm
module.exports.priceNewProduct = (product) => {
    const priceNew = parseInt(((product.price * (100 - product.discountPercentage)) / 100).toFixed(0));
    return priceNew;
};