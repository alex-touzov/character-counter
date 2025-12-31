document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("textInput");
  const charCountEl = document.getElementById("charCount");
  const wordCountEl = document.getElementById("wordCount");
  const tokenCountEl = document.getElementById("tokenCount");
  const themeToggle = document.getElementById("themeToggle");

  const formatNumber = (value) => {
    return Number(value).toLocaleString("en-US");
  };

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    themeToggle.checked = theme === "dark";
  };

  const storedTheme = localStorage.getItem("cc-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const initialTheme = storedTheme || (prefersDark.matches ? "dark" : "light");
  applyTheme(initialTheme);

  prefersDark.addEventListener("change", (event) => {
    const userChoice = localStorage.getItem("cc-theme");
    if (userChoice) return;
    applyTheme(event.matches ? "dark" : "light");
  });

  themeToggle.addEventListener("change", () => {
    const nextTheme = themeToggle.checked ? "dark" : "light";
    localStorage.setItem("cc-theme", nextTheme);
    applyTheme(nextTheme);
  });

  const updateCounts = () => {
    const text = input.value;
    const characters = text.length;

    // Words are whitespace-separated strings where the alphanumeric core is > 2 chars
    const trimmed = text.trim();
    const words =
      trimmed === ""
        ? []
        : trimmed.split(/\s+/).filter((word) => {
            const core = word.replace(/[^A-Za-z0-9]/g, "");
            return core.length > 2;
          });

    const tokens = Math.round(characters * 0.25);

    charCountEl.textContent = formatNumber(characters);
    wordCountEl.textContent = formatNumber(words.length);
    tokenCountEl.textContent = formatNumber(tokens);
  };

  input.addEventListener("input", updateCounts);
  updateCounts();
  input.focus();
});

