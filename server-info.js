// server-info.js 🌍 Minecraft Server Info

// Copy content from element by ID
function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert(`✅ Copied: ${text}`))
    .catch(() => alert(`❌ Failed to copy.`));
}

// Auto fill server IP and version if needed
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("java-ip").innerText = "mc1524209.fmcs.cloud";
  document.getElementById("server-port").innerText = "38762";

  const versionInfo = document.getElementById("server-version");
  if (versionInfo) {
    versionInfo.innerText = "Java 1.21.4 / Bedrock 1.21.70+ (via Geyser)";
  }
});
