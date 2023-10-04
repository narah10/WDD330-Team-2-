import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    const emptyCartMessage = `<p>No items in cart.</p>`;
    document.querySelector(".product-list").innerHTML = emptyCartMessage
  }
}


function setTotal() {
  const getItems = getLocalStorage("so-cart");
  
  if (getItems.length > 0) {
    let total = 0;
    let hideClass = document.querySelector(".hide");
    let cartTotal = document.querySelector(".cart-total");

    for (let i = 0; i < getItems.length; i++) {
      const firstItem = getItems[i].ListPrice;
      total += firstItem;
    }

    hideClass.classList.remove("hide");
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    console.log("length is less than 1!");
        hideClass.classList.add("hide");
  }
}
setTotal();


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>

  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();


{/* <p class="cart-card__color">${item.Colors[0].ColorName}</p> */}