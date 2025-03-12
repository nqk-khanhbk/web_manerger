// Cập nhật lại số lượng trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0){
   inputQuantity.forEach(input =>{
      input.addEventListener("change", () => {
         const productId = input.getAttribute("product-id");
         const quantity = parseInt(input.value);
        //  console.log(productId);
         if(quantity>0){
            window.location.href = `/cart/update/${productId}/${quantity}`;
         }  
      })
   });
}
// Hết Cập nhật lại số lượng trong giỏ hàng