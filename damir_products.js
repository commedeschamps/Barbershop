let menu_pr = document.querySelector('.menu_products');
let navbar_pr = document.querySelector('#nav_products_sb');

menu_pr.onclick = () => {
    menu_pr.classList.toggle('clicked');
    navbar_pr.classList.toggle('show'); 
}
        
const myButton = document.querySelector('.nav_item_pr');

myButton.addEventListener('click', () => {
    myButton.classList.toggle('active');
});
    


function change_bg_color(el){
    el.style.background = "#2a2a2a";
}


document.getElementById("pr_date").innerHTML = Date();

