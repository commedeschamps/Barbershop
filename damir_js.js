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

document.getElementById('purchase_form_id').addEventListener("submit", checkSubmit)

function checkSubmit(event){
    event.preventDefault();
    let el = document.getElementById('purchase_form_id');

    let cardNumber = el.cardNumber.value;
    let cvv = el.cvv.value;
    // let date_purchase = el.date_purchase.value;

    let fail = "";

    if(cardNumber == "" || cvv == ""){
        fail = "Fil all field!";
        // document.getElementById('cardNumber').innerHTML = error;
        // document.getElementById('cvv').innerHTML = error;
        // document.getElementById('date_purchase').innerHTML = error;
    }else if(cardNumber < 16 || /\p{L}/u.test(cardNumber)){
        fail = "Fill card number correctly!";
        // document.getElementById('cardNumber').innerHTML = error;
    }else if(cvv.length > 3 || /\p{L}/u.test(cvv)){
        fail = "CVV is not correct!";
        // document.getElementById('cvv').innerHTML = error;
    }

    if(fail != ""){
        document.getElementById('fail').innerHTML = fail;
    }else{
        alert("Succesfully bought!");
    }



}


