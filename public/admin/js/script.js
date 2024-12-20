// làm tính năng bộ lọc
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);
    // console.log(url.href);
    buttonStatus.forEach((button)=>{
        button.addEventListener('click',()=>{
            const status = button.getAttribute("button-status");
            // console.log(status)
            if(status){
                url.searchParams.set("status",status);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
        
    });
}
// end tính năng bộ lọc

// search 
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) =>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        console.log(keyword);
        if(keyword){
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// end search