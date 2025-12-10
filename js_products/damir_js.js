let menu_pr = document.querySelector('.menu_products');
let navbar_pr = document.querySelector('#nav_products_sb');

menu_pr.onclick = () => {
    menu_pr.classList.toggle('clicked');
    navbar_pr.classList.toggle('show'); 
}
        





// document.getElementById('changeBgColor').addEventListener('click', change_bg_color);
// let body_color = document.querySelector('body');

// let colors = ['#1a1a1a', '#2a2a2a', '#3a3a3a', '#4a5a4b', '#730a5cff'];
// let counter = 0;


// function change_bg_color(){
//     body_color.style.background = colors[counter];
//     counter = (counter + 1) % colors.length;
// };

// let sound1 = new Audio('sound-1.mp3');

// document.getElementById('changeBgColor').addEventListener("click", () => {
//     sound1.play();
// });








let other_lang = {
    "kazakh" : 
    {
        "product_1" : 
            "Біздің кәсіби шашты сәндеуге арналған паста шашыңызға күшті, бірақ икемді ұстайтын табиғи күңгірт жабын береді. Күнделікті сәндеу үшін мінсіз, ол сіздің шаш үлгісін қатты немесе майлы қылмай орнында сақтайды. Жеңіл формуланы қолдану оңай, оңай жуылады және қысқа және орташа ұзындықтағы шаштар үшін тамаша жұмыс істейді. Күні бойы шашыңызды сау және сәнді ұстау үшін нәрлендіретін ингредиенттермен байытылған.",
        "product_2":
            "Ерлер терісіне арналған ылғалдандыратын және тыныштандыратын крем. Ылғалдандырады, құрғақтықты азайтады және теріні балғын және сау көріністе қалдырады. Қырынудан кейінгі күнделікті күтімге өте ыңғайлы.",
        "product_3":
            "Барлық шаш түрлеріне арналған кәсіби формула. Шашты нәрлендіріп және нығайта отырып, жұмсақ тазартады. Сау, табиғи жылтыр үшін тегістейтін ингредиенттермен байытылған. Шашты жұмсақ, сергітетін және сәндеуді жеңілдететін етеді — заманауи мырзалар үшін тамаша таңдау."
    },
    "russian": 
    {
        "product_1" :
            "Наша профессиональная паста для укладки волос придаёт вашим волосам естественный матовый оттенок и обеспечивает сильную, но гибкую фиксацию. Идеально подходит для ежедневной укладки, фиксируя причёску, не делая её жёсткой и жирной. Лёгкая формула легко наносится и смывается, идеально подходит как для коротких, так и для волос средней длины.",
        "product_2":
            "Увлажняющий и успокаивающий крем для мужской кожи. Обеспечивает увлажнение, уменьшает сухость и дарит коже свежий и здоровый вид. Идеально подходит для ежедневного ухода после бритья.",
        "product_3":
            "Moisturizing and soothing cream designed for men's skin. Provides hydration, reduces dryness, and leaves the skin fresh and healthy-looking. Perfect for daily care after shaving"

    },
    "english":
    {
        "product_1" :
            "Our professional hair styling paste gives your hair a natural matte finish with strong yet flexible hold. Ideal for everyday styling, it keeps your hairstyle in place without making it stiff or greasy. The lightweight formula is easy to apply, washes out effortlessly, and works perfectly for both short and medium-length hair. Enriched with nourishing ingredients to keep your hair healthy and stylish all day long.",
        "product_2":
            "Moisturizing and soothing cream designed for men's skin. Provides hydration, reduces dryness, and leaves the skin fresh and healthy-looking. Perfect for daily care after shaving",
        "product_3":
            "A professional formula designed for all hair types. Gently cleanses while nourishing and strengthening the hair. Enriched with smoothing ingredients for a healthy, natural shine. Leaves hair soft, refreshed, and easy to style — the perfect choice for modern gentlemen."
    }
};





const button = document.querySelectorAll('.Flag_button');
console.log(button);

button.forEach(el => {
    el.addEventListener("click", () => {
        const attr = el.getAttribute('language');

        document.getElementById('pr1_text').innerHTML = other_lang[attr].product_1;
        document.getElementById('pr2_text').innerHTML = other_lang[attr].product_2;
        document.getElementById('pr3_text').innerHTML = other_lang[attr].product_3;

    });

});









