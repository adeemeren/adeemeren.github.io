const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  body.classList.remove("dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});
const languageToggle = document.getElementById("language-toggle");
const translatableElements = document.querySelectorAll("[data-tr][data-en]");

const savedLanguage = localStorage.getItem("language") || "tr";

function setLanguage(language) {
  translatableElements.forEach((element) => {
    const translatedText = element.getAttribute(`data-${language}`);

    if (translatedText) {
      element.innerHTML = translatedText;
    }
  });

  document.documentElement.lang = language;
  localStorage.setItem("language", language);

  languageToggle.textContent = language === "tr" ? "TR / EN" : "EN / TR";
}

setLanguage(savedLanguage);

languageToggle.addEventListener("click", () => {
  const currentLanguage = localStorage.getItem("language") || "tr";
  const newLanguage = currentLanguage === "tr" ? "en" : "tr";

  setLanguage(newLanguage);
});

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);