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

// Main function for product details
export default async function productDetails(productId, selector) {
  try {
    product = await findProductById(productId);
    if (product) {
      // Create breadcrumb
      const breadcrumbContainer = document.createElement('div');
      breadcrumbContainer.id = 'breadcrumbContainer'; // Customize the ID if needed
      createBreadcrumb(breadcrumbContainer, product.Category);

      // Once we have the product details, we can render the HTML
      const el = document.querySelector(selector);
      el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
      el.insertBefore(breadcrumbContainer, el.firstChild);

      // Add a listener to the "Add to Cart" button
      document.querySelector("#addToCart").addEventListener("click", function () {
        addProductToCart();
        showCartMessage();
      });

      // Add an event listener to change the main image when a color thumbnail is clicked
      document.addEventListener('click', function(event) {
        const colorThumbnail = event.target.closest('.color-thumbnail');
        if (colorThumbnail) {
          const selectedColorCode = colorThumbnail.dataset.color;
          const colorImage = product.Colors.find(color => color.ColorCode === selectedColorCode).ColorPreviewImageSrc;

          // Change the main image to the selected color
          document.querySelector('.main-product-image').src = colorImage;

          // Update the value of the hidden radio input (optional)
          const colorRadio = document.querySelector(`input[name="color"][value="${selectedColorCode}"]`);
          if (colorRadio) {
            colorRadio.checked = true;
          }
        }
      });

    } else {
      showError("Sorry, this Product was not found.", selector);
    }
  } catch (error) {
    showError("An error occurred while fetching product details.", selector);
  }
}

// Function to add the product to the cart
function addProductToCart() {
  const cart = getLocalStorage("so-cart")  
  const currentItem = cart.find(item => item.Id == product.Id)

  // Get the current cart contents
  if(currentItem){   // Check if the current item is already in the cart
    currentItem.quantity++;
    console.log("Already in Cart") 
    setLocalStorage("so-cart", cart);
      // If yes, add 1 to the quantity
  } else {
    product.quantity = 1; 
    setLocalStorage("so-cart", product);   // If not, add a quantity property to the product and insert into the cart 
    console.log("Item added");
  }
}

// Function to show the cart message
function showCartMessage() {
  const cartMessage = document.getElementById('cartMessage');
  cartMessage.style.display = 'block';

  setTimeout(function () {
    cartMessage.style.display = 'none';
  }, 3000);
}

function productDetailsTemplate(product) {
  const discount = calculateDiscount(product);

  // Create HTML for color thumbnails
  const colorThumbnailsHTML = product.Colors.map(color => `
    <img src="${color.ColorPreviewImageSrc}" alt="${color.ColorName}" class="color-thumbnail" data-color="${color.ColorCode}">
  `).join('');

  return `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="product-images">
      <div class="main-product-image-container">
        <img class="main-product-image" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />
      </div>
      <div class="color-thumbnails-container">
        ${colorThumbnailsHTML}
      </div>
    </div>
    <del class="cart-card__disccount">$${product.SuggestedRetailPrice}</del>
    <p class="product-card__price product_price">$${product.FinalPrice}</p>
    <p class="discount_price">REDUCED PRICE You Save: ${discount.percentage.toFixed(2)}%</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      <div id="cartMessage" class="hidden">Item added to the cart</div>
    </div>`;
}
