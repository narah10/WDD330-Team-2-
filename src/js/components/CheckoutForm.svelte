<script>
    import {getLocalStorage} from "../utils.mjs";
    export let key = " ";

    let list = [];
    let itemTotal = 0;
    let shipping = 0;
    let tax = 0;
    let orderTotal = 0;



    function init(){
        list = getLocalStorage(key);
        calculateItemSummary()
        calculateOrdertotal()

    }
    
    function calculateItemSummary(){
    const getItems = getLocalStorage("so-cart");

    if (getItems.length > 0) {
        for (let i = 0; i < getItems.length; i++) {
            const firstItem = getItems[i].ListPrice;
            itemTotal += firstItem; 
        }
    }
}

    const calculateOrdertotal = function () {
        shipping = 10 + (list.length - 1) * 2;
        tax = (itemTotal * 0.06).toFixed(2);
        orderTotal = (
      parseFloat(itemTotal) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
    console.log(itemTotal, shipping, tax)
};
init()
     
  </script>
  
  <fieldset class="checkout-summary">
    <legend>Shipping</legend>
    <form class="form-content">
        <label>First Name</label>
        <input type="text"  name="fname"/>
        <label>Last Name</label>
        <input type="text"  name="lname" />
        <label>Street</label>
        <input type="text"  name="street"/>
        <label>State</label>
        <input type="text"  name="state" />
        <label>Zip</label>
        <input type="text"  name="zip"/>
      </form>
      </fieldset>
      <fieldset> 
        <legend>Payment</legend>

      <form class="form-content" > 
        <label>Card Number</label>
        <input type="text" name="cardNumber"/>
        <label>Expiration</label>
        <input type="text"  name="expiration" />
        <label>Security Code</label>
        <input type="text"  name="code"/>
    </form>
</fieldset>
<fieldset class="orderSummary"> 
    <legend>Order Summary</legend>
    <p>Subtotal ({list.length}) {itemTotal}  </p>
    <p>Shipping Estimate ${shipping}</p>
    <p>Tax ${tax}</p>
    <p>Order Total: ${orderTotal} </p>
    <button> Place Order</button>
  </fieldset>
   