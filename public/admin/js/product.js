const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){
    buttonChangeStatus.forEach(button=>{
        const formChangeStatus = document.querySelector("#form-change-status");
        const path=formChangeStatus.getAttribute("data-path");
        // console.log(path)
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive":"active";
            
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            console.log(action)
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}

// xóa sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length){
    const formButtonDelete = document.querySelector("#form-button-delete");
    const path = formButtonDelete.getAttribute("data-path")
   buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn có muốn xóa sản phẩm này không ?");
            if(isConfirm){
                const id=button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formButtonDelete.action = action;
                console.log(action)
                formButtonDelete.submit();
            }
        })
   })
}
//end xóa sản phẩm