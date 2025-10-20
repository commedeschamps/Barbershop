const popup = document.getElementById("popupForm");
const openBtn = document.getElementById("openFormBtn");
const closeBtn = document.getElementById("closePopup");

openBtn.addEventListener("click", () => popup.style.display = "flex");
closeBtn.addEventListener("click", () => popup.style.display = "none");

// 1. Play Sound Effect on Form Submit
const successSound = new Audio("ReviewsSuccess.mp3"); 

document.getElementById("reviewForm").addEventListener("submit", function (e) {
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
    successSound.play(); 
    alert(`Thank you, ${name.value.trim()}! Your review was submitted successfully.`);
    this.reset();
    popup.style.display = "none";
  }
});

// 2. Keyboard Event Handling (Escape closes popup)
window.addEventListener("keydown", e => {
  if (e.key === "Escape" && popup.style.display === "flex") {
    popup.style.display = "none";
  }
});

// 3. Switch Statement Example — Greeting Based on Time
function greetingMessage() {
  const hour = new Date().getHours();
  let greeting;
  switch (true) {
    case (hour < 12):
      greeting = "Good morning, welcome to Barbershop Elegance!";
      break;
    case (hour < 18):
      greeting = "Good afternoon! Ready for a fresh style?";
      break;
    default:
      greeting = "Good evening! Time for a clean look.";
  }
  document.querySelector(".p_reviews").textContent = greeting;
}
greetingMessage();

// 4. Render Reviews Dynamically (Objects + Arrays + Loops + forEach)
const reviews = [
  { name: "John D.", text: "Best barbershop I’ve ever been to! The fade was sharp and the atmosphere classy.", rating: 5 },
  { name: "Michael S.", text: "Love the beard shaping services – my go-to spot every month.", rating: 5 },
  { name: "Alex K.", text: "Relaxing facial treatment, great staff, and professional service.", rating: 5 },
  { name: "David R.", text: "Booked the Father & Son promotion – my kid loved it! Definitely coming back.", rating: 5 },
  { name: "Chris T.", text: "The hot towel shave was next level. Left feeling refreshed and sharp.", rating: 5 },
  { name: "Ethan L.", text: "Stylish modern cut, exactly like the photo I showed. 10/10 experience.", rating: 5 },
  { name: "Robert P.", text: "Super chill vibe, great music, and professional barbers. Highly recommend.", rating: 5 },
  { name: "Daniel M.", text: "Tried the anti-stress treatment – totally worth it after a long week at work.", rating: 5 },
  { name: "Anthony G.", text: "These guys know beards! Perfect shape and care advice for daily routine.", rating: 5 },
  { name: "Steven W.", text: "Best experience in town. Clean place, skilled barbers, and fair prices.", rating: 5 },
  { name: "Mark B.", text: "Booked online, quick and easy. The whole process was smooth and professional.", rating: 5 },
  { name: "Leo J.", text: "Came in with a rough beard, left with a masterpiece. Great job!", rating: 5 },
  { name: "Tom H.", text: "The student discount is a lifesaver. Top-notch cuts at a good price.", rating: 5 }
];

const reviewContainer = document.querySelector(".reviews-container");
reviewContainer.innerHTML = ""; // clear static HTML
reviews.forEach(r => {
  const div = document.createElement("div");
  div.className = "review_item";
  div.innerHTML = `
    <h5 class="h5_in_review">${r.name}</h5>
    <div class="stars">${"★".repeat(r.rating)}</div>
    <p>${r.text}</p>
  `;
  reviewContainer.appendChild(div);
});

// 5. Simple Animation Trigger
document.getElementById("openFormBtn").addEventListener("click", () => {
  popup.style.opacity = "0";
  popup.style.display = "flex";
  setTimeout(() => popup.style.opacity = "1", 100);
});
