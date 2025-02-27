// làm tính năng bộ lọc
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  // console.log(url.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status)
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// end tính năng bộ lọc

// search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    console.log(keyword);
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// end search

//pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

//end paginattion

// phần chỉnh sửa nhiều sp
const checkAllMutil = document.querySelector("[checkall-multi]");
if (checkAllMutil) {
  const inputcheckAll = checkAllMutil.querySelector("input[class='checkall']");
  const inputIds = checkAllMutil.querySelectorAll("input[class='id']");
  // console.log(inputIds)
  inputcheckAll.addEventListener("click", () => {
    if (inputcheckAll.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countCheck = checkAllMutil.querySelectorAll(
        "input[class='id']:checked"
      ).length;
      // console.log(countCheck)
      // console.log(inputIds.length)
      if (countCheck == inputIds.length) {
        inputcheckAll.checked = true;
      } else {
        inputcheckAll.checked = false;
      }
    });
  });
}

// form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkAllMutil = document.querySelector("[checkall-multi]");
    const inputChecked = checkAllMutil.querySelectorAll(
      "input[class='id']:checked"
    ); //LẤY ra những ô input đã ckeck

    //xóa nhiều sản phẩm
    const typeChange = e.target.elements.type.value;
    console.log(typeChange);

    if (typeChange == "delete-all") {
      const inconfirm = confirm("Bạn có muốn xóa nhiều sản phẩm không?");
      if (!inconfirm) {
        return;
      }
    }
    // end xóa nhiều sp

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          // console.log(`${id}-${position}`)
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");
      //     console.log(inputIds.value)
      formChangeMulti.submit();
    } else {
      alert("Xin vui lòng nhập!");
    }
  });
}
// end chỉnh sửa nhiều sp

//show alert thông báo'
// const showAlert = document.querySelector("[show-alert]");
// if(showAlert){
//     const dataTime = parseInt(showAlert.getAttribute("data-time"));
//     const closeAlert = showAlert.querySelector("[close-alert]")
//     console.log(closeAlert)
//     setTimeout(()=>{
//         showAlert.classList.add("alert-hidden");
//     },dataTime)
//     closeAlert.addEventListener("click",()=>{
//         showAlert.classList.add("alert-hidden");
//     })
// }

// Show alert thông báo
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const dataTime = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  const progressBar = showAlert.querySelector("[progress-bar]");

  // Set width của progress bar theo thời gian
  let currentTime = dataTime;
  const interval = 100; // Cập nhật mỗi 100ms
  const step = (interval / dataTime) * 100; // Mỗi bước giảm bao nhiêu %

  const progressInterval = setInterval(() => {
    currentTime -= interval;
    const widthPercentage = (currentTime / dataTime) * 100;
    progressBar.style.width = `${widthPercentage}%`;

    if (currentTime <= 0) {
      clearInterval(progressInterval);
      showAlert.classList.add("alert-hidden");
    }
  }, interval);

  // Ẩn thông báo khi bấm vào nút close
  closeAlert.addEventListener("click", () => {
    clearInterval(progressInterval);
    showAlert.classList.add("alert-hidden");
  });

  // Ẩn thông báo tự động sau thời gian quy định
  setTimeout(() => {
    clearInterval(progressInterval);
    showAlert.classList.add("alert-hidden");
  }, dataTime);
}

// phần upload-image-preview
const uploadImage = document.querySelector("[upload-image]");
const uploadImageInput = document.querySelector("[upload-image-input]");
const uploadImagePreview = document.querySelector("[upload-image-preview]");
if (uploadImage) {
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
//sắp xếp sản phẩm theo tiêu chí
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });
  //xóa bỏ url thêm vào bằng nút clear
  sortClear.addEventListener("click",()=>{
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  })
  // khi bấm sắp xếp,thì thuộc tính đó vẫn giữ nguyên ở option ko mất đi (selected=true);
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if(sortKey && sortValue){
    const stringOption = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value = '${stringOption}']`);
    optionSelected.selected=true;
  }
}

// code phần click vào avatar ra các thứ như đăng xuất và thông tin tk
document.addEventListener("DOMContentLoaded", function () {
  const avatar = document.querySelector(".avatar");
  const dropdown = document.querySelector(".dropdown-menu");
  
  avatar.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("active");
  });
  
  document.addEventListener("click", function (event) {
    if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });
});
