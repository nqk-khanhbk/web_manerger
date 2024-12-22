// tối ưu phần phân trang
module.exports =  (objectPagination,query,countProduct) =>{
    if(query.page){
        objectPagination.currentPage= parseInt(query.page);

    }
    objectPagination.skip= (objectPagination.currentPage - 1) * (objectPagination.limitProduct);

    // const countProduct = await Products.countDocuments(find);
    // console.log(countProduct);
    const totalPages = Math.ceil(countProduct / objectPagination.limitProduct);
    objectPagination.totalPages = totalPages;
    return objectPagination;
}