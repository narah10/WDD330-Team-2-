<script>
    import { onMount } from 'svelte';
    import ProductSummary from "./ProductSummary.svelte";
    import { getSearchResults, getProductByCategory } from "../externalServices.mjs";
    export let category;
    export let length;
    let promise = getProductByCategory(category);
    let input;
    
    async function determineLength() {
        const data = await promise;
        length = data.length
    }
    onMount(() => {
        determineLength()
        input.addEventListener('input', e => {
            const value = e.target.value;
            promise = getSearchResults(category, value)
            determineLength()
        })
    })
</script>


<section class="searchBar">
    <label for="search">Search Products:</label>
    <input type="text" bind:this="{input}" id="search" name="search" placeholder="EX: Down Sleeping Bag">
</section>
{#await promise}
  <p>Loading</p>
{:then loadedData}
  {#if loadedData && loadedData.length > 0}
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