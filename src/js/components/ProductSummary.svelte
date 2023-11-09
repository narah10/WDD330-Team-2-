<script>
  import Modal from "./Modal.svelte";
  let showModal = false;
  export let product = {}
</script>

<section>
  <a href="/product_pages/index.html?product={product.Id}">
    <img src={product.Images.PrimaryMedium} alt="Image of {product.Name}" /></a>
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    <p class="product-card__price">${product.FinalPrice}</p>
    <button on:click={() => (showModal = true)} style="font-size: 1rem"> Show Details </button>
</section>


<Modal bind:showModal>
	<h3>{product.Brand.Name}</h3>
  <h2 class="divider">{product.NameWithoutBrand}</h2>
  <p class="product__color">{product.Colors[0].ColorName}</p>
  <p class="product__description">{@html product.DescriptionHtmlSimple}</p>
</Modal>