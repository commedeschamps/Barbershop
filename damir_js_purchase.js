document.getElementById('purchase_form_id').addEventListener("submit", (event) => {
    event.preventDefault();


    let cardNumber = document.getElementById('cardNumber').value;
    let cvv = document.getElementById('cvv').value;

    let fail = "";
    let fail_cardNumber = "";
    let fail_cvv = "";

    if(cardNumber === "" || cvv === ""){
        fail = "Fill all fileds!!";
        document.getElementById('error').innerHTML = fail;
    }
    else if(/\p{L}/u.test(cardNumber)){
        fail_cardNumber = "Fill card number correctly!";
        document.getElementById('cardNumberError').innerHTML = fail_cardNumber;
    }
    else if(/\p{L}/u.test(cvv)){
        fail_cvv = "Fill cvv correctly";
        document.getElementById('cvvError').textContent = fail_cvv;
    }
    else{
        location.reload();
    }

});




