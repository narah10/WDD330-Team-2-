<script>
    import { getLocalStorage } from "../utils.mjs";
    const cartItems = getLocalStorage("so-cart");
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
  
    <p class="cart-card__quantity">qty: 1</p>
    <del class="cart-card__retail__price">${item.SuggestedRetailPrice}</del>
    <p class="cart-card__price">${item.FinalPrice}</p>
    <button class="cart-card__remove" data-id="{item.Id}">Remove</button>
</li>
{/each}
</ul>
