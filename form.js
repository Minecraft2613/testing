// form.js 📩 Opens the Joining Bonus Form
window.addEventListener("DOMContentLoaded", () => {
  const formBtn = document.getElementById("open-form-btn");
  if (formBtn) {
    formBtn.addEventListener("click", () => {
      window.open("https://minecraft2613.github.io/joining-form/", "_blank");
    });
  }
});
