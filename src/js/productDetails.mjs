import { findProductById } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";
import { showError } from "./errorHandling.mjs";
import { calculateDiscount } from "./product";
import { cartCount } from "./stores.mjs";
// import { renderHeaderFooter } from "./utils.mjs";


let product = {};

export default async function productDetails(productId, selector) {
  // Use findProductById to get the details for the current product. findProductById will return a promise.
  try {
    product = await findProductById(productId);
    if (product) {
      // Once we have the product details, we can render out the HTML
      const el = document.querySelector(selector);
      el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
      // Add a listener to the "Add to Cart" button
      document.querySelector("#addToCart").addEventListener("click", function() {
        addProductToCart();
        showCartMessage();
      });
    } else {
      showError("Sorry, this Product was not found.", selector);
    }
  } catch (error) {
    showError("An error occurred while fetching product details.", selector);
  }
}


function addProductToCart() {
  setLocalStorage("so-cart", product);
  console.log("item-added");
  // cartCount.set(product.length);
  // if(product = 0){
  //   console.log("empty")
  // }
}

function showCartMessage() {
  const cartMessage = document.getElementById('cartMessage');
  cartMessage.style.display = 'block';

  setTimeout(function () {
    cartMessage.style.display = 'none';
  }, 3000);
}

function productDetailsTemplate(product) {
  const discount = calculateDiscount(product);
  return `<h3>${product.Brand.Name}</h3>

  <h2 class="divider">${product.NameWithoutBrand}</h2>

  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.NameWithoutBrand}"
  />

  <del class="cart-card__disccount">$${product.SuggestedRetailPrice}</del>
  <p class="product-card__price product_price">$${product.FinalPrice}</p>
  <p class="discount_price">REDUCED PRICE Yous Save: ${discount.percentage.toFixed(2)}%</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    <div id="cartMessage" class="hidden">Item added to the cart</div>
  </div>`;
}
// renderHeaderFooter();


