module.exports = (query) =>{
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
    if(query.status){
        const index = filleStatus.findIndex(item => item.status == query.status);
        filleStatus[index].class="active";
    }
    else{
        const index = filleStatus.findIndex(item => item.status == "");
        filleStatus[index].class= "active";
    }
    return filleStatus;
}