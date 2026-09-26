// ─── EDIT YOUR PROJECTS HERE ───────────────────────────────────────────────
// Add, remove, or reorder entries. `image`, `year` and `link` are optional
// (put images in /images). `category` is "full" or "project" (labels live in
// i18n.js) and drives the filter buttons above the grid.
// `description` and `tags` have an English (en) and Slovak (sk) version.
// TIP: add which platforms you used on each project to `tags`, e.g. "Bloomreach".
const PROJECTS = [
  {
    title: "ČSOB Leasing",
    year: "",
    category: "full",
    description: {
      en: "Full CRM integration built from scratch.",
      sk: "Kompletná integrácia CRM vybudovaná od nuly.",
    },
    tags: { en: ["Integration from scratch"], sk: ["Integrácia od nuly"] },
    image: "",
    link: "",
  },
  {
    title: "Powerlogy",
    year: "",
    category: "full",
    description: {
      en: "Full CRM integration built from scratch.",
      sk: "Kompletná integrácia CRM vybudovaná od nuly.",
    },
    tags: { en: ["Integration from scratch"], sk: ["Integrácia od nuly"] },
    image: "",
    link: "",
  },
  {
    title: "Dedoles",
    year: "",
    category: "full",
    description: {
      en: "Full CRM integration built from scratch.",
      sk: "Kompletná integrácia CRM vybudovaná od nuly.",
    },
    tags: { en: ["Integration from scratch"], sk: ["Integrácia od nuly"] },
    image: "",
    link: "",
  },
  {
    title: "365.bank",
    year: "",
    category: "project",
    description: {
      en: "CRM work for the bank's banking app and website.",
      sk: "Práca na CRM pre bankovú aplikáciu a web banky.",
    },
    tags: { en: ["Banking app", "Website"], sk: ["Banková aplikácia", "Web"] },
    image: "",
    link: "",
  },
  {
    title: "eyerim",
    year: "",
    category: "project",
    description: {
      en: "CRM and marketing platform work.",
      sk: "Práca s CRM a marketingovými platformami.",
    },
    tags: { en: [], sk: [] },
    image: "",
    link: "",
  },
  {
    title: "Travelking",
    year: "",
    category: "project",
    description: {
      en: "CRM and marketing platform work.",
      sk: "Práca s CRM a marketingovými platformami.",
    },
    tags: { en: [], sk: [] },
    image: "",
    link: "",
  },
  {
    title: "BILLA Slovakia",
    year: "",
    category: "project",
    description: {
      en: "CRM and marketing platform work.",
      sk: "Práca s CRM a marketingovými platformami.",
    },
    tags: { en: [], sk: [] },
    image: "",
    link: "",
  },
];

// Where the contact form sends messages (opens the visitor's email app).
const CONTACT_EMAIL = "hello@example.com";
// ────────────────────────────────────────────────────────────────────────────

const LANGS = ["en", "sk"];
const grid = document.getElementById("project-grid");
const filters = document.getElementById("filters");
let lang = "en";
let activeCategory = "all";

function t(key) {
  return TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key;
}

// Picks the current language from a { en, sk } value; plain values pass through.
function pick(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[lang] ?? value.en;
  return value;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderProjects() {
  const list = activeCategory === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);
  grid.innerHTML = list
    .map((p) => {
      const img = p.image
        ? `<img class="card-img" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">`
        : `<div class="card-img placeholder">${escapeHtml(p.title.charAt(0))}</div>`;
      const tags = (pick(p.tags) || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      const link = p.link
        ? `<a class="card-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">${escapeHtml(t("projects.view"))}</a>`
        : "";
      return `
        <article class="card">
          ${img}
          <div class="card-body">
            <span class="card-meta">${escapeHtml(t("category." + p.category))}${p.year ? ` · ${escapeHtml(p.year)}` : ""}</span>
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(pick(p.description))}</p>
            <div class="tags">${tags}</div>
            ${link}
          </div>
        </article>`;
    })
    .join("");
}

function renderFilters() {
  const categories = ["all", ...new Set(PROJECTS.map((p) => p.category))];
  filters.innerHTML = categories
    .map((c) => {
      const label = c === "all" ? t("projects.all") : t("category." + c);
      return `<button class="filter${c === activeCategory ? " active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  activeCategory = btn.dataset.cat;
  filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
  renderProjects();
});

function setLanguage(next) {
  lang = LANGS.includes(next) ? next : "en";
  document.documentElement.lang = lang;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]').setAttribute("content", t("meta.description"));
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  renderFilters();
  renderProjects();
  try { localStorage.setItem("lang", lang); } catch (_) {}
}

function initialLanguage() {
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch (_) {}
  const browser = (navigator.language || "en").toLowerCase();
  return browser.startsWith("sk") || browser.startsWith("cs") ? "sk" : "en";
}

document.querySelector(".lang-switch").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-lang]");
  if (btn) setLanguage(btn.dataset.lang);
});

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`${t("form.subject")} ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(initialLanguage());
