import ProductList from "./components/ProductList.svelte";
import Alert from "./components/Alert.svelte";
import { getParam } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import { alerts } from '../alert/alert.json';


renderHeaderFooter();
const category = getParam("category");

new ProductList({
    target: document.querySelector(".products"),
    props: { category: category }, 
}); 

if(alerts != null){
    new Alert({
        target: document.querySelector("#alert-list")
    });
}



// function checkVisit(){
//     if(!localStorage.getItem('lastvisit')){
//         localStorage.setItem('lastvisit', Date.now()); 
//         firstTimeVisit();
//     } 
//     else{
//        console.log('not first visit')
//     }};
//     checkVisit();
    
    
//     function firstTimeVisit(){
    
//     window.addEventListener("load", function(){
//         setTimeout(
//             function open(event){
//                 document.querySelector(".popup").style.display = "block";
//             },
//             1000
//         )
//     });
//     document.querySelector("#close").addEventListener("click", function(){
//         document.querySelector(".popup").style.display = "none";
//     });
    
//     document.querySelector('.pButton').addEventListener("click", function(){
//         document.querySelector(".popup").style.display = "none";
//     });
//     }