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

const clickSound = new Audio('ExamplesClick.mp3'); // place click.mp3 in same folder

button.addEventListener('click', () => {
  clickSound.currentTime = 0; // restart if spam-clicked
  clickSound.play().catch(err => console.log('Sound blocked until user interaction'));
});

// Allow users to change background using Arrow keys
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      currentIndex = (currentIndex + 1) % backgrounds.length;
      break;
    case 'ArrowLeft':
      currentIndex = (currentIndex - 1 + backgrounds.length) % backgrounds.length;
      break;
    default:
      return;
  }
  applyBg(currentIndex);
  localStorage.setItem('bgIndex', String(currentIndex));
});

// Add animation when button is clicked
button.addEventListener('click', () => {
  button.style.transform = 'scale(1.1)';
  setTimeout(() => button.style.transform = 'scale(1)', 200);
});
});
