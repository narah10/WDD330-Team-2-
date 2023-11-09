<script>
  export let category;
  export let productName;
  export let productCount;

  let showBreadcrumb = false;
  const categoryName = category.replace('-', ' ')
  
  // Determine if breadcrumb should be displayed
  $: showBreadcrumb = category || productName;
  
  // function getBreadcrumbText() {
  //   if (productName) {
  //     return `${categoryName} > ${productName} (${productCount} items)`;
  //   } else if (categoryName) {
  //     return `${categoryName} > (#${productCount})`;
  //   } else {
  //     return '';
  //   }
  // }
</script>

{#if showBreadcrumb}
  <nav class="breadcrumb">
    {#if category}
      <a href="/">Home</a>
      &nbsp;>&nbsp;
      <a href="/product_list/index.html?category={category}" class="category-name">{categoryName}</a>
      ({productCount} items)
      {/if}
  </nav>
{/if}

<style>
  .breadcrumb {
    /* background-color: #f8f9fa; */
    padding: 10px;
    margin-bottom: 20px;
  }

  .breadcrumb a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }

  .category-name {
    text-transform: capitalize;
  }
  /* .breadcrumb p {
    margin: 0;
    font-size: 14px;
    color: #495057;
  } */
</style>
