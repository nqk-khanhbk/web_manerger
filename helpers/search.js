module.exports = (query)=>{
    let objectSearch = {
         keyword:" ",
    }
    
    // console.log(req.query.keyword)
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword,"i");
        // thêm 1 object có tên regex vào oj
        objectSearch.regex = regex;
    }
    return objectSearch;
}