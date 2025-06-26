document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("menu-close");
  const taxBtn = document.getElementById("menu-tax");
  const formBtn = document.getElementById("menu-form");
  const playersBtn = document.getElementById("menu-players");
  const supportBtn = document.getElementById("menu-support");
  const accountBtn = document.getElementById("menu-account");

  if (menuToggle && sidebar && closeBtn) {
    // Open sidebar
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });

    // Close sidebar
    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("hidden");
    });

    // Open Tax Portal in new tab
    taxBtn.addEventListener("click", () => {
      window.open("https://minecraft2613.github.io/taxess/", "_blank");
    });

    // Open Joining Form in new tab
    formBtn.addEventListener("click", () => {
      window.open("https://minecraft2613.github.io/joining-form/", "_blank");
    });

    // Support options
    supportBtn.addEventListener("click", () => {
      alert("📞 Contact us on:\nDiscord: @Ansh_2613\nInstagram: @minecraft_2613");
    });

    // Players list (can be replaced with custom player list HTML)
    playersBtn.addEventListener("click", () => {
      document.getElementById("content-area").innerHTML = `
        <h2>👥 Active Players</h2>
        <ul>
          <li>Player1</li>
          <li>Player2</li>
          <li>Player3</li>
          <!-- Replace with dynamic list if needed -->
        </ul>
      `;
    });

    // Account section (loads login/profile UI)
    accountBtn.addEventListener("click", () => {
      document.getElementById("content-area").innerHTML = `
        <h2>👤 Account</h2>
        <p>Manage your profile, update details, or logout.</p>
        <button onclick="location.reload()">🔁 Re-login</button>
      `;
    });
  } else {
    console.warn("Some sidebar elements not found in DOM.");
  }
});
