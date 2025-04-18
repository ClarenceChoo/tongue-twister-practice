// Grab DOM nodes
const twisterEl = document.getElementById("twister");
const prevBtn   = document.getElementById("prev-btn");
const nextBtn   = document.getElementById("next-btn");
const toggleBtn = document.getElementById("theme-toggle");

let twisters = [];
let currentIndex = 0;

// Fade‑in helper
function showTwister(idx) {
  twisterEl.style.opacity = 0;
  setTimeout(() => {
    twisterEl.textContent = twisters[idx];
    twisterEl.style.opacity = 1;
  }, 200);
}

// Load the JSON file
fetch('twisters.json')
  .then(res => res.ok
    ? res.json()
    : Promise.reject('Failed to load twisters.json'))
  .then(data => {
    twisters = data;
    // Start at a random index
    currentIndex = Math.floor(Math.random() * twisters.length);
    showTwister(currentIndex);

    // Wire up Previous/Next
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + twisters.length) % twisters.length;
      showTwister(currentIndex);
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % twisters.length;
      showTwister(currentIndex);
    });

    // Theme toggle
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  })
  .catch(err => {
    console.error(err);
    twisterEl.textContent = "⚠️ Could not load tongue twisters.";
  });
