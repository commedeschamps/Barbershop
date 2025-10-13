document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.examples_body');
  const button = document.getElementById('colorToggleBtn');

  if (!body || !button) {
    console.error('Required elements not found: .examples_body or #colorToggleBtn');
    return;
  }

  const backgrounds = [
    "repeating-linear-gradient(135deg, #1a1a1a, #1a1a1a 25px, #111 25px, #111 50px)", // Default pattern
    "linear-gradient(-45deg, #1a1a1a, #2a2a2a, #111, #333)",                         // Smooth dark gradient
    "radial-gradient(circle at top left, #ff6b35, #1a1a1a 70%)",                    // Orange accent
    "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"                             // Blue metallic tone
  ];

  let currentIndex = parseInt(localStorage.getItem('bgIndex'), 10);
  if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= backgrounds.length) {
    currentIndex = 0;
  }

  function applyBg(index) {
    body.style.background = backgrounds[index];
    body.style.transition = body.style.transition || 'background 800ms ease';
    button.innerText = `Change Background (${index + 1}/${backgrounds.length})`;
  }

  applyBg(currentIndex);

 button.addEventListener('click', () => {
  console.log("🎨 Button clicked!");
  currentIndex = (currentIndex + 1) % backgrounds.length;
  applyBg(currentIndex);
  localStorage.setItem('bgIndex', String(currentIndex));
});
});


const popup = document.getElementById("popupForm");
const openBtn = document.getElementById("openFormBtn");
const closeBtn = document.getElementById("closePopup");

openBtn.addEventListener("click", () => popup.style.display = "flex");
closeBtn.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === popup) popup.style.display = "none";
});

document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = true;
  document.querySelectorAll(".error-msg").forEach(msg => msg.textContent = "");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (name.value.trim() === "") {
    name.nextElementSibling.textContent = "Name is required.";
    valid = false;
  }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email.value)) {
    email.nextElementSibling.textContent = "Invalid email format.";
    valid = false;
  }
  if (password.value.length < 6) {
    password.nextElementSibling.textContent = "Password must be at least 6 characters.";
    valid = false;
  }
  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.textContent = "Passwords do not match.";
    valid = false;
  }

  if (valid) {
    alert("Form submitted successfully!");
    this.reset();
    popup.style.display = "none";
  }
});

