// menu.js – Sidebar toggle and navigation handling

// Elements
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const contentOverlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll(".menu-link");

// Toggle sidebar
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  contentOverlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
});

// Hide sidebar when overlay clicked
contentOverlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  contentOverlay.style.display = "none";
});

// Navigation logic
menuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      sidebar.classList.remove("open");
      contentOverlay.style.display = "none";
    }
  });
});
