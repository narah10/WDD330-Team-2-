import productDetails from "./productDetails.mjs";
import { getParam } from "./utils.mjs";
import product from '../public/json/tents.json';
import { renderHeaderFooter } from "./utils.mjs";

renderHeaderFooter();
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }
const productId = getParam("product");
productDetails(productId, ".product-detail");

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
  // .addEventListener("click", addToCartHandler);

export function calculateDiscount(product) {
let suggestedPrice = product.SuggestedRetailPrice;
let finalPrice = product.FinalPrice;

let discountValue = suggestedPrice - finalPrice;
let discountPercentage = (discountValue / suggestedPrice) * 100;

return {
    percentage: discountPercentage
    
};
}
