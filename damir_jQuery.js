$(document).ready(function(){ 
      console.log("jQuery is ready!");
});  




$(".search_products").filter((text) => {
    if($(".container_products_pr").contains(text)){
        $(".search_products").show("HEre!");
    }
});
