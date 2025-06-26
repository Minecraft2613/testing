// account.js - Login/Create + Cloudflare Sync

const CLOUDFLARE_ENDPOINT = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/";
const updateMode = false;
const allowedUsername = "Ansh_2613";

function setupAccountForm() {
  const loginSection = document.getElementById("login-section");
  const form = document.createElement("form");
  form.id = "login-form";
  form.innerHTML = `
    <h2>🔐 Login or Create Account</h2>
    <input type="text" id="username" placeholder="FreeMcServer Username" required><br>
    <input type="text" id="accountId" placeholder="Account ID (for new users)" required><br>
    <input type="text" id="discord" placeholder="Discord ID (optional)"><br>
    <input type="text" id="instagram" placeholder="Instagram (optional)"><br>
    <label><input type="checkbox" id="agreeCheck"> I agree to the <a href="https://minecraft2613.github.io/Minecarft-2613-Rules/" target="_blank">rules</a></label>
    <br><button type="submit" id="loginBtn" disabled>🔓 Submit</button>
  `;
  loginSection.appendChild(form);

  document.getElementById("agreeCheck").addEventListener("change", e => {
    document.getElementById("loginBtn").disabled = !e.target.checked;
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const accountId = document.getElementById("accountId").value.trim();
    const discord = document.getElementById("discord").value.trim();
    const instagram = document.getElementById("instagram").value.trim();

    if (!username || !accountId) return alert("Username and ID required");
    if (updateMode && username !== allowedUsername) return showUpdateNotice();

    const data = { username, accountId, discord, instagram };
    localStorage.setItem("freemc_username", username);
    sessionStorage.setItem("loggedIn", "true");

    try {
      await fetch(CLOUDFLARE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      showMainUI();
    } catch (err) {
      alert("❌ Sync failed. Try again later.");
    }
  });
}

function showUpdateNotice() {
  document.body.innerHTML = `<div style="text-align:center;padding:60px;"><h2>🚧 Under Maintenance</h2><p>Only staff can access right now.</p></div>`;
}

function showMainUI() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("main-content").style.display = "block";
  document.getElementById("form-sidebar")?.classList.add("show");
}

window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("freemc_username");
  const ok = sessionStorage.getItem("loggedIn") === "true";

  if (updateMode && user !== allowedUsername) return showUpdateNotice();
  if (user && ok) return showMainUI();

  setupAccountForm();
});
