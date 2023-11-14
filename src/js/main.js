import ProductList from "./components/ProductList.svelte";
import Alert from "./components/Alert.svelte";
import { renderHeaderFooter } from "./utils.mjs";
import { alerts } from '../alert/alert.json';

// new ProductList({
//     target: document.querySelector(".products"),
//     props: { category: "tents" },
// });
if(alerts != null){
    new Alert({
        target: document.querySelector("#alert-list")
    });
}

renderHeaderFooter();

function checkVisit(){
    if(!localStorage.getItem('lastvisit')){
        localStorage.setItem('lastvisit', Date.now()); 
        firstTimeVisit();
    } 
    else{
       console.log('not first visit')
    }};
    checkVisit();
    
    
    function firstTimeVisit(){
    
    window.addEventListener("load", function(){
        setTimeout(
            function open(event){
                document.querySelector(".popup").style.display = "block";
            },
            1000
        )
    });
    document.querySelector("#close").addEventListener("click", function(){
        document.querySelector(".popup").style.display = "none";
    });
    
    document.querySelector('.pButton').addEventListener("click", function(){
        document.querySelector(".popup").style.display = "none";
    });
    }


// Show modal class when click button of Sign Up
document.getElementById('signup-button').addEventListener('click', function() {
    document.getElementById('signup-modal').style.display = 'block';
  });
  
  // Hide when "x" is clicked
  document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('signup-modal').style.display = 'none';
  });
  
  // Hide when is click outside the div modal
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('signup-modal')) {
      document.getElementById('signup-modal').style.display = 'none';
    }
  });

  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    alert(`Welcome, ${name}! You have successfully signed up.`);
    document.getElementById('signup-modal').style.display = 'none';
  });
  