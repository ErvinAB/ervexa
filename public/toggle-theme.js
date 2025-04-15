const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const themeIcon = document.getElementById("theme-icon");

function updateIcon(isDark) {
  if (themeIcon) themeIcon.textContent = isDark ? "🌙" : "🌞";
}

if (savedTheme === "dark") {
  html.classList.add("dark");
  updateIcon(true);
} else {
  updateIcon(false);
}

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateIcon(isDark);
});
