// account.js – Login / Create Account & Cloudflare Sync

const updateMode = false; // Maintenance toggle
const allowedUsername = "Ansh_2613"; // Admin override
const CLOUDFLARE_ENDPOINT = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/"; // Cloudflare Worker endpoint

const loginSection = document.getElementById("login-section");
const mainContent = document.getElementById("main-content");
const loginForm = document.createElement("form");
loginForm.id = "login-form";

loginForm.innerHTML = `
  <h2>🔐 Login or Create Account</h2>
  <input type="text" id="username" placeholder="FreeMcServer Username" required><br>
  <input type="text" id="accountId" placeholder="Account ID (for new users)" required><br>
  <input type="text" id="discord" placeholder="Discord ID (optional)"><br>
  <input type="text" id="instagram" placeholder="Instagram (optional)"><br>
  <label>
    <input type="checkbox" id="agreeCheck"> I agree to the <a href="https://minecraft2613.github.io/Minecarft-2613-Rules/" target="_blank">rules</a>
  </label>
  <br><button type="submit" id="loginBtn" disabled>🔓 Submit</button>
`;

loginSection.appendChild(loginForm);

// Enable submit only when rules are agreed
loginForm.querySelector("#agreeCheck").addEventListener("change", e => {
  loginForm.querySelector("#loginBtn").disabled = !e.target.checked;
});

loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const accountId = document.getElementById("accountId").value.trim();
  const discord = document.getElementById("discord").value.trim();
  const instagram = document.getElementById("instagram").value.trim();

  if (!username || !accountId) return alert("Username and ID required");
  if (updateMode && username !== allowedUsername) return showUpdateScreen();

  const accountData = { username, accountId, discord, instagram };

  // Save to localStorage
  localStorage.setItem("freemc_username", username);
  sessionStorage.setItem("loggedIn", "true");

  try {
    const res = await fetch(CLOUDFLARE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accountData)
    });

    if (!res.ok) throw new Error("Cloudflare sync failed");
    showMainContent();
  } catch (err) {
    alert("❌ Failed to sync with server. Try again later.");
    console.error(err);
  }
});

function showMainContent() {
  loginSection.style.display = "none";
  mainContent.style.display = "block";
}

function showUpdateScreen() {
  document.body.innerHTML = `
    <div style="text-align:center; padding:60px;">
      <h2>🚧 Website is Under Maintenance</h2>
      <p>Please check back later.</p>
    </div>`;
}

// Auto-login if session exists
window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("freemc_username");
  const loggedIn = sessionStorage.getItem("loggedIn");

  if (updateMode && username !== allowedUsername) return showUpdateScreen();

  if (username && loggedIn === "true") {
    showMainContent();
  } else {
    loginSection.style.display = "block";
    mainContent.style.display = "none";
  }
});
