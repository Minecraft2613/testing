// home.js - Controls home screen sections & dynamic behavior

// Show main sections after login
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const showAfterLogin = sessionStorage.getItem("loggedIn") === "true";

  if (showAfterLogin) {
    main.style.display = "block";
    footer.style.display = "block";
  }

  // Welcome animation
  const header = document.querySelector("header h1");
  if (header) {
    header.classList.add("animate__animated", "animate__fadeInDown");
  }
});

// Copy-to-clipboard utility
function copyToClipboard(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const text = el.innerText || el.value;
  navigator.clipboard.writeText(text)
    .then(() => alert(`📋 Copied: ${text}`))
    .catch(() => alert("❌ Copy failed"));
}

// Optional: Animate scroll to anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});
