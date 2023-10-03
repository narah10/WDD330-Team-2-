import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";
import { showError } from "./errorHandling.mjs";

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
      document.querySelector("#addToCart").addEventListener("click", addProductToCart);
    } else {
      showError("Sorry, this Product was not found.", selector);
    }
  } catch (error) {
    showError("An error occurred while fetching product details.", selector);
  }
}

function addProductToCart() {
  setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product) {
  return `<h3>${product.Brand.Name}</h3>

  <h2 class="divider">${product.NameWithoutBrand}</h2>

  <img
    class="divider"
    src="${product.Image}"
    alt="${product.NameWithoutBrand}"
  />

  <p class="product-card__price">${product.FinalPrice}</p>

  <p class="product__color">${product.Colors[0].ColorName}</p>

  <p class="product__description">${product.DescriptionHtmlSimple}</p>

  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}
