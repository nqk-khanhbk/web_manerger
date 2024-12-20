
// [GET] /products
const Products = require('../../models/product.models');
module.exports.index = async (req,res)=>{
   
    // console.log(req.query.status);
    let filleStatus = [
        {
            name:"Tất cả",
            class:"",
            status:""
        },
        {
            name:"Hoạt đông",
            class:"",
            status:"active"
        },
        {
            name:"Ngừng hoạt động",
            class:"",
            status:"inactive"
        }
    ];
    // làm tính năng thay đổi màu sắc khi bấm vào từng nút bộ lọc
    if(req.query.status){
        const index = filleStatus.findIndex(item => item.status == req.query.status);
        filleStatus[index].class="active";
    }
    else{
        const index = filleStatus.findIndex(item => item.status == "");
        filleStatus[index].class= "active";
    }
    // end làm tính năng thay đổi màu sắc khi bấm vào từng nút bộ lọc
     // Lọc sản phẩm theo từ khóa (keyword)
    //  if (req.query.keyword) {
    //     const lowerKeyword = req.query.keyword.toLowerCase(); // Chuyển từ khóa sang chữ thường
    //     products = products.filter(product =>
    //         product.title.toLowerCase().includes(lowerKeyword)
    //     );
    // }
    let find = {
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    // phần tìm kiếm
    let keyword = "";
    // console.log(req.query.keyword)
    if(req.query.keyword){
        keyword = req.query.keyword;
        const regex = new RegExp(keyword,"i");
        find.title = regex;
    }
    //END SEARCH
    const products =  await Products.find(find);
    // console.log(products);
    res.render('admin/pages/products/index',{
        pageTitle:"Trang products",
        product:products,
        filleStatus:filleStatus,
        keyword:keyword,
    });
}