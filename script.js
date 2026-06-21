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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a[href^='#']");

function setActiveNavLink() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);
/* scroll progress bar */
const scrollProgress = document.getElementById("scroll-progress");

if (scrollProgress) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

/* subtle hero parallax on the ambient node layer */
const heroBg = document.querySelector(".hero-bg svg");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (heroBg && !prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const offset = window.scrollY;
      if (offset < 900) {
        heroBg.style.transform = `translateY(${offset * 0.12}px)`;
      }
    },
    { passive: true }
  );
}