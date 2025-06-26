// tax-link.js 📊 Opens the Tax Portal
window.addEventListener("DOMContentLoaded", () => {
  const taxButton = document.getElementById("open-tax-btn");
  if (taxButton) {
    taxButton.addEventListener("click", () => {
      window.open("https://minecraft2613.github.io/taxess/", "_blank");
    });
  }
});
