import MainHeader from './components/MainHeader.svelte'
import MainFooter from './components/MainFooter.svelte'
import { cartCount } from './stores.mjs';

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  let cart = getLocalStorage(key) || [];
  cart.push(data);
  localStorage.setItem(key, JSON.stringify(cart));
  cartCount.set(cart.length);
  
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function getCartCount(){
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
}

export function renderHeaderFooter(){
  new MainHeader({
    target: document.querySelector("#main-header"),
  props: { cartCount: getCartCount() },
  })
  new MainFooter({
    target:document.querySelector("#main-footer")
  })
  // itemAmountInCart();
}

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// export function itemAmountInCart(){
//   const pill = document.querySelector('.pill');
//   function updateCartCount() {
//       const getItems = getLocalStorage("so-cart");
//       if(getItems.length > 0){
//           pill.innerHTML = getItems.length;
//       } else{
//         pill.innerHTML = "";
//       }
//   }


  
//   updateCartCount();

//   setInterval(updateCartCount, 1000); 
  
// }

