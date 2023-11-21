<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getProductByCategory } from "../externalServices.mjs";
  import { onMount } from 'svelte';

  export let category;
  let promise = getProductByCategory(category);

  function setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getObject(key) {
    var storage = localStorage,
      value = storage.getItem(key);
    return value && JSON.parse(value);
  }

  function clearStorage() {
    localStorage.clear();
  }

  let name = '';
  let comment = '';
  let cmtList = getObject('cmtlist') || [];

  // Clear input fields and local storage
  function clearComment() {
    comment = '';
    name = '';
    clearStorage();
    bindCmt();
  }

  function saveComment() {
    cmtList.push({ name, text: comment });
    setObject('cmtlist', cmtList);
    bindCmt(); // Call bindCmt after saving the comment
  }

  function bindCmt() {
    cmtList = getObject('cmtlist') || [];
  }

  // Get the comments on page ready
  onMount(bindCmt);
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


  <div>
    

    <div id="dtext">
      <h4 class="h4-comment">Your comment</h4>
      <div>
      <input class="comment-section" bind:value={name} type="text" maxlength="32" size="20" placeholder="Name" />
      <br />
      <textarea bind:value={comment} class="textbox" rows="6" placeholder="Your comment"></textarea>
      </div>
      <div class="button-container-comment">
      <button class="navbutton" on:click={saveComment}>Save Comment</button>
      <button class="navbutton" on:click={clearComment}>Clear Comment</button>
      </div>
    </div>

    <h4>Comments</h4>
    <div id="cmtlist">
      {#each cmtList as { name, text }}
        <p>
          <span>{name}</span>
          {text}
        </p>
      {/each}
    </div>
  </div>

  