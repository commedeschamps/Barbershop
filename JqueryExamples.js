// ============================================
// script.js — All Tasks (0–9)
// ============================================

// Task 0: Setup
$(document).ready(function() {
  console.log("✅ jQuery is ready!");

  // ============================================
  // Task 1: Real-time Search & Live Filter
  // ============================================
  // HTML example (place before your examples grid):
  // <input type="text" id="searchInput" placeholder="Search styles..." class="form-control mb-4">
  // <datalist id="suggestions"></datalist>

  $("#searchInput").on("keyup", function() {
    const query = $(this).val().toLowerCase();

    $(".example-card").filter(function() {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.indexOf(query) > -1);
    });
  });

  // ============================================
  // Task 2: Autocomplete Search Suggestions
  // ============================================
  const titles = [
    "Classic Gentleman's Cut", "Modern Fade", "Traditional Barber Cut",
    "Pompadour", "Crew Cut", "Luxury Beard Style",
    "Razor Fade", "Textured Crop", "Buzz Cut"
  ];

  $("#searchInput").on("input", function() {
    const val = $(this).val().toLowerCase();
    const $list = $("#suggestions");
    $list.empty();

    if (val.length > 0) {
      const matches = titles.filter(t => t.toLowerCase().includes(val));
      matches.forEach(m => $list.append(`<option value="${m}">`));
    }
  });

  // ============================================
  // Task 3: Search Highlighting
  // ============================================
  $("#searchInput").on("input", function() {
    const keyword = $(this).val().trim();
    $(".example-card h3, .example-card p").each(function() {
      const text = $(this).text();
      if (keyword.length > 0) {
        const highlighted = text.replace(
          new RegExp(`(${keyword})`, "gi"),
          "<span class='highlight'>$1</span>"
        );
        $(this).html(highlighted);
      } else {
        $(this).html(text);
      }
    });
  });

  // Add highlight CSS dynamically
  $("<style>")
    .prop("type", "text/css")
    .html(".highlight { background: yellow; color: black; font-weight: bold; }")
    .appendTo("head");

  // ============================================
  // Task 4: Scroll Progress Bar
  // ============================================
  const $progressBar = $("<div id='scrollProgress'></div>").css({
    position: "fixed",
    top: 0,
    left: 0,
    height: "6px",
    background: "linear-gradient(90deg, #ff6b35, #e55a2b)",
    width: "0%",
    zIndex: 9999
  });
  $("body").append($progressBar);

  $(window).on("scroll", function() {
    const scroll = $(window).scrollTop();
    const height = $(document).height() - $(window).height();
    const scrolled = (scroll / height) * 100;
    $("#scrollProgress").css("width", scrolled + "%");
  });

  // ============================================
  // Task 5: Animated Number Counter
  // ============================================
  // HTML example: <div class="counter" data-target="1500">0</div>

  $(".counter").each(function() {
    const $this = $(this);
    const target = +$this.attr("data-target");
    const speed = 30;
    const update = () => {
      const current = +$this.text();
      const increment = target / 100;
      if (current < target) {
        $this.text(Math.ceil(current + increment));
        setTimeout(update, speed);
      } else {
        $this.text(target);
      }
    };
    update();
  });

  // ============================================
  // Task 6: Loading Spinner on Submit
  // ============================================
  $("form").on("submit", function(e) {
    e.preventDefault();
    const $btn = $(this).find("button[type='submit']");
    const original = $btn.html();
    $btn.prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Please wait...');
    setTimeout(() => {
      $btn.prop("disabled", false).html(original);
      showToast("✅ Form submitted successfully!");
    }, 2000);
  });

  // ============================================
  // Task 7: Notification / Toast System
  // ============================================
  const $toast = $("<div id='toast'></div>").css({
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#ff6b35",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    display: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
  });
  $("body").append($toast);

  function showToast(message) {
    $toast.text(message).fadeIn(300);
    setTimeout(() => $toast.fadeOut(400), 2500);
  }

  // ============================================
  // Task 8: Copy to Clipboard Button
  // ============================================
  // Example HTML:
  // <p class="copy-text">Barbershop Elegance - Confidence in Every Cut</p>
  // <button class="copy-btn btn btn-sm btn-outline-light">Copy</button>

  $(".copy-btn").on("click", function() {
    const $text = $(this).prev(".copy-text");
    const textToCopy = $text.text();
    navigator.clipboard.writeText(textToCopy).then(() => {
      $(this)
        .html('<i class="fas fa-check"></i> Copied!')
        .prop("disabled", true);
      showToast("📋 Copied to clipboard!");
      setTimeout(() => {
        $(this)
          .html("Copy")
          .prop("disabled", false);
      }, 2000);
    });
  });

  // ============================================
  // Task 9: Lazy Loading Images
  // ============================================
  // Use: <img data-src="example1.png" class="lazy" alt="...">
  function lazyLoad() {
    $(".lazy").each(function() {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 200) {
        const src = $(this).attr("data-src");
        if (src && !$(this).attr("src")) {
          $(this).attr("src", src);
        }
      }
    });
  }
  $(window).on("scroll load", lazyLoad);
});

/* ===============================
   Examples Page Theme Toggle
=============================== */
const exampleThemeToggle = document.getElementById("exampleThemeToggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("examples-theme");

if (savedTheme === "examples-light") {
  body.classList.add("examples_light_mode");
  body.classList.remove("examples_body");
  exampleThemeToggle.innerHTML = '<i class="fa fa-moon"></i> Dark Mode';
} else {
  body.classList.add("examples_body");
  body.classList.remove("examples_light_mode");
  exampleThemeToggle.innerHTML = '<i class="fa fa-sun"></i> Light Mode';
}

// Toggle theme on click
exampleThemeToggle.addEventListener("click", () => {
  if (body.classList.contains("examples_light_mode")) {
    // Switch to dark
    body.classList.remove("examples_light_mode");
    body.classList.add("examples_body");
    localStorage.setItem("examples-theme", "dark");
    exampleThemeToggle.innerHTML = '<i class="fa fa-sun"></i> Light Mode';
  } else {
    // Switch to light
    body.classList.remove("examples_body");
    body.classList.add("examples_light_mode");
    localStorage.setItem("examples-theme", "examples-light");
    exampleThemeToggle.innerHTML = '<i class="fa fa-moon"></i> Dark Mode';
  }
});


