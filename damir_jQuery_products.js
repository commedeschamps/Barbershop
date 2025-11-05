$(document).ready(function(){ 
      console.log("jQuery is ready!");
});  





$(".searching_form_prodcuts").on("submit", (event) =>{
    event.preventDefault();

    let item_pr = $(".item_pr b").text();
    let splitWords = item_pr.split(" ");
    let inputValue = $(".input_field").val();
    let search_res = $(".search_res");

    splitWords.forEach((elem) => {
        if(inputValue == elem){
            search_res = elem;
            $(".search_res").slideToggle("slow");
        }
    })
    
});


const name_of_products = [
    "Hair Styling Paste", 
    "Face Cream", 
    "Premium Hair Shampoo"
];




$(".input_field").on("keyup", (e) => {
    let result = [];

    const inputValue = $(".input_field").val();

    if(inputValue.length){
        result = name_of_products.filter((keyword) => {
            return keyword.toLowerCase().includes(inputValue.toLowerCase())
        });
        console.log(result);
    }
    display(result); 
});


function display(result){
    const content = result.map((list) => {
        return "<li>"+ list + "</li>";
    });
    $(".search_res").append("<ul>" + content.join('') + "</ul>");

}



$(window).on("scroll", () => {
    let scroll = $(window).scrollTop();
    let dh = $(document).height();
    let wh = $(window).height();
    let value = (scroll / (dh-wh)) * 100;
    $('#progress').css('width', value + '%');

});




$(document).ready(() =>{
    $("#notificationProducts").show("fast")
      .delay(3000)
      .hide("slow");

});
