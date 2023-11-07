<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductByCategory } from "../externalServices.mjs";
    export let category;
    let promise = getProductByCategory(category);
  </script>
  
  {#await promise}
    <p>Loading</p>
  {:then loadedData}
    {#if loadedData && loadedData.length > 0}
      <h2 style='text-align: center'>Other Customers Also Liked These Products</h2>
      <ul class="product-list">
        {#each loadedData.slice(0, 3) as product}
          <li class="product-card"><ProductSummary {product} /></li>
        {/each}
      </ul>
    {:else}
      <p>No products found</p>
    {/if}
  {/await}
  