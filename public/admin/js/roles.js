// code phần phân quyền
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permission = [];
        //lấy từng hàng
        const rows = tablePermission.querySelectorAll("[data-name]");
        //duyệt qua từng hàng
        rows.forEach(row=>{
            //lấy tên của hàng đó
            const name = row.getAttribute("data-name")
            //lấy tất cả các ô input của hàng đó
            const inputs = row.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach(input=>{
                    //lấy ra id của tên quyền
                    const id = input.value;
                    permission.push({
                        id:id,
                        permission:[],
                    });
                })
            }
            else{
                inputs.forEach((input,index) =>{
                    const checked = input.checked;
                    if(checked){
                        permission[index].permission.push(name);
                    }
                })
            }
        })
        console.log(permission)
        if(permission.length > 0){
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permission']");
            inputPermissions.value = JSON.stringify(permission);
            formChangePermissions.submit();
        }
    })
}
//end code phần phân quyền

// hiển thị các nút tích phân quyền
const dataRecord = document.querySelector("[data-record]")
if(dataRecord){
    const record = JSON.parse(dataRecord.getAttribute("data-record"))
    // console.log(record)
    const tablePermission = document.querySelector("[table-permission]")
    record.forEach((record,index)=>{
        const permission = record.permission;
        // console.log(permission)
        permission.forEach(permission=>{
            console.log(permission)
            //tìm đến cái hàng chứa các quyền đó
            const row = tablePermission.querySelector(`[data-name="${permission}"]`);
            //tìm đến id của ô input và cho tất cả những permission hiển thị khi dc tích
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        })
    })
}
// end hiển thị các nút tích phân quyền