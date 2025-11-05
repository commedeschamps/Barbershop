// script.js — jQuery enhancements for Assignment 7

$(document).ready(function() {
  console.log("✅ jQuery is ready!");

  /* =========================
     Part 1 – jQuery Search
  ========================== */

  // Task 1: Real-time Search and Live Filter
  const $searchInput = $('<input type="text" id="liveSearch" class="form-control mt-4" placeholder="Search reviews...">');
  $(".main-content").prepend($searchInput);

  $searchInput.on("keyup", function() {
    const value = $(this).val().toLowerCase();
    $(".review_item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
  });

  // Task 2: Autocomplete Suggestions
  const suggestions = [
    "fade", "beard", "facial", "promotion", "discount", "student", "modern cut", "treatment", "hot towel"
  ];

  const $suggestBox = $('<ul id="suggestBox" class="list-group position-absolute w-50 mt-1" style="z-index: 1000;"></ul>');
  $searchInput.after($suggestBox);

  $searchInput.on("input", function() {
    const query = $(this).val().toLowerCase();
    $suggestBox.empty();
    if (query) {
      const matches = suggestions.filter(s => s.toLowerCase().includes(query));
      matches.forEach(m => {
        $suggestBox.append(`<li class="list-group-item list-group-item-action">${m}</li>`);
      });
    }
  });

  $suggestBox.on("click", "li", function() {
    $searchInput.val($(this).text());
    $suggestBox.empty();
    $searchInput.trigger("keyup");
  });

  // Task 3: Search Highlighting
  $searchInput.on("keyup", function() {
    const keyword = $(this).val();
    $(".review_item p").each(function() {
      const text = $(this).text();
      if (keyword.length > 0) {
        const regex = new RegExp(`(${keyword})`, "gi");
        const highlighted = text.replace(regex, "<mark>$1</mark>");
        $(this).html(highlighted);
      } else {
        $(this).html(text);
      }
    });
  });


  /* =========================
     Part 2 – UX Engagement
  ========================== */

  // Task 4: Scroll Progress Bar
  const $progress = $('<div id="scrollProgress"></div>').css({
    position: "fixed",
    top: 0,
    left: 0,
    height: "6px",
    background: "linear-gradient(90deg, #ff6b35, #ffb835)",
    width: "0%",
    zIndex: 9999
  });
  $("body").append($progress);

  $(window).on("scroll", function() {
    const scrolled = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
    $progress.css("width", scrolled + "%");
  });

  // Task 5: Animated Number Counter
  const $counterSection = $('<div class="text-center mt-5"><h3> Our Achievements</h3><p><span class="counter" data-target="1000">0</span>+ Happy Clients</p></div>');
  $(".main-content").append($counterSection);

  $(window).on("scroll", function() {
    $(".counter").each(function() {
      const top = $(this).offset().top;
      const scroll = $(window).scrollTop() + $(window).height();
      if (scroll > top) {
        const $this = $(this);
        const target = +$this.attr("data-target");
        let count = 0;
        const speed = 20;
        const interval = setInterval(() => {
          if (count < target) {
            count += 10;
            $this.text(count);
          } else {
            clearInterval(interval);
          }
        }, speed);
      }
    });
  });

  // Task 6: Loading spinner on form submit
  $("#reviewForm").on("submit", function() {
    const $btn = $(this).find("button[type='submit']");
    $btn.prop("disabled", true).html('<i class="fa fa-spinner fa-spin"></i> Please wait...');
    setTimeout(() => {
      $btn.prop("disabled", false).text("Submit");
    }, 2000);
  });


  /* =========================
     Part 3 – Web App Functionality
  ========================== */

  // Task 7: Notification Toast
  const $toast = $('<div id="toast">Form submitted successfully ✅</div>').css({
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#ff6b35",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    display: "none",
    zIndex: 10000
  });
  $("body").append($toast);

  $("#reviewForm").on("submit", function() {
    $toast.fadeIn(400).delay(2000).fadeOut(400);
  });

  // Task 8: Copy to Clipboard Button
  const $copySection = $('<div class="mt-5 text-center"><p id="promoText">Use code <b>STYLE25</b> for 25% off!</p><button id="copyBtn" class="btn btn-warning mt-2" style="width: auto"><i class="fa fa-copy"></i> Copy Code</button></div>');
  $(".main-content").append($copySection);

  $("#copyBtn").on("click", function() {
    const text = $("#promoText").text();
    navigator.clipboard.writeText(text);
    $(this).html('<i class="fa fa-check"></i> Copied!');
    setTimeout(() => $(this).html('<i class="fa fa-copy"></i> Copy Code'), 1500);
  });

  // Task 9: Lazy Loading Images
  $("img[data-src]").each(function() {
    const $img = $(this);
    $(window).on("scroll", function() {
      if ($(window).scrollTop() + $(window).height() > $img.offset().top) {
        $img.attr("src", $img.data("src"));
        $img.removeAttr("data-src");
      }
    });
  });
});

/* ===============================
   Task 6 – Reviews Theme Toggle
=============================== */

const reviewThemeToggle = document.getElementById("reviewThemeToggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "reviews-light") {
  body.classList.add("reviews_light_mode");
  body.classList.remove("reviews_body");
  reviewThemeToggle.innerHTML = '<i class="fa fa-moon"></i> Dark Mode';
} else {
  body.classList.add("reviews_body");
  body.classList.remove("reviews_light_mode");
  reviewThemeToggle.innerHTML = '<i class="fa fa-sun"></i> Light Mode';
}

// Toggle theme on click
reviewThemeToggle.addEventListener("click", () => {
  if (body.classList.contains("reviews_light_mode")) {
    // Switch to dark mode
    body.classList.remove("reviews_light_mode");
    body.classList.add("reviews_body");
    localStorage.setItem("theme", "dark");
    reviewThemeToggle.innerHTML = '<i class="fa fa-sun"></i> Light Mode';
  } else {
    // Switch to light mode
    body.classList.remove("reviews_body");
    body.classList.add("reviews_light_mode");
    localStorage.setItem("theme", "reviews-light");
    reviewThemeToggle.innerHTML = '<i class="fa fa-moon"></i> Dark Mode';
  }
});
