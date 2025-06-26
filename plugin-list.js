// plugin-list.js 🔌 Handles plugin filtering and sorting

// 📦 Sort plugins alphabetically on page load
window.addEventListener("DOMContentLoaded", () => {
  const pluginList = document.getElementById("plugin-list");
  const plugins = Array.from(pluginList.getElementsByTagName("li"));

  plugins.sort((a, b) => {
    const nameA = a.textContent.trim().toLowerCase();
    const nameB = b.textContent.trim().toLowerCase();
    return nameA.localeCompare(nameB);
  });

  plugins.forEach(plugin => pluginList.appendChild(plugin));
});

// 🔍 Real-time filter by plugin name
const searchInput = document.getElementById("plugin-search");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const pluginList = document.getElementById("plugin-list").getElementsByTagName("li");
    for (let li of pluginList) {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(filter) ? "flex" : "none";
    }
  });
}
