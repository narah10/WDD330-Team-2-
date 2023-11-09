import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { showError } from "./errorHandling.mjs";
import { calculateDiscount } from "./product";
import { cartCount } from "./stores.mjs";

// Function to create breadcrumb
function createBreadcrumb(container, category) {
  const categoryName = category.replace('-', ' ')
  const breadcrumbText = getBreadcrumbText(categoryName);
  
  if (breadcrumbText) {
    const breadcrumbElement = document.createElement('nav');
    breadcrumbElement.classList.add('breadcrumb');
    breadcrumbElement.innerHTML = breadcrumbText;

    container.appendChild(breadcrumbElement);

    // Convert breadcrumb words to links
    const links = container.querySelectorAll('.breadcrumb a');
    links.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const href = this.getAttribute('href');
        // You may handle the navigation logic based on the href value
        window.location.href = href;
      });
    });
  }
}

// Function to get breadcrumb text
function getBreadcrumbText(category) {
  if (category) {
    return `<a href="/">Home</a>
            &nbsp;>&nbsp;
            <a href="/product_list/index.html?category=${category}">${category}</a>`;
  } else {
    return '';
  }
}

let product = {};

export default async function productDetails(productId, selector) {
  try {
    product = await findProductById(productId);
    if (product) {
      // Create Breadcrumb
      const breadcrumbContainer = document.createElement('div');
      breadcrumbContainer.id = 'breadcrumbContainer'; // You may customize the ID
      createBreadcrumb(breadcrumbContainer, product.Category);

      // Once we have the product details, we can render out the HTML
      const el = document.querySelector(selector);
      el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
      el.insertBefore(breadcrumbContainer, el.firstChild);

      // Add a listener to the "Add to Cart" button
      document.querySelector("#addToCart").addEventListener("click", function () {
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
  const cart = getLocalStorage("so-cart")  
  const currentItem = cart.find(item => item.Id == product.Id)
  // get the current cart contents
    if(currentItem){   // Check to see if current item is already in the cart
      currentItem.quantity++;
      console.log("already in Cart") 
      setLocalStorage("so-cart", cart);
        // if yes then add 1 to quantity
    }else{
      product.quantity = 1; 
      setLocalStorage("so-cart", product);   // else add a quantity property to the product and insert into the cart 
    // and insert into the cart 
      console.log("item-added");
    }

  // setLocalStorage("so-cart", product);
  // console.log("item-added");
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
  <p class="discount_price">REDUCED PRICE You Save: ${discount.percentage.toFixed(2)}%</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    <div id="cartMessage" class="hidden">Item added to the cart</div>
  </div>`;
}
