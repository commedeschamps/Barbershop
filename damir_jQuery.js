$(document).ready(function(){ 
      console.log("jQuery is ready!");
});  





$(".searching_form_prodcuts").on("submit", (event) =>{
    event.preventDefault();

    let item_pr = $(".item_pr b").text();
    let splitWords = item_pr.split(" ");
    let inputValue = $(".input_field").val();

    splitWords.forEach((elem) => {
        if(inputValue == elem){
            $(".item_pr b").slideToggle("slow");
        }
    })
    
});


const name_of_products = {
    names: ["Hair Styling Paste", "Face Cream", "Premium Hair Shampoo"]
};



$(".input_field").on("input", (e) => {
    e.preventDefault();

    const inputValue = e.target.value;

    let output_search = $(".input_field");

    
});



$(window).on("scroll", () => {
    let scroll = $(window).scrollTop();
    let dh = $(document).height();
    let wh = $(window).height();
    let value = (scroll / (dh-wh)) * 100;
    $('#progress').css('width', value + '%');

});

