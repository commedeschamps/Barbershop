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
        "description" : 
            "Біздің кәсіби шашты сәндеуге арналған паста шашыңызға күшті, бірақ икемді ұстайтын табиғи күңгірт жабын береді. Күнделікті сәндеу үшін мінсіз, ол сіздің шаш үлгісін қатты немесе майлы қылмай орнында сақтайды. Жеңіл формуланы қолдану оңай, оңай жуылады және қысқа және орташа ұзындықтағы шаштар үшін тамаша жұмыс істейді. Күні бойы шашыңызды сау және сәнді ұстау үшін нәрлендіретін ингредиенттермен байытылған."
    },
    "russian": 
    {
        "description" :
            "Наша профессиональная паста для укладки волос придаёт вашим волосам естественный матовый оттенок и обеспечивает сильную, но гибкую фиксацию. Идеально подходит для ежедневной укладки, фиксируя причёску, не делая её жёсткой и жирной. Лёгкая формула легко наносится и смывается, идеально подходит как для коротких, так и для волос средней длины."
    },
    "english":
    {
        "description" :
            "Our professional hair styling paste gives your hair a natural matte finish with strong yet flexible hold. Ideal for everyday styling, it keeps your hairstyle in place without making it stiff or greasy. The lightweight formula is easy to apply, washes out effortlessly, and works perfectly for both short and medium-length hair. Enriched with nourishing ingredients to keep your hair healthy and stylish all day long."
    }
};





const button = document.querySelectorAll('.Flag_button');
console.log(button);

button.forEach(el => {
    el.addEventListener("click", () => {
        const attr = el.getAttribute('language');

        document.getElementById('pr1_text').innerHTML = other_lang[attr].description;
    });

});









