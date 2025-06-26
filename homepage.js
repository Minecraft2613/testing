// homepage.js — Server Info, Status, Plugins, Players

function fetchServerInfo() {
  const info = document.getElementById("server-info");
  info.innerHTML = `
    <h2>🌐 Server Info</h2>
    <p><strong>IP:</strong> mc1524209.fmcs.cloud</p>
    <p><strong>Port:</strong> 38762</p>
    <button onclick="copyText('mc1524209.fmcs.cloud')">📋 Copy IP</button>
  `;
}

async function fetchServerStatus() {
  const s = document.getElementById("server-status");
  s.innerHTML = "<h2>📈 Status</h2><p>Checking...</p>";
  try {
    const r = await fetch("https://api.mcsrvstat.us/2/mc1524209.fmcs.cloud");
    const d = await r.json();
    s.innerHTML = d.online
      ? `<p>🟢 Online — ${d.players.online}/${d.players.max})</p>`
      : `<p>🔴 Offline</p>`;
  } catch { s.innerHTML = `<p>❌ Error</p>`; }
}

function loadPlugins() {
  const ul = document.getElementById("plugin-list");
  ul.innerHTML = `<h2>🔌 Plugins</h2><input id="plugsrch" placeholder="Search...">`;
  const plugins = ["LuckPerms","Vault","EssentialsX","CoreProtect"];
  const list = document.createElement("ul");
  plugins.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `${p} <a href="#" class="btn">Info</a>`;
    list.appendChild(li);
  });
  ul.appendChild(list);
  document.getElementById("plugsrch").oninput = e => {
    const f = e.target.value.toLowerCase();
    list.querySelectorAll("li").forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(f) ? "" : "none";
    });
  };
}

function loadPlayers() {
  const pl = document.getElementById("players");
  pl.innerHTML = "<h2>🧑‍🤝‍🧑 Players</h2><ul id='plist'></ul>";
  const user = localStorage.getItem("user");
  pl.querySelector("#plist").innerHTML = `<li>${user}</li>`;
}

function copyText(t) {
  navigator.clipboard.writeText(t).then(_ => alert("Copied"));
}

window.addEventListener("DOMContentLoaded", () => {
  fetchServerInfo();
  fetchServerStatus();
  loadPlugins();
  loadPlayers();
});
