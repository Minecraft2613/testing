// server.js — Minecraft Server Info + Status (Modern UI 🌐🎮)

const SERVER_IP = "mc1524209.fmcs.cloud";
const SERVER_PORT = "38762";
const STATUS_API = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

// ✅ Utility: Copy-to-clipboard with feedback
function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.createElement("div");
    btn.textContent = "✅ Copied: " + text;
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 10px 16px;
      border-radius: 10px;
      font-size: 14px;
      box-shadow: 0 0 12px rgba(0,0,0,0.4);
      z-index: 9999;
      animation: fadeOut 3s ease forwards;
    `;
    document.body.appendChild(btn);
    setTimeout(() => btn.remove(), 3000);
  });
}

// ✅ Fetch server status
async function fetchServerStatus() {
  const statusEl = document.getElementById("server-status");
  const playersEl = document.getElementById("player-count");
  const offlinePanel = document.getElementById("offline-start");

  try {
    const res = await fetch(STATUS_API);
    const data = await res.json();

    if (!data || typeof data.online === "undefined") {
      showStatus("⚠️ Error getting status", "gray");
      return;
    }

    if (data.online) {
      showStatus("🟢 Server is Online", "green");
      playersEl.innerHTML = `👥 Players Online: <strong>${data.players.online}/${data.players.max}</strong>`;
      offlinePanel.style.display = "none";
    } else {
      showStatus("🔴 Server is Offline", "red");
      playersEl.textContent = "";
      offlinePanel.style.display = "block";
    }

  } catch (err) {
    console.error("❌ Status error:", err);
    showStatus("❌ Could not connect to server", "gray");
  }

  function showStatus(msg, color) {
    statusEl.innerHTML = `<span style="color:${color}; font-weight:bold;">${msg}</span>`;
  }
}

// ⏲️ Check every 3 seconds
window.addEventListener("DOMContentLoaded", () => {
  fetchServerStatus();
  setInterval(fetchServerStatus, 3000);
});
