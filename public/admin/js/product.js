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