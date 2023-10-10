import ProductList from "./components/ProductList.svelte";
import { itemAmountInCart } from "./utils.mjs";


new ProductList({
    target: document.querySelector(".products"),
    props: { category: "tents" },
});

itemAmountInCart(); 