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
    

let button = false;

function change_bg_color(el){
    el.style.background = "#2a2a2a";
}


let date = document.getElementById("pr_date").innerHTML = "Date: <br>" + Date();

document.getElementById('purchase_form_id').addEventListener('submit', checkSubmit)

function checkSubmit(event){
    event.preventDefault();
    let el = document.getElementById('purchase_form_id');

    let cardNumber = el.cardNumber.value;
    let cvv = el.cvv.value;
    let date_purchase = el.date_purchase.value;

    

}


