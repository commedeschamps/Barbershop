$(document).ready(function(){ 
      console.log("jQuery is ready!");
});  







$(window).on("scroll", () => {
    let scroll = $(window).scrollTop();
    let dh = $(document).height();
    let wh = $(window).height();
    let value = (scroll / (dh-wh)) * 100;
    $('#progress').css('width', value + '%');

});




$(document).ready(() =>{
    $("#notificationProducts").show("slow")
      .delay(2000)
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
        $('.navbar_color').css('background', 'linear-gradient(to right,  #000000 25%,#d42b1f 100%)');
        $('body').css('background', '#1a1a1a');
        $('h1').css('color', 'white');
        $('p').css('color', 'white');
        $('b').css('color', 'white');
        $('i').css('color', 'white');
    }else{
        light.css('transition', 'transform 0.2s ease-out');
        $('body').css('background', '#FFCD94');
        $('a').css('color', 'white');
        $('h1').css('color', '#1a1a1a');
        $('p').css('color', '#1a1a1a');
        $('b').css('color', '#1a1a1a');
        $('i').css('color', '#1a1a1a');
        $('.navbar_color').css('background', 'linear-gradient(to right,  #edac6eff 25%,#d42b1f 100%)');
        $('#nav_products_sb').css('background', 'linear-gradient(to right,  #edac6eff 25%,#d42b1f 100%)');
    }
})



$(() => {
    if($(window).width() < 667){
        $('.menu_products').click(() => {
            console.log("Showing");
        })
    }
});