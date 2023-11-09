<script>
  import Breadcrumb from "./Breadcrumb.svelte";
  import Search from "./Search.svelte";
  export let category;
  let productCount
</script>
    <Breadcrumb category="{category}" productCount="{productCount}" />
    <Search category="{category}" bind:length={productCount}></Search>
