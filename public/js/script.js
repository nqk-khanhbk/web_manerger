//nút tăng giảm khi thêm vào giỏ hàng
document.addEventListener("DOMContentLoaded", function() {
    const price = parseFloat(document.getElementById("price").innerText);
    const quantityInput = document.getElementById("quantity");
    const totalPrice = document.getElementById("total-price");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");

    function updateTotal() {
        const quantity = parseInt(quantityInput.value);
        totalPrice.innerText = (price * quantity).toFixed(2);
    }

    increaseBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity < parseInt(quantityInput.max)) {
            quantityInput.value = quantity + 1;
            updateTotal();
        }
    });

    decreaseBtn.addEventListener("click", function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
            updateTotal();
        }
    });

    quantityInput.addEventListener("input", updateTotal);
});
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
// quay lại trang trước
const buttonGoBack = document.querySelectorAll("[button-go-back]")
if(buttonGoBack.length>0){
  buttonGoBack.forEach(button=>{
    button.addEventListener("click",()=>{
      history.back();
    });
  });
}
// xử lý dropdown chỗ lấy thông tin user
function toggleDropdown() {
  let dropdown = document.getElementById("userDropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

// Ẩn menu khi click ra ngoài
document.addEventListener("click", function (event) {
  let dropdown = document.getElementById("userDropdown");
  let avatar = document.querySelector(".avatar");

  if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});
// Phần swiper cho trang home giao diện
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
//end swiper cho trang giao diện