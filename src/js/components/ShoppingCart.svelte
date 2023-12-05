<script>
  import { getLocalStorage,setLocalStorage } from "../utils.mjs";
  let cartItems = getLocalStorage("so-cart");
  

  let cartRetail = 0;
  let cartDiscount = 0;
  let cartTotal = 0; 
  let total = 0;
  let retailTotal = 0

  //When added to cart, it registers the first click in the cart total 
  // but it doesn't register it for the product details. first click is messing it up 
  //total not being saved
  //Doing the math for both items each time instead of the one clicked  

  function setTotal() {
    cartTotal = 0;
    total = 0; 
    cartRetail = 0;
    cartDiscount = 0;
    retailTotal = 0
      for (let i = 0; i < cartItems.length; i++) {
        const firstItem = cartItems[i].ListPrice;
        total += firstItem  * cartItems[i].quantity;
        cartTotal = total;
        console.log("total " + total+ " " + "firstItem " + firstItem);
        console.log(cartItems[i].ListPrice)
      }

      for (let i = 0; i < cartItems.length; i++) {
        const firstItem = cartItems[i].SuggestedRetailPrice; 
        retailTotal += firstItem * cartItems[i].quantity;
      }
          cartRetail = retailTotal;
          cartDiscount = ((retailTotal - total) / retailTotal) * 100;
          cartTotal = total; 

        }

   
  function removeTotal(){ 
         cartTotal = 0;
         total = 0; 
         cartRetail = 0;
        cartDiscount = 0;
         retailTotal = 0
          for (let i = cartItems.length - 1; i >= 0; i--) {
              const firstItem = cartItems[i].ListPrice;
              total += firstItem  * cartItems[i].quantity;

              cartTotal = total;

          }

          for (let i = 0; i < cartItems.length; i++) {
        const firstItem = cartItems[i].SuggestedRetailPrice; 
        retailTotal += firstItem * cartItems[i].quantity;
      }
          cartRetail = retailTotal;
          cartDiscount = ((retailTotal - total) / retailTotal) * 100;
          cartTotal = total; 
  }


  function addQuantity () {
    const currentItem = cartItems.find(item => item.Id == this.dataset.id)
        if(!currentItem.quantity) 
          { currentItem.quantity = 1;
           }
        else{ currentItem.quantity= currentItem.quantity + 1; 
            }

        cartItems = [...cartItems];
 
        setTotal()
        setLocalStorage("so-cart", cartItems)
        }

  function removeQuantity () {
      const currentItem = cartItems.find(item => item.Id == this.dataset.id)
      if (currentItem.quantity > 1) {
      currentItem.quantity = currentItem.quantity - 1; 
      cartItems = [...cartItems];
      removeTotal()
      setLocalStorage("so-cart", cartItems); 

      }
    }
  
setTotal()



</script>
<ul class="product-list">
{#each cartItems as item}

<li class="cart-card divider">
    <a href="/product_pages/index.html?productid={item.Id}" class="cart-card__image">
      <img
        src={item.Image}
        alt={item.Name}
      />
    </a>
    <a href="/product_pages/index.html?productid={item.Id}">
      <h2 class="card__name">{item.Name}</h2>
    </a>
    <div>
      <button class="addQ" data-id={item.Id} on:click={addQuantity}> + </button>
    <p class="quantity">Qty: {item.quantity?item.quantity: 1}</p>
    <button class="removeQ" data-id={item.Id} on:click={removeQuantity}> - </button>

  </div>

    <del class="cart-card__retail__price">${item.quantity? (item.SuggestedRetailPrice * item.quantity).toFixed(2): item.SuggestedRetailPrice}</del>
    <p class="cart-card__price amount">${item.quantity? (item.FinalPrice * item.quantity).toFixed(2): item.FinalPrice.toFixed(2)}</p>
    <button class="cart-card__remove" data-id="{item.Id}">Remove</button>
</li>
{/each}
</ul>

<div>
  <p class="cart-retail">Total Retail Price: ${cartRetail.toFixed(2)}</p>
</div>
<div>
  <p class="cart-discount">Total Discount: {cartDiscount? cartDiscount.toFixed(1): cartDiscount = 0}%</p>
</div>
<div class="cart-footer hide"><p class="cart-total">Total: ${cartTotal.toFixed(2)}</p></div>
