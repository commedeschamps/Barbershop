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
    $("#notificationProducts").show("slow")
      .delay(3000)
      .hide("slow");
});





let night = $("#night");
let light = $("#light")

let night_light = [night, light];
let counter_night_light = 0;

light.hide();

let select = night_light[0];
select.show();

$("#change_term").click( () => {
    select.hide();

    select = night_light[counter_night_light];
    counter_night_light = (counter_night_light + 1) % night_light.length;

    console.log(select);
    select.show();

    if(select == night){
        $('body').css('background', '#1a1a1a');
        $('h1').css('color', 'white');
        $('p').css('color', 'white');
        $('b').css('color', 'white');
        $('i').css('color', 'white');
    }else{
        $('body').css('background', '#FFCD94');
        $('a').find('p').css('color', 'white');
        $('h1').css('color', '#1a1a1a');
        $('p').css('color', '#1a1a1a');
        $('b').css('color', '#1a1a1a');
        $('i').css('color', '#1a1a1a');
        $('.navbar_color').css('background', 'linear-gradient(to right,  #000000 25%,#d42b1f 100%)')
    }
})
