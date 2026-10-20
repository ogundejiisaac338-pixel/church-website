
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// 1. Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// 2. Dark mode and light mode
function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);

  // Remember the theme on this browser
  try {
    localStorage.setItem("church-theme", isDark ? "dark" : "light");
  } catch (error) {
    // Theme switching still works if storage is unavailable.
  }
});

// Load the saved theme
try {
  const savedTheme = localStorage.getItem("church-theme");
  applyTheme(savedTheme === "dark");
} catch (error) {
  applyTheme(false);
}

// 3. Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 4. Reveal sections as the visitor scrolls
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  // Fallback for older browsers
  revealElements.forEach(element => element.classList.add("visible"));
}



