let menu_pr = document.querySelector('.menu_products');
let navbar_pr = document.querySelector('#nav_products_sb');

menu_pr.onclick = () => {
    menu_pr.classList.toggle('clicked');
    navbar_pr.classList.toggle('show'); 
}
        

    



function change_bg_color(el){
    el.style.background = "#2a2a2a";
}



// let date = document.getElementById("pr_date").innerHTML = "Date: <br>" + Date();



let other_lang = {
    "kazakh" : 
    {
        "description" : 
            "Біздің кәсіби шашты сәндеуге арналған паста шашыңызға күшті, бірақ икемді ұстайтын табиғи күңгірт жабын береді. Күнделікті сәндеу үшін мінсіз, ол сіздің шаш үлгісін қатты немесе майлы қылмай орнында сақтайды. Жеңіл формуланы қолдану оңай, оңай жуылады және қысқа және орташа ұзындықтағы шаштар үшін тамаша жұмыс істейді. Күні бойы шашыңызды сау және сәнді ұстау үшін нәрлендіретін ингредиенттермен байытылған."
    },
    "russian": 
    {
        "description" :
            "Наша профессиональная паста для укладки волос придаёт вашим волосам естественный матовый оттенок и обеспечивает сильную, но гибкую фиксацию. Идеально подходит для ежедневной укладки, фиксируя причёску, не делая её жёсткой и жирной. Лёгкая формула легко наносится и смывается, идеально подходит как для коротких, так и для волос средней длины. Обогащена питательными компонентами, которые сохранят ваши волосы здоровыми и стильными в течение всего дня."
    },
    "english":
    {
        "description" :
            "Our professional hair styling paste gives your hair a natural matte finish with strong yet flexible hold. Ideal for everyday styling, it keeps your hairstyle in place without making it stiff or greasy. The lightweight formula is easy to apply, washes out effortlessly, and works perfectly for both short and medium-length hair. Enriched with nourishing ingredients to keep your hair healthy and stylish all day long."
    }
};



// document.getElementsByClassName('Flag_button').addEventListener("click", changeToKz);

const button = document.querySelectorAll('.Flag_button');
console.log(button);

button.forEach(el => {
    el.addEventListener("click", () => {
        const attr = el.getAttribute('language');

        document.getElementById('pr1_text').innerHTML = other_lang[attr].description;
    });

});





