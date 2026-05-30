(() => {
  const html = document.documentElement;

  const themeBtn = document.getElementById("themeToggle");
  const langBtn  = document.getElementById("langToggle");
  const layoutToggle = document.getElementById("layoutToggle");
  const printToggle  = document.getElementById("printToggle");
  const backHomeBtn = document.getElementById("backHomeBtn");

  const layoutModal = document.getElementById("layoutModal");
  const layoutGrid  = document.getElementById("layoutGrid");
  const paletteGrid = document.getElementById("paletteGrid");
  const layoutClose = document.getElementById("layoutClose");
  const layoutActiveLabel = document.getElementById("layoutActiveLabel");
  const printFlow = document.getElementById("printFlow");
  const cvWrapper = document.getElementById("cvWrapper");

  const fabPrint  = document.getElementById("fabPrint");
  const fabLayout = document.getElementById("fabLayout");

  const accentRow = document.getElementById("accentRow");
  const colorSection = document.getElementById("colorSection");
  const layoutSection = document.getElementById("layoutSection");
  const styleTabColors = document.getElementById("styleTabColors");
  const styleTabLayouts = document.getElementById("styleTabLayouts");

  const UI_TEXT = {
    vi: {
      brandKicker: "CV tương tác",
      brandMeta: "Bố cục linh hoạt, xem trên web gọn và in PDF dễ dàng",
      backHome: "Trang chủ",
      themeLight: "Chế độ: Sáng",
      themeDark: "Chế độ: Tối",
      color: "Màu sắc",
      layout: "Bố cục",
      print: "In / PDF",
      fabPrint: "In / PDF",
      fabLayout: "Tùy chỉnh",
      langLabel: "EN",
      langTitle: "Chuyển sang tiếng Anh",
      layoutPickerTitle: "Chọn giao diện",
      layoutPickerSub: "Bố cục, palette và màu nhấn",
      layoutSection: "Chọn bố cục",
      paletteSection: "Chọn palette",
      accentSection: "Màu nhấn",
      close: "Đóng",
      byPalette: "Theo palette",
      split: "Chia cột",
      stacked: "Xếp dọc",
      wideRight: "Cột phải rộng",
      lightTone: "Sáng",
      darkTone: "Tối",
      activeLabel: "Đang dùng"
    },
    en: {
      brandKicker: "Interactive CV",
      brandMeta: "Flexible layout, polished for web viewing and PDF export",
      backHome: "Home",
      themeLight: "Mode: Light",
      themeDark: "Mode: Dark",
      color: "Colors",
      layout: "Layout",
      print: "Print / PDF",
      fabPrint: "Print / PDF",
      fabLayout: "Customize",
      langLabel: "VI",
      langTitle: "Switch to Vietnamese",
      layoutPickerTitle: "Customize CV",
      layoutPickerSub: "Layout, palette, and accent color",
      layoutSection: "Choose layout",
      paletteSection: "Choose palette",
      accentSection: "Accent color",
      close: "Close",
      byPalette: "By palette",
      split: "Split",
      stacked: "Stacked",
      wideRight: "Wide right",
      lightTone: "Light",
      darkTone: "Dark",
      activeLabel: "Active"
    }
  };

  const FIXED_NAME = "Hoàng Văn Khải";

  const ICON = {
    phone: `<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4.75A1.75 1.75 0 0 1 3.75 3.0h2.04c.86 0 1.6.6 1.76 1.46l.39 2.16c.09.48-.11.97-.52 1.25l-1.02.68a.75.75 0 0 0-.27.92 11.3 11.3 0 0 0 5.81 5.81.75.75 0 0 0 .92-.27l.68-1.02c.28-.41.77-.61 1.25-.52l2.16.39c.85.15 1.46.9 1.46 1.76v2.04A1.75 1.75 0 0 1 19.25 20h-1.5C9.7 20 4 14.3 4 7.75v-1.5Z"/></svg>`,
    email: `<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 5 8-5"/></svg>`,
    website: `<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`,
    github: `<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.63 22.43c.57.1.77-.24.77-.55v-2.03c-3.14.68-3.8-1.51-3.8-1.51-.52-1.33-1.27-1.68-1.27-1.68-1.04-.7.08-.69.08-.69 1.15.08 1.75 1.2 1.75 1.2 1.03 1.77 2.7 1.26 3.35.96.1-.75.4-1.26.72-1.55-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.45-2.25 1.2-3.04-.12-.3-.52-1.5.12-3.12 0 0 .98-.31 3.2 1.17a11.1 11.1 0 0 1 5.82 0c2.22-1.48 3.2-1.17 3.2-1.17.64 1.62.24 2.82.12 3.12.75.79 1.2 1.8 1.2 3.04 0 4.36-2.64 5.31-5.16 5.6.41.35.78 1.05.78 2.12v3.14c0 .31.2.66.78.55A11.5 11.5 0 0 0 12 .5Z"/></svg>`
  };


  function initialsFromName(name) {
    const words = String(name || FIXED_NAME || "HK")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const first = words[0]?.[0] || "H";
    const last = words.length > 1 ? words[words.length - 1]?.[0] : words[0]?.[1] || "K";
    return (first + last).toUpperCase();
  }

  function initialsAvatarDataUri(name) {
    const initials = initialsFromName(name);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#0f172a"/><stop offset="1" stop-color="#0ea5e9"/></linearGradient></defs><rect width="240" height="240" rx="44" fill="url(#g)"/><circle cx="188" cy="46" r="72" fill="rgba(255,255,255,.14)"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="white">${initials}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function profilePhoto(data) {
    const raw = String(data?.profile?.photo || "").trim();
    return raw || initialsAvatarDataUri(data?.profile?.name || FIXED_NAME);
  }

  const ACCENTS = [
    { id: "layout", label: { vi: "Theo palette", en: "By palette" }, value: null },
    { id: "cyan", label: { vi: "Xanh cyan", en: "Cyan" }, value: "#0ea5e9" },
    { id: "sky", label: { vi: "Xanh trời", en: "Sky" }, value: "#38bdf8" },
    { id: "blue", label: { vi: "Xanh dương", en: "Blue" }, value: "#3b82f6" },
    { id: "indigo", label: { vi: "Chàm", en: "Indigo" }, value: "#6366f1" },
    { id: "violet", label: { vi: "Tím violet", en: "Violet" }, value: "#7c3aed" },
    { id: "purple", label: { vi: "Tím", en: "Purple" }, value: "#8b5cf6" },
    { id: "rose", label: { vi: "Hồng rose", en: "Rose" }, value: "#f43f5e" },
    { id: "amber", label: { vi: "Hổ phách", en: "Amber" }, value: "#f59e0b" },
    { id: "emerald", label: { vi: "Ngọc lục bảo", en: "Emerald" }, value: "#10b981" },
    { id: "teal", label: { vi: "Xanh ngọc", en: "Teal" }, value: "#14b8a6" },
    { id: "slate", label: { vi: "Xám slate", en: "Slate" }, value: "#0f172a" },
    { id: "neutral", label: { vi: "Trung tính", en: "Neutral" }, value: "#525252" }
  ];

  const state = {
    lang: localStorage.getItem("cv-lang") || "vi",
    data: null,
    layouts: [],
    layoutId: localStorage.getItem("cv-layout") || "",
    paletteId: localStorage.getItem("cv-palette") || "",
    layoutTone: "light",
    accentMode: localStorage.getItem("cv-accent-mode") || "layout", // layout | manual
    accentId: localStorage.getItem("cv-accent") || "",
    themeMode: localStorage.getItem("cv-theme-mode") || "auto", // auto | manual
  };

  const FALLBACK_LAYOUTS = [
    {
      id: "glass-nova",
      name: "Glass Nova",
      preview: "linear-gradient(135deg, #0ea5e9, #22d3ee, #a855f7)",
      mode: "split",
      accent: "#22d3ee",
      tone: "dark",
      cv: {
        "bg-app": "radial-gradient(1600px 800px at 10% 0%, rgba(14,165,233,0.18), transparent 55%), radial-gradient(1400px 700px at 90% 12%, rgba(168,85,247,0.16), transparent 60%), #0b1224",
        "surface": "rgba(9, 12, 22, 0.7)",
        "sidebar": "linear-gradient(180deg, rgba(34,211,238,0.3), rgba(34,211,238,0.04))",
        "right-surface": "rgba(15, 23, 42, 0.55)",
        "panel-line": "rgba(255,255,255,0.08)",
        "radius-lg": "28px",
        "shadow-lg": "0 32px 90px rgba(0,0,0,0.48)",
        "layout-cols": "320px 1fr",
        "avatar-radius": "26px"
      }
    }
  ];

  /* ----------------------------
     Helpers
  ---------------------------- */
  function setStyleTab(tab) {
    styleTabColors?.classList.remove("active");
    styleTabLayouts?.classList.remove("active");
    if (colorSection) colorSection.style.display = "block";
    if (layoutSection) layoutSection.style.display = "block";
  }

  function prettyBreak(v, t) {
    if (!v) return "";
    if (t === "email") return v.replace(/([@._+-])/g, "$1<wbr>");
    if (t === "website" || t === "github") return v.replace(/([\/.?=&_-])/g, "$1<wbr>");
    return v;
  }

  function adjustFreeRange(str, lang) {
    if (!str) return "";
    const m = str.match(/(\d{4}).*[-–].*(\d{4})/);
    const y = new Date().getFullYear();
    if (m) {
      const en = parseInt(m[2], 10);
      if (en > y) return `${m[1]}–${lang === "vi" ? "nay" : "present"}`;
    }
    return str;
  }

  function normalizedRange(start, end, lang) {
    if (!start && !end) return "";
    const y = new Date().getFullYear();
    const yn = parseInt(end, 10);
    if (end && !Number.isNaN(yn) && yn > y) return `${start}–${lang === "vi" ? "nay" : "present"}`;
    return [start, end].filter(Boolean).join("–");
  }

  function measureCssMm(mm) {
    const probe = document.createElement("div");
    probe.style.cssText = `position:fixed;left:-9999px;top:0;width:${mm}mm;height:1px;visibility:hidden;pointer-events:none;`;
    document.body.appendChild(probe);
    const px = probe.getBoundingClientRect().width;
    probe.remove();
    return px;
  }

  function getLayoutList() {
    return state.layouts?.length ? state.layouts : FALLBACK_LAYOUTS;
  }

  function pickText(value, lang = state.lang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[lang] ?? value.vi ?? value.en ?? "";
  }

  function layoutModeName(mode, lang = state.lang) {
    const t = uiText(lang);
    const map = {
      split: t.split,
      stacked: t.stacked,
      "wide-right": t.wideRight
    };
    return map[mode] || mode || t.split;
  }

  function toneLabel(mode, lang = state.lang) {
    const t = uiText(lang);
    return mode === "dark" ? t.darkTone : t.lightTone;
  }

  const STRUCTURE_CV_KEYS = new Set(["layout-cols", "layout-gap"]);

  function pickStructureCvVars(vars = {}) {
    return Object.fromEntries(
      Object.entries(vars).filter(([key]) => STRUCTURE_CV_KEYS.has(key))
    );
  }

  function pickPaletteCvVars(vars = {}) {
    return Object.fromEntries(
      Object.entries(vars).filter(([key]) => !STRUCTURE_CV_KEYS.has(key))
    );
  }

  function getStructureList() {
    const list = getLayoutList();
    const seen = new Set();

    return list.reduce((acc, layout) => {
      const mode = layout?.mode || "split";
      if (seen.has(mode)) return acc;
      seen.add(mode);
      acc.push({
        id: mode,
        mode,
        name: layoutModeName(mode),
        preview: layout.preview || "linear-gradient(135deg,#0ea5e9,#8b5cf6)",
        cv: {
          "layout-cols": layout?.cv?.["layout-cols"] || (mode === "stacked" ? "1fr" : "320px 1fr"),
          "layout-gap": layout?.cv?.["layout-gap"] || "0px"
        }
      });
      return acc;
    }, []);
  }

  function currentLayout() {
    const list = getStructureList();
    return list.find((layout) => layout.id === state.layoutId) || list[0] || null;
  }

  function currentPalette() {
    const list = getLayoutList();
    return list.find((layout) => layout.id === state.paletteId) || list[0] || null;
  }

  function uiText(lang = state.lang) {
    return UI_TEXT[lang === "en" ? "en" : "vi"];
  }

  function setCssContentVar(name, value) {
    html.style.setProperty(name, JSON.stringify(String(value || "")));
  }

  function applyCvVars(vars = {}) {
    Object.entries(vars).forEach(([key, value]) => {
      if (typeof value !== "undefined") html.style.setProperty(`--${key}`, value);
    });
  }

  function syncPaletteIdentityVars(layout = currentPalette()) {
    if (!layout) return;
    html.style.setProperty("--palette-accent", layout.accent || "#0ea5e9");
    html.style.setProperty("--palette-identity", layout.preview || layout?.cv?.["bg-app"] || "linear-gradient(135deg,#0ea5e9,#8b5cf6)");
  }

  function inferTone(layout) {
    if (layout?.tone === "dark" || layout?.tone === "light") return layout.tone;
    const bg = (layout?.cv?.["bg-app"] || layout?.preview || "").toLowerCase();
    if (bg.includes("#0b") || bg.includes("#0f") || bg.includes("#111") || bg.includes("rgba(0") || bg.includes("dark")) return "dark";
    return "light";
  }

  function getThemeCvOverrides(mode) {
    if (mode === "dark") {
      return {
        "bg-app": "radial-gradient(1400px 760px at 10% 0%, color-mix(in srgb, var(--palette-accent) 34%, transparent), transparent 58%), radial-gradient(1100px 700px at 100% 10%, color-mix(in srgb, var(--palette-accent) 16%, #ffffff 12%), transparent 62%), linear-gradient(150deg, color-mix(in srgb, var(--palette-accent) 12%, #050816), #040814 52%, color-mix(in srgb, var(--palette-accent) 14%, #0b1120) 100%)",
        "surface": "color-mix(in srgb, var(--palette-accent) 14%, rgba(7,10,18,0.92))",
        "sidebar": "linear-gradient(200deg, color-mix(in srgb, var(--palette-accent) 34%, rgba(8,12,22,0.98)), rgba(7,10,18,0.94) 62%)",
        "right-surface": "color-mix(in srgb, var(--palette-accent) 18%, rgba(10,14,24,0.94))",
        "panel-line": "color-mix(in srgb, var(--palette-accent) 28%, rgba(255,255,255,0.12))",
        "shadow-lg": "0 34px 100px color-mix(in srgb, var(--palette-accent) 14%, rgba(0,0,0,0.52))"
      };
    }

    return {
      "bg-app": "radial-gradient(1200px 760px at 12% 0%, color-mix(in srgb, var(--palette-accent) 14%, transparent), transparent 58%), linear-gradient(180deg, #f8fafc, #e2e8f0)",
      "surface": "rgba(255,255,255,0.95)",
      "sidebar": "linear-gradient(180deg, color-mix(in srgb, var(--palette-accent) 10%, #ffffff), rgba(255,255,255,0.98))",
      "right-surface": "rgba(255,255,255,0.88)",
      "panel-line": "rgba(15,23,42,0.08)",
      "shadow-lg": "0 22px 70px rgba(15,23,42,0.14)"
    };
  }

  function resolvePaletteCvVars(layout = currentPalette(), themeMode = null) {
    if (!layout) {
      return { tone: "light", mode: "light", useOverride: false, vars: {} };
    }

    const tone = inferTone(layout);
    const mode = themeMode || (html.getAttribute("data-theme") || tone);
    const baseVars = pickPaletteCvVars(layout.cv || {});
    const useOverride = mode !== tone;

    return {
      tone,
      mode,
      useOverride,
      vars: {
        ...baseVars,
        ...(useOverride ? getThemeCvOverrides(mode) : {})
      }
    };
  }

  function syncCvThemeVars(layout = currentPalette()) {
    if (!layout) return;
    const resolved = resolvePaletteCvVars(layout);
    syncPaletteIdentityVars(layout);

    state.layoutTone = resolved.tone;
    html.setAttribute("data-layout-tone", resolved.tone);
    html.setAttribute("data-theme-contrast", resolved.useOverride ? "adapted" : "native");

    applyCvVars(resolved.vars);
  }

  /* ----------------------------
     Theme
  ---------------------------- */
  function applyTheme(mode) {
    html.setAttribute("data-theme", mode);
    localStorage.setItem("cv-theme", mode);
    syncCvThemeVars();
    const t = uiText();
    if (themeBtn) themeBtn.textContent = mode === "dark" ? t.themeDark : t.themeLight;
    renderPaletteCards();
    renderAccentChips();
  }

  function initTheme() {
    const saved = localStorage.getItem("cv-theme");
    if (saved && state.themeMode === "manual") applyTheme(saved);
    else applyTheme(saved || "light");
  }
  initTheme();

  themeBtn?.addEventListener("click", () => {
    const cur = html.getAttribute("data-theme") || "light";
    const next = cur === "light" ? "dark" : "light";
    state.themeMode = "manual";
    localStorage.setItem("cv-theme-mode", "manual");
    applyTheme(next);
  });

  /* ----------------------------
     Accent + Layout
  ---------------------------- */
  function updateActiveLabel() {
    const t = uiText();
    const layout = currentLayout();
    const palette = currentPalette();
    if (layoutActiveLabel) {
      layoutActiveLabel.textContent = `${t.layout}: ${layout?.name || t.split} · ${t.paletteSection}: ${pickText({ vi: palette?.name_vi || palette?.name || palette?.id, en: palette?.name || palette?.name_vi || palette?.id })}`;
    }
  }

  function currentAccentValue(palette = currentPalette()) {
    if (state.accentMode === "manual") {
      const manual = ACCENTS.find((accent) => accent.id === state.accentId && accent.value);
      if (manual?.value) return manual.value;
    }
    return palette?.accent || "#0ea5e9";
  }

  function applyAccent(id) {
    const target = ACCENTS.find(a => a.id === id);
    const palette = currentPalette();

    if (id === "layout") {
      state.accentMode = "layout";
      state.accentId = "";
      localStorage.setItem("cv-accent-mode", "layout");
      localStorage.setItem("cv-accent", "");
      html.style.setProperty("--accent", currentAccentValue(palette));
    } else if (target) {
      state.accentMode = "manual";
      state.accentId = target.id;
      localStorage.setItem("cv-accent-mode", "manual");
      localStorage.setItem("cv-accent", target.id);
      html.style.setProperty("--accent", target.value);
    }

    accentRow?.querySelectorAll(".accent-chip").forEach(chip => {
      const cid = chip.dataset.id;
      const active = (state.accentMode === "layout" && cid === "layout") || (state.accentMode === "manual" && cid === state.accentId);
      chip.classList.toggle("active", active);
    });
  }

  function applyLayout(id) {
    const list = getStructureList();
    const found = list.find(l => l.id === id) || list[0];
    if (!found) return;

    state.layoutId = found.id;
    localStorage.setItem("cv-layout", found.id);

    html.setAttribute("data-layout", found.id);
    html.setAttribute("data-layout-mode", found.mode || "split");
    applyCvVars(pickStructureCvVars(found.cv || {}));

    if (state.themeMode !== "manual") {
      applyTheme(state.layoutTone || inferTone(currentPalette()));
    } else {
      syncCvThemeVars();
    }

    if (state.accentMode === "layout") html.style.setProperty("--accent", currentPalette()?.accent || "#0ea5e9");
    else applyAccent(state.accentId || "cyan");

    updateActiveLabel();
    printFlow?.firstElementChild?.setAttribute("data-layout-mode", found.mode || "split");
    renderPaletteCards();
    layoutGrid?.querySelectorAll(".layout-card").forEach(card => {
      card.classList.toggle("active", card.dataset.id === found.id);
    });
  }

  function applyPalette(id) {
    const list = getLayoutList();
    const found = list.find(l => l.id === id) || list[0];
    if (!found) return;

    state.paletteId = found.id;
    state.layoutTone = inferTone(found);
    localStorage.setItem("cv-palette", found.id);

    html.setAttribute("data-palette", found.id);

    if (state.themeMode !== "manual") {
      applyTheme(state.layoutTone);
    } else {
      syncCvThemeVars(found);
    }

    if (state.accentMode === "layout") html.style.setProperty("--accent", found.accent || "#0ea5e9");
    else applyAccent(state.accentId || "cyan");

    renderAccentChips();
    updateActiveLabel();
    paletteGrid?.querySelectorAll(".layout-card").forEach(card => {
      card.classList.toggle("active", card.dataset.id === found.id);
    });
  }

  function structurePreview(mode) {
    if (mode === "stacked") {
      return `
        <div class="structure-shell" data-mode="stacked">
          <span class="structure-card is-hero hero"></span>
          <span class="structure-card is-main"></span>
          <span class="structure-card is-main"></span>
        </div>
      `;
    }

    return `
      <div class="structure-shell" data-mode="${mode}">
        <div class="structure-col">
          <span class="structure-card is-sidebar tall"></span>
        </div>
        <div class="structure-col">
          <span class="structure-card is-hero hero"></span>
          <span class="structure-card is-main"></span>
        </div>
      </div>
    `;
  }

  function palettePreviewMarkup(palette, mode = currentLayout()?.mode || "split") {
    const previewMode = html.getAttribute("data-theme") || inferTone(palette);
    const resolved = resolvePaletteCvVars(palette, previewMode);
    const previewAccent = palette?.accent || "#0ea5e9";
    const previewStyle = [
      `--preview-accent:${previewAccent}`,
      `--preview-bg-app:${resolved.vars["bg-app"] || palette?.preview || "linear-gradient(135deg,#0ea5e9,#8b5cf6)"}`,
      `--preview-identity:${palette?.preview || resolved.vars["bg-app"] || "linear-gradient(135deg,#0ea5e9,#8b5cf6)"}`,
      `--preview-surface:${resolved.vars.surface || "rgba(255,255,255,.92)"}`,
      `--preview-sidebar:${resolved.vars.sidebar || resolved.vars.surface || "rgba(255,255,255,.92)"}`,
      `--preview-right-surface:${resolved.vars["right-surface"] || resolved.vars.surface || "rgba(255,255,255,.9)"}`,
      `--preview-line:${resolved.vars["panel-line"] || "rgba(148,163,184,.24)"}`
    ].join(";");

    return `<div class="layout-preview layout-palette" style="${previewStyle}">${structurePreview(mode)}</div>`;
  }

  function renderLayoutCards() {
    if (!layoutGrid) return;
    const list = getStructureList();

    layoutGrid.innerHTML = list.map(l => {
      return `
        <button class="layout-card ${state.layoutId === l.id ? "active" : ""}" data-id="${l.id}" type="button">
          <div class="layout-preview layout-structure">${structurePreview(l.mode || "split")}</div>
          <div class="layout-meta">
            <span style="font-weight:800">${l.name || l.id}</span>
            <span class="layout-chip">${layoutModeName(l.mode || "split")}</span>
          </div>
        </button>
      `;
    }).join("");
  }

  function renderPaletteCards() {
    if (!paletteGrid) return;
    const list = getLayoutList();
    const previewMode = currentLayout()?.mode || "split";
    paletteGrid.innerHTML = list.map((palette) => {
      return `
        <button class="layout-card ${state.paletteId === palette.id ? "active" : ""}" data-id="${palette.id}" type="button">
          ${palettePreviewMarkup(palette, previewMode)}
          <div class="layout-meta">
            <span style="font-weight:800">${pickText({ vi: palette.name_vi || palette.name || palette.id, en: palette.name || palette.name_vi || palette.id })}</span>
            <span class="layout-chip">${toneLabel(inferTone(palette))}</span>
          </div>
        </button>
      `;
    }).join("");
  }

  function renderAccentChips() {
    if (!accentRow) return;
    const paletteBg = currentPalette()?.preview || "linear-gradient(135deg,#0ea5e9,#8b5cf6)";
    accentRow.innerHTML = ACCENTS.map(a => {
      const bg = a.value || paletteBg;
      return `<button class="accent-chip" data-id="${a.id}" type="button">
        <span class="accent-dot" style="background:${bg}"></span>
        <span style="font-weight:800">${pickText(a.label)}</span>
      </button>`;
    }).join("");

    accentRow.querySelectorAll(".accent-chip").forEach(chip => {
      chip.addEventListener("click", () => applyAccent(chip.dataset.id));
    });

    // init accent from storage
    const mode = localStorage.getItem("cv-accent-mode") || "layout";
    const saved = localStorage.getItem("cv-accent") || "";
    state.accentMode = mode;
    state.accentId = saved;
    applyAccent(mode === "layout" ? "layout" : (saved || "cyan"));
  }

  function setupLayoutPicker() {
    function openCustomizer(){
      renderLayoutCards();
      renderPaletteCards();
      renderAccentChips();
      setStyleTab("layouts");
      layoutModal.classList.add("open");
    }

    fabLayout?.addEventListener("click", openCustomizer);
    layoutToggle?.addEventListener("click", openCustomizer);

    styleTabColors?.addEventListener("click", () => setStyleTab("colors"));
    styleTabLayouts?.addEventListener("click", () => setStyleTab("layouts"));

    layoutClose?.addEventListener("click", () => layoutModal.classList.remove("open"));
    layoutModal?.addEventListener("click", (e) => { if (e.target === layoutModal) layoutModal.classList.remove("open"); });

    layoutGrid?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;
      applyLayout(card.dataset.id);
    });

    paletteGrid?.addEventListener("click", (e) => {
      const card = e.target.closest("[data-id]");
      if (!card) return;
      applyPalette(card.dataset.id);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") layoutModal.classList.remove("open");
    });
  }

  /* ----------------------------
     Render CV from assets/cv.json
  ---------------------------- */
  function setText(id, text){
    const el = document.getElementById(id);
    if (el) el.textContent = text || "";
  }

  function legacyRenderPrintFlow(data, lang, labels = {}) {
    if (!printFlow) return;

    const contacts = (data.profile?.contacts || []).map((contact) => `
      <div class="print-contact-row">
        <div class="print-contact-label">${(contact.type || "").toUpperCase()}</div>
        <div>${contact.value || ""}</div>
      </div>
    `).join("");

    const coreSkills = (data.sections?.skillsCore || []).map((skill) => {
      const pct = Math.max(0, Math.min(100, Number(skill.level) || 0));
      return `
        <div class="print-skill">
          <div class="print-skill-head">
            <span>${skill.name?.[lang] || ""}</span>
            <strong>${pct}%</strong>
          </div>
          <div class="print-skill-track"><span style="width:${pct}%"></span></div>
        </div>
      `;
    }).join("");

    const tools = (data.sections?.tools || []).map((tool) => `<span class="print-badge">${tool}</span>`).join("");
    const languages = (data.sections?.languages || []).map((item) => `<span class="print-badge">${item?.[lang] || ""}</span>`).join("");
    const extraSkills = (data.sections?.skillsExtra || []).map((group) => {
      const items = (group.items || []).map((item) => `<li>${item?.[lang] || ""}</li>`).join("");
      return `
        <div class="print-entry">
          <div class="print-entry-title">${group.name?.[lang] || ""}</div>
          ${items ? `<ul>${items}</ul>` : ""}
        </div>
      `;
    }).join("");

    const experience = (data.sections?.experience || []).map((item) => {
      const bullets = (item.bullets || []).map((bullet) => `<li>${bullet?.[lang] || ""}</li>`).join("");
      return `
        <div class="print-entry">
          <div class="print-entry-head">
            <div class="print-entry-title">${item.title?.[lang] || ""}</div>
            ${item.time ? `<div class="print-entry-time">${adjustFreeRange(item.time, lang)}</div>` : ""}
          </div>
          ${item.org?.[lang] ? `<div class="print-entry-meta">${item.org[lang]}</div>` : ""}
          ${bullets ? `<ul>${bullets}</ul>` : ""}
        </div>
      `;
    }).join("");

    const projects = (data.sections?.projects || []).map((item) => `
      <div class="print-entry">
        <div class="print-entry-title">${item.name?.[lang] || ""}</div>
        ${item.desc?.[lang] ? `<div class="print-entry-meta">${item.desc[lang]}</div>` : ""}
      </div>
    `).join("");

    const education = (data.sections?.education || []).map((item) => `
      <div class="print-entry">
        <div class="print-entry-head">
          <div class="print-entry-title">${item.school?.[lang] || ""}</div>
          ${normalizedRange(item.start, item.end, lang) ? `<div class="print-entry-time">${normalizedRange(item.start, item.end, lang)}</div>` : ""}
        </div>
        ${item.degree?.[lang] ? `<div class="print-entry-meta">${item.degree[lang]}</div>` : ""}
      </div>
    `).join("");

    const achievements = (data.sections?.achievements || []).map((item) => {
      const time = adjustFreeRange(item.time || "", lang);
      const text = item?.[lang] || "";
      return `<div class="print-note">${time ? `<strong>${time}</strong> ` : ""}${text}</div>`;
    }).join("");

    const activities = (data.sections?.activities || []).map((item) => {
      const details = (item.details || []).map((detail) => `<li>${detail?.[lang] || ""}</li>`).join("");
      const meta = [item.org?.[lang], adjustFreeRange(item.time || "", lang)].filter(Boolean).join(" · ");
      return `
        <div class="print-entry">
          <div class="print-entry-title">${item.name?.[lang] || ""}</div>
          ${meta ? `<div class="print-entry-meta">${meta}</div>` : ""}
          ${details ? `<ul>${details}</ul>` : ""}
        </div>
      `;
    }).join("");

    const summary = data.sections?.summary?.[lang] || "";
    const role = data.profile?.title?.[lang] || "";
    const name = data.profile?.name || FIXED_NAME;
    const photo = profilePhoto(data);

    printFlow.innerHTML = `
      <div class="print-sheet">
        <section class="print-card print-hero">
          <div class="print-hero-main">
            <img class="print-avatar" src="${photo}" alt="${name}" />
            <div>
              <h1 class="print-name">${name}</h1>
              <p class="print-role">${role}</p>
            </div>
          </div>
          ${summary ? `<p class="print-summary">${summary}</p>` : ""}
        </section>

        <div class="print-grid">
          <section class="print-card">
            <h2 class="print-card-head">${labels.contact || "Contact"}</h2>
            <div class="print-card-body print-contact-list">${contacts}</div>
          </section>
          <section class="print-card">
            <h2 class="print-card-head">${labels.skillsCore || "Core Skills"}</h2>
            <div class="print-card-body print-skill-list">${coreSkills}</div>
          </section>
          <section class="print-card">
            <h2 class="print-card-head">${labels.tools || "Tools · Technologies"}</h2>
            <div class="print-card-body"><div class="print-badges">${tools}</div></div>
          </section>
          <section class="print-card">
            <h2 class="print-card-head">${labels.langs || "Languages"}</h2>
            <div class="print-card-body"><div class="print-badges">${languages}</div></div>
          </section>
          ${extraSkills ? `
            <section class="print-card" style="grid-column:1 / -1">
              <h2 class="print-card-head">${labels.skills || "Additional Skills"}</h2>
              <div class="print-card-body print-entry-list">${extraSkills}</div>
            </section>
          ` : ""}
        </div>

        <section class="print-section">
          <h2>${labels.experience || "Experience"}</h2>
          <div class="print-entry-list">${experience}</div>
        </section>

        <section class="print-section">
          <h2>${labels.projects || "Featured Projects"}</h2>
          <div class="print-entry-list">${projects}</div>
        </section>

        <section class="print-section">
          <h2>${labels.education || "Education"}</h2>
          <div class="print-entry-list">${education}</div>
        </section>

        <section class="print-section">
          <h2>${labels.achievements || "Achievements"}</h2>
          <div class="print-note-list">${achievements}</div>
        </section>

        ${activities ? `
          <section class="print-section">
            <h2>${labels.activities || "Activities"}</h2>
            <div class="print-entry-list">${activities}</div>
          </section>
        ` : ""}
      </div>
    `;
  }

  function renderPrintFlow(data, lang, labels = {}) {
    if (!printFlow) return;

    const layoutMode = currentLayout()?.mode || html.getAttribute("data-layout-mode") || "split";

    const contacts = (data.profile?.contacts || []).map((contact) => {
      const row = `
        <div class="contact-row">
          <div class="contact-ico">${ICON[contact.type] || ""}</div>
          <div>
            <div class="contact-txt">${prettyBreak(contact.value, contact.type)}</div>
            <div class="contact-label">${(contact.type || "").toUpperCase()}</div>
          </div>
        </div>
      `;
      if (!contact.href) return row;
      const target = contact.href.startsWith("http") ? "_blank" : "";
      return `<a href="${contact.href}"${target ? ` target="${target}" rel="noopener"` : ""}>${row}</a>`;
    }).join("");

    const coreSkills = (data.sections?.skillsCore || []).map((skill) => {
      const pct = Math.max(0, Math.min(100, Number(skill.level) || 0));
      return `
        <div class="skill-meter">
          <div class="skill-meter-head">
            <span>${skill.name?.[lang] || ""}</span>
            <strong>${pct}%</strong>
          </div>
          <div class="skill-meter-track"><span style="width:${pct}%"></span></div>
        </div>
      `;
    }).join("");

    const tools = (data.sections?.tools || []).map((tool) => `<span class="skill-badge">${tool}</span>`).join("");
    const languages = (data.sections?.languages || []).map((item) => `<div class="print-meta-row">${item?.[lang] || ""}</div>`).join("");
    const extraSkills = (data.sections?.skillsExtra || []).map((group) => {
      const items = (group.items || []).map((item) => `<li>${item?.[lang] || ""}</li>`).join("");
      return `
        <div class="extra-skill-block">
          <strong>${group.name?.[lang] || ""}</strong>
          ${items ? `<ul>${items}</ul>` : ""}
        </div>
      `;
    }).join("");

    const experience = (data.sections?.experience || []).map((item) => {
      const bullets = (item.bullets || []).map((bullet) => `<li>${bullet?.[lang] || ""}</li>`).join("");
      return `
        <div class="exp-item">
          <div class="exp-time">${item.time ? adjustFreeRange(item.time, lang) : ""}</div>
          <div>
            <div class="exp-role">${item.title?.[lang] || ""}</div>
            ${item.org?.[lang] ? `<div class="exp-meta">${item.org[lang]}</div>` : ""}
            ${bullets ? `<ul class="exp-list">${bullets}</ul>` : ""}
          </div>
        </div>
      `;
    }).join("");

    const projectCards = (data.sections?.projects || []).map((item) => `
      <div class="exp-item exp-item-stack">
        <div>
          <div class="exp-role">${item.name?.[lang] || ""}</div>
          ${item.desc?.[lang] ? `<div class="exp-meta">${item.desc[lang]}</div>` : ""}
        </div>
      </div>
    `);

    const education = (data.sections?.education || []).map((item) => `
      <div class="exp-item exp-item-stack">
        <div>
          <div class="exp-role">${item.school?.[lang] || ""}</div>
          <div class="exp-meta">${[
            item.degree?.[lang] || "",
            normalizedRange(item.start, item.end, lang)
          ].filter(Boolean).join(" ")}</div>
        </div>
      </div>
    `).join("");

    const achievements = (data.sections?.achievements || []).map((item) => {
      const time = adjustFreeRange(item.time || "", lang);
      const text = item?.[lang] || "";
      if (time) return `<li><span class="ach-time">${time}</span> <span class="ach-text">${text}</span></li>`;
      return `<li><span class="ach-text">${text}</span></li>`;
    }).join("");

    const activities = (data.sections?.activities || []).map((item) => {
      const details = (item.details || []).map((detail) => `<li>${detail?.[lang] || ""}</li>`).join("");
      const meta = [item.org?.[lang], adjustFreeRange(item.time || "", lang)].filter(Boolean).join(" · ");
      return `
        <div class="exp-item exp-item-stack">
          <div class="exp-role" style="font-size:12.2px">${item.name?.[lang] || ""}</div>
          ${meta ? `<div class="exp-meta">${meta}</div>` : ""}
          ${details ? `<ul class="exp-list">${details}</ul>` : ""}
        </div>
      `;
    }).join("");

    const summary = data.sections?.summary?.[lang] || "";
    const role = data.profile?.title?.[lang] || "";
    const name = data.profile?.name || FIXED_NAME;
    const photo = profilePhoto(data);

    const panel = (title, body, className = "side-panel") => {
      if (!body) return "";
      return `
        <section class="${className}">
          <div class="screen-section-title">${title}</div>
          ${body}
        </section>
      `;
    };

    const chunkItems = (items, size) => {
      const out = [];
      for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
      return out;
    };

    const pageOneLeft = [
      `
        <div class="avatar-wrap">
          <img src="${photo}" alt="${name}" />
          <div class="name-screen">${name}</div>
          <div class="role-screen">${role}</div>
        </div>
      `,
      panel(labels.contact || "Contact", `<div class="contact-screen">${contacts}</div>`),
      panel(labels.skillsCore || "Core Skills", coreSkills),
      panel(labels.tools || "Tools Â· Technologies", tools),
      panel(labels.langs || "Languages", languages)
    ].filter(Boolean).join("");

    const pageOneRight = [
      summary ? `
        <section class="summary-box screen-panel">
          <h2>${labels.summary || "Summary"}</h2>
          <p>${summary}</p>
        </section>
      ` : "",
      panel(labels.experience || "Experience", `<div class="exp-grid">${experience}</div>`, "screen-panel"),
      panel(labels.projects || "Featured Projects", `<div class="proj-grid">${projectCards.join("")}</div>`, "screen-panel")
    ].filter(Boolean).join("");

    const pageTwoLeft = [
      extraSkills ? panel(labels.skills || "Additional Skills", `<div class="extra-skill-list">${extraSkills}</div>`) : ""
    ].filter(Boolean).join("");

    const pageTwoRight = [
      panel(labels.education || "Education", `<div class="exp-grid">${education}</div>`, "screen-panel"),
      activities ? panel(labels.activities || "Activities", `<div class="exp-grid">${activities}</div>`, "screen-panel") : ""
    ].filter(Boolean).join("");

    printFlow.innerHTML = `
      <div class="print-pages" data-layout-mode="${layoutMode}">
        <section class="print-page">
          <div class="print-page-shell">
            <div class="print-page-left">${pageOneLeft}</div>
            <div class="print-page-right">${pageOneRight}</div>
          </div>
        </section>
        ${(pageTwoLeft || pageTwoRight) ? `
          <section class="print-page">
            <div class="print-page-shell">
              <div class="print-page-left">${pageTwoLeft}</div>
              <div class="print-page-right">${pageTwoRight}</div>
            </div>
          </section>
        ` : ""}
      </div>
    `;
  }

  function renderPrintFlowMeasured(data, lang, labels = {}) {
    if (!printFlow) return;

    const layoutMode = currentLayout()?.mode || html.getAttribute("data-layout-mode") || "split";
    const summary = data.sections?.summary?.[lang] || "";
    const role = data.profile?.title?.[lang] || "";
    const name = data.profile?.name || FIXED_NAME;
    const photo = profilePhoto(data);

    const contacts = (data.profile?.contacts || []).map((contact) => {
      const row = `
        <div class="contact-row">
          <div class="contact-ico">${ICON[contact.type] || ""}</div>
          <div>
            <div class="contact-txt">${prettyBreak(contact.value, contact.type)}</div>
            <div class="contact-label">${(contact.type || "").toUpperCase()}</div>
          </div>
        </div>
      `;
      if (!contact.href) return row;
      const target = contact.href.startsWith("http") ? "_blank" : "";
      return `<a href="${contact.href}"${target ? ` target="${target}" rel="noopener"` : ""}>${row}</a>`;
    }).join("");

    const coreSkills = (data.sections?.skillsCore || []).map((skill) => {
      const pct = Math.max(0, Math.min(100, Number(skill.level) || 0));
      return `
        <div class="skill-meter">
          <div class="skill-meter-head">
            <span>${skill.name?.[lang] || ""}</span>
            <strong>${pct}%</strong>
          </div>
          <div class="skill-meter-track"><span style="width:${pct}%"></span></div>
        </div>
      `;
    }).join("");

    const tools = (data.sections?.tools || []).map((tool) => `<span class="skill-badge">${tool}</span>`).join("");
    const languages = (data.sections?.languages || []).map((item) => `<div class="print-meta-row">${item?.[lang] || ""}</div>`).join("");

    const extraSkills = (data.sections?.skillsExtra || []).map((group) => {
      const items = (group.items || []).map((item) => `<li>${item?.[lang] || ""}</li>`).join("");
      return `
        <div class="extra-skill-block">
          <strong>${group.name?.[lang] || ""}</strong>
          ${items ? `<ul>${items}</ul>` : ""}
        </div>
      `;
    }).join("");

    const experience = (data.sections?.experience || []).map((item) => {
      const bullets = (item.bullets || []).map((bullet) => `<li>${bullet?.[lang] || ""}</li>`).join("");
      return `
        <div class="exp-item">
          <div class="exp-time">${item.time ? adjustFreeRange(item.time, lang) : ""}</div>
          <div>
            <div class="exp-role">${item.title?.[lang] || ""}</div>
            ${item.org?.[lang] ? `<div class="exp-meta">${item.org[lang]}</div>` : ""}
            ${bullets ? `<ul class="exp-list">${bullets}</ul>` : ""}
          </div>
        </div>
      `;
    }).join("");

    const projectCards = (data.sections?.projects || []).map((item) => `
      <div class="exp-item exp-item-stack">
        <div>
          <div class="exp-role">${item.name?.[lang] || ""}</div>
          ${item.desc?.[lang] ? `<div class="exp-meta">${item.desc[lang]}</div>` : ""}
        </div>
      </div>
    `);

    const education = (data.sections?.education || []).map((item) => `
      <div class="exp-item exp-item-stack">
        <div>
          <div class="exp-role">${item.school?.[lang] || ""}</div>
          <div class="exp-meta">${[
            item.degree?.[lang] || "",
            normalizedRange(item.start, item.end, lang)
          ].filter(Boolean).join(" ")}</div>
        </div>
      </div>
    `).join("");

    const achievements = (data.sections?.achievements || []).map((item) => {
      const time = adjustFreeRange(item.time || "", lang);
      const text = item?.[lang] || "";
      if (time) return `<li><span class="ach-time">${time}</span> <span class="ach-text">${text}</span></li>`;
      return `<li><span class="ach-text">${text}</span></li>`;
    }).join("");

    const activities = (data.sections?.activities || []).map((item) => {
      const details = (item.details || []).map((detail) => `<li>${detail?.[lang] || ""}</li>`).join("");
      const meta = [item.org?.[lang], adjustFreeRange(item.time || "", lang)].filter(Boolean).join(" · ");
      return `
        <div class="exp-item exp-item-stack">
          <div class="exp-role" style="font-size:12.2px">${item.name?.[lang] || ""}</div>
          ${meta ? `<div class="exp-meta">${meta}</div>` : ""}
          ${details ? `<ul class="exp-list">${details}</ul>` : ""}
        </div>
      `;
    }).join("");

    const panel = (title, body, className = "side-panel") => {
      if (!body) return "";
      return `
        <section class="${className}">
          <div class="screen-section-title">${title}</div>
          ${body}
        </section>
      `;
    };

    const leftItems = [
      `
        <div class="avatar-wrap">
          <img src="${photo}" alt="${name}" />
          <div class="name-screen">${name}</div>
          <div class="role-screen">${role}</div>
        </div>
      `,
      panel(labels.contact || "Contact", `<div class="contact-screen">${contacts}</div>`),
      panel(labels.skillsCore || "Core Skills", coreSkills),
      panel(labels.tools || "Tools · Technologies", tools),
      languages ? panel(labels.langs || "Languages", `<div class="print-meta-list">${languages}</div>`) : "",
      extraSkills ? panel(labels.skills || "Additional Skills", `<div class="extra-skill-list">${extraSkills}</div>`) : ""
    ].filter(Boolean);

    const projectPanel = projectCards.length
      ? panel(labels.projects || "Featured Projects", `<div class="proj-grid">${projectCards.join("")}</div>`, "screen-panel")
      : "";

    const rightItems = [
      summary ? `
        <section class="summary-box screen-panel">
          <h2>${labels.summary || "Summary"}</h2>
          <p>${summary}</p>
        </section>
      ` : "",
      panel(labels.experience || "Experience", `<div class="exp-grid">${experience}</div>`, "screen-panel"),
      projectPanel,
      panel(labels.education || "Education", `<div class="exp-grid">${education}</div>`, "screen-panel"),
      achievements ? panel(labels.achievements || "Achievements", `<ul class="ach-list">${achievements}</ul>`, "screen-panel") : "",
      activities ? panel(labels.activities || "Activities", `<div class="exp-grid">${activities}</div>`, "screen-panel") : ""
    ].filter(Boolean);

    const leftHtml = leftItems.join("");
    const rightHtml = rightItems.join("");

    const buildSinglePageMarkup = (compactLevel, pageLayoutMode) => `
      <div class="print-pages" data-layout-mode="${pageLayoutMode}" data-print-compact="${compactLevel}">
        <section class="print-page">
          <div class="print-page-shell">
            <div class="print-page-left">${leftHtml}</div>
            <div class="print-page-right">${rightHtml}</div>
          </div>
        </section>
      </div>
    `;

    const measureSinglePageFit = (markup) => {
      const measureHost = document.createElement("div");
      measureHost.style.cssText = [
        "position:fixed",
        "left:-200vw",
        "top:0",
        "visibility:hidden",
        "pointer-events:none",
        "z-index:-1",
        "width:210mm",
        "overflow:hidden"
      ].join(";");

      measureHost.innerHTML = markup;

      document.body.appendChild(measureHost);

      const leftCol = measureHost.querySelector(".print-page-left");
      const rightCol = measureHost.querySelector(".print-page-right");
      const leftFits = !leftCol || leftCol.scrollHeight <= leftCol.clientHeight + 1;
      const rightFits = !rightCol || rightCol.scrollHeight <= rightCol.clientHeight + 1;
      const getSlack = (col) => {
        if (!col) return Number.POSITIVE_INFINITY;
        const lastChild = col.lastElementChild;
        if (!lastChild) return col.clientHeight;
        return Math.floor(col.getBoundingClientRect().bottom - lastChild.getBoundingClientRect().bottom);
      };
      const minSlack = Math.min(getSlack(leftCol), getSlack(rightCol));
      measureHost.remove();
      return {
        fits: leftFits && rightFits,
        minSlack
      };
    };

    const attempts = [
      { compact: 0, mode: layoutMode === "stacked" ? "split" : layoutMode },
      { compact: 1, mode: "wide-right" },
      { compact: 2, mode: "wide-right" },
      { compact: 3, mode: "wide-right" }
    ];

    let finalMarkup = buildSinglePageMarkup(attempts[0].compact, attempts[0].mode);
    let bestFit = {
      markup: finalMarkup,
      minSlack: Number.NEGATIVE_INFINITY
    };
    for (const attempt of attempts) {
      const markup = buildSinglePageMarkup(attempt.compact, attempt.mode);
      const result = measureSinglePageFit(markup);
      if (result.fits && result.minSlack > bestFit.minSlack) {
        bestFit = { markup, minSlack: result.minSlack };
      }
      finalMarkup = markup;
      if (result.fits && result.minSlack >= 8) {
        finalMarkup = markup;
        break;
      }
    }

    printFlow.innerHTML = bestFit.minSlack > Number.NEGATIVE_INFINITY ? bestFit.markup : finalMarkup;
  }

  function render() {
    const data = state.data;
    const lang = state.lang;
    if (!data) return;

    const L = data.labels?.[lang] || {};
    const T = uiText(lang);

    renderLayoutCards();
    renderPaletteCards();
    updateActiveLabel();
    const panelHead = layoutModal?.querySelector("div[style*='justify-content:space-between']");
    const panelIntro = panelHead?.firstElementChild;
    const pickerTitle = panelIntro?.children?.[0];
    const pickerSub = panelIntro?.children?.[1];
    if (pickerTitle) pickerTitle.textContent = T.layoutPickerTitle;
    if (pickerSub) pickerSub.textContent = T.layoutPickerSub;
    if (layoutClose) {
      layoutClose.textContent = T.close;
      layoutClose.title = T.close;
      layoutClose.setAttribute("aria-label", T.close);
    }
    if (styleTabColors) styleTabColors.textContent = T.color;
    if (styleTabLayouts) styleTabLayouts.textContent = T.layout;
    const layoutHeading = layoutSection?.firstElementChild;
    if (layoutHeading) layoutHeading.textContent = T.layoutSection;
    const paletteHeading = colorSection?.children?.[0];
    if (paletteHeading) paletteHeading.textContent = T.paletteSection;
    const legacyPaletteHeading = colorSection?.children?.[1];
    if (legacyPaletteHeading) legacyPaletteHeading.style.display = "none";
    let accentHeading = document.getElementById("accentHeading");
    if (!accentHeading && colorSection && accentRow) {
      accentHeading = document.createElement("div");
      accentHeading.id = "accentHeading";
      accentHeading.style.cssText = "font-size:12px;font-weight:700;margin:10px 0 6px";
      colorSection.insertBefore(accentHeading, accentRow);
    }
    if (accentHeading) accentHeading.textContent = T.accentSection;

    // profile
    data.profile = data.profile || {};
    data.profile.name = FIXED_NAME;

    const avatarImg = document.getElementById("avatarImg");
    if (avatarImg) {
      avatarImg.src = profilePhoto(data);
      avatarImg.classList.toggle("avatar-placeholder", !String(data.profile.photo || "").trim());
    }

    setText("nameScreen", data.profile.name);
    setText("roleScreen", data.profile.title?.[lang] || "");
    if (backHomeBtn) backHomeBtn.textContent = T.backHome;
    if (layoutToggle) layoutToggle.textContent = T.fabLayout;
    if (printToggle) printToggle.textContent = T.print;
    if (fabPrint) fabPrint.textContent = T.fabPrint;
    if (fabLayout) fabLayout.textContent = T.fabLayout;
    if (layoutModal) layoutModal.setAttribute("aria-label", T.layoutPickerTitle);
    setCssContentVar("--brand-kicker", T.brandKicker);
    setCssContentVar("--brand-meta", T.brandMeta);
    applyTheme(html.getAttribute("data-theme") || "light");
    renderPrintFlow(data, lang, {
      summary: L.summary || "Summary",
      contact: L.contact || "Contact",
      skillsCore: L.skillsCore || "Core Skills",
      tools: L.tools || "Tools · Technologies",
      langs: L.langs || "Languages",
      skills: L.skills || "Additional Skills",
      experience: L.experience || "Experience",
      projects: L.projects || "Featured Projects",
      education: L.education || "Education",
      achievements: L.achievements || "Achievements",
      activities: L.activities || "Activities"
    });

    setText("contactTitle", L.contact || "Contact");
    setText("coreSkillsTitle", L.skillsCore || "Core Skills");
    setText("toolsTitle", L.tools || "Tools · Technologies");
    setText("langsTitle", L.langs || "Languages");
    setText("extraSkillsTitle", L.skills || "Additional Skills");
    setText("summaryTitle", L.summary || "Summary");
    setText("expTitle", L.experience || "Experience");
    setText("projTitle", L.projects || "Featured Projects");
    setText("eduTitle", L.education || "Education");
    setText("achTitle", L.achievements || "Achievements");
    setText("actTitle", L.activities || "Activities");

    setText("summaryText", data.sections?.summary?.[lang] || "");

    // contact
    const contactBox = document.getElementById("contactList");
    contactBox.innerHTML = "";
    (data.profile.contacts || []).forEach((c) => {
      const row = document.createElement("div");
      row.className = "contact-row";
      row.innerHTML = `
        <div class="contact-ico">${ICON[c.type] || ""}</div>
        <div>
          <div class="contact-txt">${prettyBreak(c.value, c.type)}</div>
          <div class="contact-label">${(c.type || "").toUpperCase()}</div>
        </div>
      `;
      if (c.href) {
        const wrap = document.createElement("a");
        wrap.href = c.href;
        wrap.target = c.href.startsWith("http") ? "_blank" : "";
        wrap.rel = wrap.target ? "noopener" : "";
        wrap.appendChild(row);
        contactBox.appendChild(wrap);
      } else {
        contactBox.appendChild(row);
      }
    });

    // core skills
    const coreBox = document.getElementById("coreSkillsList");
    coreBox.innerHTML = (data.sections?.skillsCore || [])
      .map((s) => {
        const pct = Math.max(0, Math.min(100, Number(s.level) || 0));
        return `
          <div class="skill-meter">
            <div class="skill-meter-head">
              <span>${s.name?.[lang] || ""}</span>
              <strong>${pct}%</strong>
            </div>
            <div class="skill-meter-track"><span style="width:${pct}%"></span></div>
          </div>
        `;
      }).join("");

    // tools
    const toolBox = document.getElementById("toolsList");
    toolBox.innerHTML = (data.sections?.tools || [])
      .map((t) => `<div class="skill-badge">${t}</div>`).join("");

    // languages
    const langBox = document.getElementById("langList");
    langBox.innerHTML = (data.sections?.languages || [])
      .map((x) => `<div class="skill-badge">${x[lang] || ""}</div>`).join("");

    // extra skills
    const extraPanel = document.getElementById("extraSkillsPanel");
    const extraBox = document.getElementById("extraSkills");
    if ((data.sections?.skillsExtra || []).length) {
      extraPanel.style.display = "";
      extraBox.innerHTML = (data.sections.skillsExtra || []).map((s) => {
        const items = (s.items || []).map((i) => `<li>${i[lang] || ""}</li>`).join("");
        return `<div style="margin-bottom:6px">
          <strong style="font-size:12.5px">${s.name?.[lang] || ""}</strong>
          <ul style="margin:3px 0 0 14px;font-size:12px">${items}</ul>
        </div>`;
      }).join("");
    } else {
      extraPanel.style.display = "none";
    }

    // experience
    const expBox = document.getElementById("expList");
    const exp = (data.sections?.experience || []).map((x) => ({
      title: x.title?.[lang] || "",
      org: x.org?.[lang] || "",
      time: x.time || "",
      bullets: (x.bullets || []).map((b) => b[lang] || "")
    }));

    expBox.innerHTML = exp.map((x) => {
      const bullets = (x.bullets || []).map((b) => `<li>${b}</li>`).join("");
      return `
        <div class="exp-item">
          <div class="exp-time">${x.time ? adjustFreeRange(x.time, lang) : ""}</div>
          <div>
            <div class="exp-role">${x.title}</div>
            ${x.org ? `<div class="exp-meta">${x.org}</div>` : ""}
            ${bullets ? `<ul class="exp-list">${bullets}</ul>` : ""}
          </div>
        </div>
      `;
    }).join("");

    // projects (simple card)
    const projBox = document.getElementById("projList");
    projBox.innerHTML = (data.sections?.projects || []).map((p) => `
      <div class="exp-item exp-item-stack">
        <div>
          <div class="exp-role">${p.name?.[lang] || ""}</div>
          <div class="exp-meta">${p.desc?.[lang] || ""}</div>
        </div>
      </div>
    `).join("");

    // education
    const eduBox = document.getElementById("eduList");
    eduBox.innerHTML = (data.sections?.education || []).map((e) => {
      const time = normalizedRange(e.start, e.end, lang);
      return `
        <div class="exp-item exp-item-stack">
          <div>
            <div class="exp-role">${e.school?.[lang] || ""}</div>
            <div class="exp-meta">${(e.degree?.[lang] || "")} ${time}</div>
          </div>
        </div>
      `;
    }).join("");

    // achievements
    const achBox = document.getElementById("achList");
    achBox.innerHTML = (data.sections?.achievements || []).map((a) => {
      const time = adjustFreeRange(a.time || "", lang);
      const text = a[lang] || "";
      if (time) return `<li><span class="ach-time">${time}</span> <span class="ach-text">${text}</span></li>`;
      return `<li><span class="ach-text">${text}</span></li>`;
    }).join("");

    // activities
    const actPanel = document.getElementById("activitiesPanel");
    const actBox = document.getElementById("actList");
    const activities = data.sections?.activities || [];
    if (activities.length) {
      actPanel.style.display = "";
      actBox.innerHTML = activities.map((x) => {
        const meta = [x.org?.[lang], adjustFreeRange(x.time, lang)].filter(Boolean).join(" · ");
        const det = (x.details || []).map((d) => `<li>${d[lang] || ""}</li>`).join("");
        return `
          <div class="exp-item exp-item-stack">
            <div class="exp-role" style="font-size:12.2px">${x.name?.[lang] || ""}</div>
            ${meta ? `<div class="exp-meta">${meta}</div>` : ""}
            ${det ? `<ul class="exp-list">${det}</ul>` : ""}
          </div>
        `;
      }).join("");
    } else {
      actPanel.style.display = "none";
    }

    // UI language button
    if (langBtn) {
      langBtn.textContent = T.langLabel;
      langBtn.title = T.langTitle;
      langBtn.setAttribute("aria-label", T.langTitle);
    }
    document.documentElement.lang = state.lang;
    schedulePrintFlowSync();
  }

  langBtn?.addEventListener("click", () => {
    state.lang = state.lang === "vi" ? "en" : "vi";
    localStorage.setItem("cv-lang", state.lang);
    render();
  });

  async function loadLayouts() {
    try {
      const res = await fetch("assets/layouts.json", { cache: "no-store" });
      const json = await res.json();
      state.layouts = json.layouts || [];
    } catch {
      state.layouts = FALLBACK_LAYOUTS;
    }

    const structureList = getStructureList();
    const savedLayout = localStorage.getItem("cv-layout") || "";
    const legacyLayout = getLayoutList().find((layout) => layout.id === savedLayout);

    if (!state.layoutId || !structureList.some((layout) => layout.id === state.layoutId)) {
      state.layoutId = legacyLayout?.mode || structureList[0]?.id || "split";
    }

    if (!state.paletteId || !getLayoutList().some((layout) => layout.id === state.paletteId)) {
      state.paletteId = localStorage.getItem("cv-palette") || legacyLayout?.id || getLayoutList()[0]?.id || FALLBACK_LAYOUTS[0].id;
    }

    renderLayoutCards();
    renderPaletteCards();
    renderAccentChips();
    applyPalette(state.paletteId);
    applyLayout(state.layoutId);
  }

  async function loadData() {
    try {
      const res = await fetch("assets/cv.json", { cache: "no-store" });
      state.data = await res.json();
    } catch {
      state.data = {
        labels:{ vi:{}, en:{} },
        profile:{ name: FIXED_NAME, title:{vi:"",en:""}, contacts:[] },
        sections:{ summary:{vi:"",en:""}, skillsCore:[], tools:[], languages:[], experience:[], projects:[], education:[], achievements:[], activities:[] }
      };
    }
    render();
  }

  /* ----------------------------
     Print mode
  ---------------------------- */
  function enablePrintMode(on){
    html.classList.toggle("is-print", !!on);
  }

  function nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }

  async function waitForPrintAssetsReady() {
    const fontReady = document.fonts?.ready?.catch?.(() => {}) || Promise.resolve();
    const imageNodes = Array.from((cvWrapper || document).querySelectorAll("img"));
    const imageReady = Promise.all(imageNodes.map((img) => {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      if (typeof img.decode === "function") {
        return img.decode().catch(() => {});
      }
      return new Promise((resolve) => {
        const done = () => resolve();
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }));

    await Promise.all([fontReady, imageReady]);
    await nextFrame();
    await nextFrame();
  }

  let printSyncTicket = 0;

  function syncPrintFlowNow() {
    if (!state.data) return;
    const L = state.data.labels?.[state.lang] || {};
    renderPrintFlowMeasured(state.data, state.lang, {
      summary: L.summary || "Summary",
      contact: L.contact || "Contact",
      skillsCore: L.skillsCore || "Core Skills",
      tools: L.tools || "Tools · Technologies",
      langs: L.langs || "Languages",
      skills: L.skills || "Additional Skills",
      experience: L.experience || "Experience",
      projects: L.projects || "Featured Projects",
      education: L.education || "Education",
      achievements: L.achievements || "Achievements",
      activities: L.activities || "Activities"
    });
  }

  async function schedulePrintFlowSync() {
    const ticket = ++printSyncTicket;
    await waitForPrintAssetsReady();
    if (ticket !== printSyncTicket) return;
    syncPrintFlowNow();
    await nextFrame();
  }

  async function runPrint(){
    enablePrintMode(false);
    html.style.setProperty("--print-scale", "1");
    html.style.setProperty("--print-fit-height", "auto");
    await schedulePrintFlowSync();
    window.print();
  }

  window.addEventListener("beforeprint", () => {
    enablePrintMode(false);
    html.style.setProperty("--print-scale", "1");
    html.style.setProperty("--print-fit-height", "auto");
    schedulePrintFlowSync();
  });
  window.addEventListener("afterprint",  () => enablePrintMode(false));

  const mql = window.matchMedia && window.matchMedia("print");
  if (mql?.addEventListener) {
    mql.addEventListener("change", (e) => {
      if (!e.matches) enablePrintMode(false);
    });
  }

  fabPrint?.addEventListener("click", runPrint);
  printToggle?.addEventListener("click", runPrint);

  /* ----------------------------
     Modal wiring
  ---------------------------- */
  setupLayoutPicker();

  /* ----------------------------
     Boot
  ---------------------------- */
  loadLayouts();
  loadData();
})();
