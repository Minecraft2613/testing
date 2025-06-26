// menu.js - Handles sidebar menu actions

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("content-area");

  // ✅ Safe check to avoid null errors
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }

  // Close sidebar when clicking close
  const closeBtn = document.getElementById("menu-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => sidebar.classList.add("hidden"));
  }

  // Menu click handlers
  const menuActions = {
    "menu-account": showAccount,
    "menu-tax": () => window.open("https://minecraft2613.github.io/taxess/", "_blank"),
    "menu-form": () => window.open("https://minecraft2613.github.io/joining-form/", "_blank"),
    "menu-support": showSupport,
    "menu-players": showPlayers
  };

  Object.keys(menuActions).forEach(id => {
    const item = document.getElementById(id);
    if (item) {
      item.addEventListener("click", e => {
        e.preventDefault();
        sidebar.classList.add("hidden");
        menuActions[id]();
      });
    }
  });

  // Placeholder functions
  function showAccount() {
    contentArea.innerHTML = `
      <h2>👤 Account Profile</h2>
      <p>Manage your account details here.</p>
    `;
  }

  function showSupport() {
    contentArea.innerHTML = `
      <h2>📞 Support</h2>
      <p>Contact us on Discord: <strong>@Minecraft2613</strong><br>Instagram: <strong>@minecraft.2613</strong></p>
    `;
  }

  function showPlayers() {
    contentArea.innerHTML = `
      <h2>👥 Players</h2>
      <p>List of active players will appear here.</p>
    `;
  }
});
