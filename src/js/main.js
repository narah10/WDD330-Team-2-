import ProductList from "./components/ProductList.svelte";
import Alert from "./components/Alert.svelte";
import { renderHeaderFooter } from "./utils.mjs";
import { alerts } from '../alert/alert.json';

new ProductList({
    target: document.querySelector(".products"),
    props: { category: "tents" },
});
if(alerts != null){
    new Alert({
        target: document.querySelector("#alert-list")
    });
}

renderHeaderFooter();