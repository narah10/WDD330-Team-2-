<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getProductByCategory } from "../externalServices.mjs";
  import Breadcrumb from "./Breadcrumb.svelte";
  export let category;
  let promise = getProductByCategory(category);
</script>

{#await promise}
  <p>Loading</p>
{:then loadedData}
  {#if loadedData && loadedData.length > 0}
    <Breadcrumb category="{category}" productCount="{loadedData.length}" />
    <h2>Top Products {category}</h2>
    <ul class="product-list">
      {#each loadedData as product}
        <li class="product-card"><ProductSummary {product} /></li>
      {/each}
    </ul>
  {:else}
    <p>No products found</p>
  {/if}
{/await}
