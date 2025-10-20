document.getElementById('purchase_form_id').addEventListener("submit", checkSubmit);

function checkSubmit(event){
    event.preventDefault();

    let el = document.getElementById('purchase_form_id');
    let cardNumber = el.cardNumber.value;
    let cvv = el.cvv.value;
    // let date_purchase = el.date_purchase.value;

    let fail = "";

    if(cardNumber == "" || cvv == ""){
        fail = "Fil all field!";
        document.getElementById('cardNumber').innerHTML = fail;
        document.getElementById('cvv').innerHTML = fail;
        document.getElementById('date_purchase').innerHTML = fail;
    }
    else if(cardNumber.length < 16 || /\p{L}/u.test(cardNumber)){
        fail = "Fill card number correctly!";
        document.getElementById('cardNumber').innerHTML = fail;
    }
    else if(cvv.length > 3 || /\p{L}/u.test(cvv)){
        fail = "CVV is not correct!";
        document.getElementById('cvv').innerHTML = fail;
    }


    
    // if(fail != ""){
    //     document.getElementById('error').innerHTML = fail;
    // }
    // else{
    //     alert("Succesfully bought!");
    // }
}