import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  //first grab the current localstorage 
  let currentCart = getLocalStorage("so-cart");
  //check to see if the currentCart is an array and if it is not, assign an empty array
  if (!Array.isArray(currentCart)) {
    currentCart = [];
  }
  //now push the added product to the array currentCart
  currentCart.push(product)
  //update the local storage to have the newest cart data
  setLocalStorage("so-cart", currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
