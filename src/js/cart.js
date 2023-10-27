import { getLocalStorage } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte"

renderHeaderFooter();

new ShoppingCart({ 
  target: document.querySelector(".products")
})

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    const emptyCartMessage = `<p>No items in cart.</p>`;
    document.querySelector(".product-list").innerHTML = emptyCartMessage;
  }
}

export function setTotal() {
  const getItems = getLocalStorage("so-cart");
  let cartRetail = document.querySelector(".cart-retail");
  let cartDiscount = document.querySelector(".cart-discount");
  let cartTotal = document.querySelector(".cart-total");
  let hideClass = document.querySelector(".hide");

  if (getItems.length > 0) {
    let total = 0;
    let retailTotal = 0;

    for (let i = 0; i < getItems.length; i++) {
      const firstItem = getItems[i].ListPrice;
      total += firstItem;
    }

    for (let i = 0; i < getItems.length; i++) {
      const firstItem = getItems[i].SuggestedRetailPrice;
      retailTotal += firstItem;
    }
    let discountAmount = ((retailTotal - total) / retailTotal) * 100;
    hideClass.classList.remove("hide");
    cartRetail.innerHTML = `Total Retail Price: <del>$${retailTotal.toFixed(
      2
    )}<\del>`;
    cartDiscount.innerHTML = `Total Discount: ${discountAmount.toFixed(0)}%`;
    cartTotal.innerHTML = `Final Price: $${total.toFixed(2)}`;
    // const finalTotal = total.toFixed(2);
    // return finalTotal; 
  } else {
    hideClass.classList.add("hide");
  }
}
setTotal();

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>

//   <p class="cart-card__quantity">qty: 1</p>
//   <del class="cart-card__retail__price">$${item.SuggestedRetailPrice}</del>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
//   <button class="cart-card__remove" data-id="${item.Id}">Remove</button>
//   </li>`;
//   return newItem;
// }

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("cart-card__remove")) {
    const itemId = event.target.dataset.id;
    removeFromLocalStorage("so-cart", itemId);
    renderCartContents();
    this.location.reload();
  }
});

function removeFromLocalStorage(key, itemId) {
  let cartItems = getLocalStorage(key) || [];
  const indexToRemove = cartItems.findIndex((item) => item.Id === itemId);
  if (indexToRemove !== -1) {
    cartItems.splice(indexToRemove, 1);
    localStorage.setItem(key, JSON.stringify(cartItems));
  }
}

renderCartContents();
