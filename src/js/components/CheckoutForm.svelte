<script>
    import {getLocalStorage, formDataToJSON} from "../utils.mjs";
    import {checkout} from "../externalServices.mjs"

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

const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };
  const handleSubmit = async function (e) {
    const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
     
  </script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <div class="checkout__name">
      <label for="fname">First Name</label>
      <input name="fname" required />
      <label for="lname">Last Name</label>
      <input name="lname" required />
    </div>
    <div class="checkout__address">
      <label for="street">Street</label>
      <input name="street" required />
      <label for="city">City</label>
      <input name="city" required />
      <label for="state">State</label>
      <input name="state" required />
      <label for="zip">Zip</label>
      <input name="zip" id="zip" required on:blur={calculateOrdertotal} />
    </div>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number</label>
    <input
      name="cardNumber"
      required
      placeholder="No spaces or dashes!"
      maxlength="16"
      minlength="16"
    />
    <label for="expiration">Expiration</label>
    <input name="expiration" required placeholder="mm/yy" />
    <label for="code">Security Code</label>
    <input name="code" required placeholder="xxx" maxlength="3" minlength="3" />
  </fieldset>
  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <ul>
      <li>
        <label for="cartTotal">Item Subtotal({list.length})</label>
        <p name="cartTotal" id="cartTotal">${itemTotal}</p>
      </li>
      <li>
        <label for="shipping">Shipping Estimate</label>
        <p id="shipping">${shipping}</p>
      </li>
      <li>
        <label for="tax">Tax</label>
        <p id="tax">${tax}</p>
      </li>
      <li>
        <label for="orderTotal"><b>Order Total</b></label>
        <p id="orderTotal">${orderTotal}</p>
      </li>
    </ul>
  </fieldset>

  <button id="checkoutSubmit" type="submit">Checkout</button>
</form>
  <!-- <form name="checkout" on:submit|preventDefault={handleSubmit}> 
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
    <button id="checkoutSubmit" type="submit">Place Order</button>
  </fieldset>
</form> -->
   