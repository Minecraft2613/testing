// menu.js — Sidebar and Navigation Handling

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.getElementById("hamburger");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  window.openSection = function (sec) {
    const navList = [
      "server-info",
      "server-status",
      "plugin-list",
      "profile",
      "support",
      "players"
    ];

    navList.forEach((s) => {
      const el = document.getElementById(s);
      if (el) el.classList.add("hidden");
    });

    const active = document.getElementById(sec);
    if (active) active.classList.remove("hidden");

    if (sidebar) sidebar.classList.remove("open");
  };
});
