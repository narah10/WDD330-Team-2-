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
  let cartTotal = document.querySelector(".cart-total");
  let hideClass = document.querySelector(".hide");
  
  if (getItems.length > 0) {
    let total = 0;

    for (let i = 0; i < getItems.length; i++) {
      const firstItem = getItems[i].ListPrice;
      total += firstItem;
    }

    hideClass.classList.remove("hide");
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
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
  <button class="cart-card__remove" data-id="${item.Id}">Remove</button>
  </li>`;
  return newItem;
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('cart-card__remove')) {
    const itemId = event.target.dataset.id;
    removeFromLocalStorage("so-cart", itemId);
    renderCartContents();
    this.location.reload()
  }
});

function removeFromLocalStorage(key, itemId) {
  let cartItems = getLocalStorage(key) || [];
  const indexToRemove = cartItems.findIndex(item => item.Id === itemId);
  if (indexToRemove !== -1) {
    cartItems.splice(indexToRemove, 1);
    localStorage.setItem(key, JSON.stringify(cartItems));
  }
}

renderCartContents();
