import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";
let product = {};

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  // add a listener to Add to Cart button
 document.querySelector("#addToCart").addEventListener("click", addProductToCart);
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
    <button id="addToCart" data-id="344YJ">Add to Cart</button>
    </div>`
}
