<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";
  import { calculateDiscount } from "../product.js";

  export let category;

  let promise = getData(category);
  
</script>

<h2>Top Products {category}</h2>
{#await promise}
  <p>Loading</p>
{:then data}
  <ul class="product-list">
    {#each data as product}
      {#if product}
        <li class="product-card">
          <ProductSummary {product} />
          <p>Discount: {calculateDiscount(product).percentage.toFixed(2)}%</p>
        </li>
      {/if}
    {/each}
  </ul>
{/await}

<style>
  .product-card p{
    position: relative;
    background-color: rgb(194, 194, 23);
    padding: 0.5rem;
    border-radius: 15px;
    text-align: center;
    font-weight: bold;
  }
</style>

