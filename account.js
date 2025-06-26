// account.js — Login/Create + Cloudflare Sync

const ENDPOINT = "https://minecraft-details-acc.1987sakshamsingh.workers.dev/";
const loginEl = document.getElementById("login-section");
const mainEl = document.getElementById("main-content");

function showMain() {
  loginEl.classList.add("hidden");
  mainEl.classList.remove("hidden");
}

function setupForm() {
  const f = document.createElement("form");
  f.innerHTML = `
    <h2>🔐 Login / Create</h2>
    <input id="u" placeholder="Username" required>
    <input id="aid" placeholder="Account ID" required>
    <input id="dis" placeholder="Discord (opt)">
    <input id="inst" placeholder="Instagram (opt)">
    <label><input type="checkbox" id="agree"> Agree rules</label>
    <button type="submit" id="btn" disabled>✅ Submit</button>
  `;
  loginEl.appendChild(f);
  f.querySelector("#agree").onchange = e => f.querySelector("#btn").disabled = !e.target.checked;

  f.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      username: f.u.value.trim(),
      accountId: f.aid.value.trim(),
      discord: f.dis.value.trim(),
      instagram: f.inst.value.trim()
    };
    if (!data.username||!data.accountId) return alert("Enter required");
    try {
      const res = await fetch(ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      if(!res.ok) throw '';
      localStorage.setItem("user", data.username);
      sessionStorage.setItem("loggedIn","true");
      showMain();
    } catch {
      alert("Sync failed");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("loggedIn")==="true") showMain();
  else setupForm();
});
