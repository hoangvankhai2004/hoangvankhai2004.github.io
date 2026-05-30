const FALLBACK_DATA = {
  profile: {
    name: "Hoàng Văn Khải",
    shortName: "HVK",
    badge: "Portfolio sản phẩm kỹ thuật",
    title: "Ứng viên Embedded / PCB / Robotics",
    summary: "Tôi tập trung vào thiết kế hệ thống điện, lập trình và hoàn thiện các sản phẩm vi điều khiển, mạch điều khiển và hệ thống nhúng thực tế.",
    avatar: "assets/images/avatar.svg",
    school: "UNETI",
    major: "Tự động hóa",
    email: "hoangvankhai2004hl@gmail.com",
    phone: "0389136558",
    github: "https://github.com/hoangvankhai2004",
    cv: "cv.html",
    highlights: [
      { label: "Vi điều khiển", value: "STM32 · ESP32 · Arduino" },
      { label: "Mạch", value: "Altium · KiCad" },
      { label: "Robotics", value: "Robot tự động bằng cảm biến · Điều khiển động cơ" },
      { label: "Máy tính nhúng", value: "ROS2 · MATLAB" },
      { label: "Python", value: "App · Web" }
    ],
    actions: [
      { label: "Xem sản phẩm", href: "#products", style: "primary" },
      { label: "Mở CV", href: "cv.html", style: "secondary" },
      { label: "GitHub", href: "https://github.com/hoangvankhai2004", style: "ghost" }
    ]
  },
  productsIntro: {
    title: "Các sản phẩm nổi bật",
    subtitle: ""
  },
  products: [],
  contact: []
};

const UI_TEXT = {
  vi: {
    navProducts: "Sản phẩm",
    navContact: "Liên hệ",
    navCv: "CV",
    productsEyebrow: "Sản phẩm / dự án",
    productsTitle: "Các sản phẩm nổi bật",
    contactEyebrow: "Liên hệ",
    contactTitle: "Thông tin liên hệ",
    footerTop: "Lên đầu trang ↑",
    all: "Tất cả",
    productFallback: "Sản phẩm",
    projectFallback: "Dự án kỹ thuật",
    viewDetail: "Xem chi tiết",
    notUpdated: "Chưa cập nhật.",
    noProducts: "Chưa có sản phẩm trong nhóm này. Hãy thêm sản phẩm trong file <strong>assets/site.json</strong>.",
    emptyMedia: "Chưa gắn ảnh/video cho sản phẩm này. Bạn chỉ cần copy ảnh vào thư mục <b>assets/images</b>, video vào <b>assets/videos</b>, rồi điền đường dẫn trong <b>assets/site.json</b>.",
    mediaAlt: "Ảnh sản phẩm",
    thumbnail: "Thumbnail",
    video: "Video",
    openLink: "Mở link",
    roleTitle: "Vai trò của tôi",
    featuresTitle: "Tính năng chính",
    resultTitle: "Kết quả / giá trị thể hiện",
    defaultResult: "Chưa cập nhật kết quả.",
    phone: "Điện thoại",
    openCv: "Mở CV tuyển dụng",
    langLabel: "VN",
    langAria: "Chuyển ngôn ngữ"
  },
  en: {
    navProducts: "Products",
    navContact: "Contact",
    navCv: "CV",
    productsEyebrow: "Products / projects",
    productsTitle: "Featured Products",
    contactEyebrow: "Contact",
    contactTitle: "Contact Information",
    footerTop: "Back to top ↑",
    all: "All",
    productFallback: "Product",
    projectFallback: "Technical project",
    viewDetail: "View details",
    notUpdated: "Not updated yet.",
    noProducts: "There are no products in this group yet. Add products in <strong>assets/site.json</strong>.",
    emptyMedia: "No image/video has been attached to this product yet. Copy images to <b>assets/images</b>, videos to <b>assets/videos</b>, then fill in the paths in <b>assets/site.json</b>.",
    mediaAlt: "Product image",
    thumbnail: "Thumbnail",
    video: "Video",
    openLink: "Open link",
    roleTitle: "My role",
    featuresTitle: "Key features",
    resultTitle: "Result / demonstrated value",
    defaultResult: "Result not updated yet.",
    phone: "Phone",
    openCv: "Open recruitment CV",
    langLabel: "EN",
    langAria: "Switch language"
  }
};

const CATEGORY_LABELS = {
  vi: {
    "Tất cả": "Tất cả",
    "Robot": "Robot",
    "Robot tự động": "Robot tự động",
    "Điều khiển": "Điều khiển",
    "Driver": "Driver",
    "PCB": "PCB",
    "App/Web": "App/Web"
  },
  en: {
    "Tất cả": "All",
    "Robot": "Robot",
    "Robot tự động": "Autonomous Robot",
    "Điều khiển": "Control",
    "Driver": "Driver",
    "PCB": "PCB",
    "App/Web": "App/Web"
  }
};

const state = {
  data: FALLBACK_DATA,
  filter: "Tất cả",
  activeProduct: null,
  activeMediaIndex: 0,
  lang: localStorage.getItem("site-lang") === "en" ? "en" : "vi"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function t(key) {
  return (UI_TEXT[state.lang] && UI_TEXT[state.lang][key]) || UI_TEXT.vi[key] || key;
}

function text(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localizedObject(object = {}) {
  if (state.lang === "en" && object.en && typeof object.en === "object") {
    return { ...object, ...object.en };
  }
  return object;
}

function localizedArray(items = []) {
  return items.map((item) => localizedObject(item));
}

function localizedProduct(product = {}) {
  return localizedObject(product);
}

function categoryLabel(category = "") {
  return CATEGORY_LABELS[state.lang][category] || category || t("productFallback");
}

function initials(name = "HVK") {
  const words = String(name)
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean);
  if (!words.length) return "HVK";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.slice(-3).map((word) => word[0]).join("").toUpperCase();
}

function placeholderLabel(product = {}) {
  const categoryMap = {
    "PCB": "PCB",
    "Driver": "DRV",
    "Điều khiển": "CTRL",
    "Robot": "BOT",
    "Robot tự động": "AUTO",
    "App/Web": "APP"
  };
  return product.placeholder || categoryMap[product.category] || initials(product.name || "HVK");
}

function splitGraphemes(value = "") {
  if (window.Intl && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(value), (part) => part.segment);
  }
  return Array.from(value);
}

function animateHeroName(name = "Hoàng Văn Khải") {
  const title = $("#hero-title");
  if (!title) return;

  const finalName = text(name, "Hoàng Văn Khải");
  title.setAttribute("aria-label", finalName);

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    title.textContent = finalName;
    title.classList.remove("is-typing");
    return;
  }

  const letters = splitGraphemes(finalName);
  title.textContent = "";
  title.classList.add("is-typing");
  title.classList.remove("is-typed");

  let index = 0;
  const writeNext = () => {
    title.textContent += letters[index] || "";
    index += 1;

    if (index < letters.length) {
      window.setTimeout(writeNext, index === 1 ? 150 : 75);
    } else {
      window.setTimeout(() => {
        title.classList.remove("is-typing");
        title.classList.add("is-typed");
      }, 650);
    }
  };

  window.setTimeout(writeNext, 250);
}

function firstValidMedia(product) {
  return text(product.cover) || (product.images || []).find(Boolean) || "";
}

function productMediaItems(product) {
  const items = [];
  (product.videos || []).filter(Boolean).forEach((src) => items.push({ type: "video", src }));
  (product.images || []).filter(Boolean).forEach((src) => items.push({ type: "image", src }));
  return items;
}

function isYouTube(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}

function youtubeEmbed(url = "") {
  try {
    const parsed = new URL(url, window.location.href);
    let id = "";
    if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.replace("/", "");
    if (parsed.hostname.includes("youtube.com")) id = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

async function loadData() {
  try {
    const response = await fetch("assets/site.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Không tải được site.json: ${response.status}`);
    state.data = await response.json();
  } catch (error) {
    console.warn(error);
    state.data = FALLBACK_DATA;
  }
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  const navProducts = $("#nav-products");
  const navContact = $("#nav-contact");
  const navCv = $("#nav-cv");
  const productsEyebrow = $("#products .eyebrow");
  const contactEyebrow = $("#contact .eyebrow");
  const contactTitle = $("#contact-title");
  const footerTop = $("#footer-top");
  const langToggle = $("#lang-toggle");
  const modalClose = $(".modal-close");

  if (navProducts) navProducts.textContent = t("navProducts");
  if (navContact) navContact.textContent = t("navContact");
  if (navCv) navCv.textContent = t("navCv");
  if (productsEyebrow) productsEyebrow.textContent = t("productsEyebrow");
  if (contactEyebrow) contactEyebrow.textContent = t("contactEyebrow");
  if (contactTitle) contactTitle.textContent = t("contactTitle");
  if (footerTop) footerTop.textContent = t("footerTop");
  if (langToggle) {
    langToggle.textContent = t("langLabel");
    langToggle.setAttribute("aria-label", t("langAria"));
    langToggle.setAttribute("title", t("langAria"));
  }
  if (modalClose) modalClose.setAttribute("aria-label", state.lang === "en" ? "Close product details" : "Đóng chi tiết sản phẩm");
}

function renderProfile() {
  const profileRaw = state.data.profile || FALLBACK_DATA.profile;
  const profile = localizedObject(profileRaw);

  document.title = `${profileRaw.name || "Hoàng Văn Khải"} | ${state.lang === "en" ? "Technical Product Portfolio" : "Portfolio sản phẩm kỹ thuật"}`;
  $("#profile-badge").textContent = text(profile.badge, state.lang === "en" ? "Technical Product Portfolio" : "Portfolio sản phẩm kỹ thuật");
  $("#hero-title").textContent = text(profileRaw.name, "Hoàng Văn Khải");
  $("#profile-title").textContent = text(profile.title, t("projectFallback"));
  $("#profile-summary").textContent = text(profile.summary, FALLBACK_DATA.profile.summary);
  $("#profile-name-card").textContent = text(profileRaw.name, "Hoàng Văn Khải");
  $("#profile-meta").textContent = [profile.major, profile.school].filter(Boolean).join(" · ") || "Tự động hóa · UNETI";

  const brandName = $(".brand strong");
  if (brandName) brandName.textContent = text(profileRaw.name, "Hoàng Văn Khải");

  const avatar = $("#profile-avatar");
  if (text(profileRaw.avatar)) {
    avatar.innerHTML = `<img src="${escapeHTML(profileRaw.avatar)}" alt="${state.lang === "en" ? "Avatar" : "Ảnh đại diện"} ${escapeHTML(profileRaw.name)}" />`;
  } else {
    avatar.textContent = text(profileRaw.shortName, initials(profileRaw.name));
  }

  const actions = profile.actions || FALLBACK_DATA.profile.actions;
  $("#profile-actions").innerHTML = actions.map((action) => {
    const style = ["primary", "secondary", "ghost"].includes(action.style) ? action.style : "ghost";
    return `<a class="btn btn-${style}" href="${escapeHTML(action.href || "#")}">${escapeHTML(action.label || "Xem")}</a>`;
  }).join("");

  const quickInfo = profile.highlights || [];
  $("#quick-info").innerHTML = quickInfo.map((item) => `
    <div>
      <dt>${escapeHTML(item.label)}</dt>
      <dd>${escapeHTML(item.value)}</dd>
    </div>
  `).join("");
}

function categories() {
  const values = Array.from(new Set((state.data.products || []).map((product) => product.category).filter(Boolean)));
  const preferred = ["Robot", "Robot tự động", "Điều khiển", "Driver", "PCB", "App/Web"];
  const ordered = preferred.filter((category) => values.includes(category));
  const others = values.filter((category) => !preferred.includes(category));
  return ["Tất cả", ...ordered, ...others];
}

function renderFilters() {
  const bar = $("#filter-bar");
  const cats = categories();
  if (cats.length <= 2) {
    bar.innerHTML = "";
    return;
  }
  bar.innerHTML = cats.map((category) => `
    <button class="filter-chip ${category === state.filter ? "is-active" : ""}" type="button" data-filter="${escapeHTML(category)}">
      ${escapeHTML(categoryLabel(category))}
    </button>
  `).join("");

  $$("[data-filter]", bar).forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter || "Tất cả";
      renderFilters();
      renderProducts();
    });
  });
}

function renderProductsIntro() {
  const introRaw = state.data.productsIntro || FALLBACK_DATA.productsIntro;
  const intro = localizedObject(introRaw);
  $("#products-title").textContent = text(intro.title, t("productsTitle"));

  const subtitleEl = $("#products-subtitle");
  const subtitle = typeof intro.subtitle === "string" ? intro.subtitle.trim() : "";
  if (subtitle) {
    subtitleEl.textContent = subtitle;
    subtitleEl.hidden = false;
  } else {
    subtitleEl.textContent = "";
    subtitleEl.hidden = true;
  }
}

function filteredProducts() {
  const products = state.data.products || [];
  if (state.filter === "Tất cả") return products;
  return products.filter((product) => product.category === state.filter);
}

function renderProducts() {
  const grid = $("#products-grid");
  const products = filteredProducts();

  if (!products.length) {
    grid.innerHTML = `<div class="notice">${t("noProducts")}</div>`;
    return;
  }

  grid.innerHTML = products.map((productRaw) => {
    const product = localizedProduct(productRaw);
    const cover = firstValidMedia(productRaw);
    const topTech = (product.tech || productRaw.tech || []).slice(0, 4);
    return `
      <article class="product-card">
        <div class="product-media">
          ${cover ? `<img src="${escapeHTML(cover)}" alt="${escapeHTML(t("mediaAlt"))} ${escapeHTML(product.name)}" loading="lazy" onerror="this.remove()" />` : `<span class="placeholder-art">${escapeHTML(placeholderLabel(productRaw))}</span>`}
          <span class="product-badge">${escapeHTML(categoryLabel(productRaw.category))}</span>
        </div>
        <div class="product-body">
          <div class="product-status">${escapeHTML(product.status || t("projectFallback"))}</div>
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.short || product.description || "")}</p>
          <ul class="tech-list">
            ${topTech.map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}
          </ul>
          <button class="btn btn-secondary" type="button" data-product-id="${escapeHTML(productRaw.id)}">${escapeHTML(t("viewDetail"))}</button>
        </div>
      </article>
    `;
  }).join("");

  $$('[data-product-id]', grid).forEach((button) => {
    button.addEventListener("click", () => openProduct(button.dataset.productId));
  });
}

function renderContact() {
  const profileRaw = state.data.profile || FALLBACK_DATA.profile;
  const profile = localizedObject(profileRaw);
  const contactRaw = state.data.contact && state.data.contact.length ? state.data.contact : [
    { label: t("phone"), value: profileRaw.phone, href: `tel:${profileRaw.phone}` },
    { label: "Email", value: profileRaw.email, href: `mailto:${profileRaw.email}` },
    { label: "GitHub", value: profileRaw.github, href: profileRaw.github },
    { label: "CV", value: t("openCv"), href: profileRaw.cv }
  ].filter((item) => item.value);
  const contact = localizedArray(contactRaw);

  $("#contact-grid").innerHTML = contact.map((item) => `
    <a class="contact-card" href="${escapeHTML(item.href || "#")}" target="${/^https?:/.test(item.href || "") ? "_blank" : "_self"}" rel="noreferrer">
      <small>${escapeHTML(item.label)}</small>
      <strong>${escapeHTML(item.value)}</strong>
    </a>
  `).join("");
}

function mediaHTML(productRaw) {
  const product = localizedProduct(productRaw);
  const items = productMediaItems(productRaw);
  const current = items[state.activeMediaIndex] || null;

  if (!current) {
    return `
      <div class="empty-media">
        <div>
          <strong>${escapeHTML(placeholderLabel(productRaw))}</strong>
          <p>${t("emptyMedia")}</p>
        </div>
      </div>
    `;
  }

  if (current.type === "image") {
    return `<img src="${escapeHTML(current.src)}" alt="${escapeHTML(t("mediaAlt"))} ${escapeHTML(product.name)}" />`;
  }

  if (isYouTube(current.src)) {
    return `<iframe src="${escapeHTML(youtubeEmbed(current.src))}" title="${escapeHTML(t("video"))} ${escapeHTML(product.name)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }

  return `<video src="${escapeHTML(current.src)}" controls playsinline></video>`;
}

function renderMediaThumbs(productRaw) {
  const items = productMediaItems(productRaw);
  if (items.length <= 1) return "";

  return `
    <div class="media-thumbs">
      ${items.map((item, index) => `
        <button class="media-thumb" type="button" data-media-index="${index}" aria-label="${escapeHTML(t("viewDetail"))} ${index + 1}">
          ${item.type === "image"
            ? `<img src="${escapeHTML(item.src)}" alt="${escapeHTML(t("thumbnail"))} ${index + 1}" loading="lazy" />`
            : `<span>${escapeHTML(t("video"))} ${index + 1}</span>`}
        </button>
      `).join("")}
    </div>
  `;
}

function listHTML(items = []) {
  if (!items.length) return `<p>${escapeHTML(t("notUpdated"))}</p>`;
  return `<ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function linksHTML(links = []) {
  if (!links.length) return "";
  return `
    <div class="link-row">
      ${links.map((link) => `<a class="btn btn-ghost" href="${escapeHTML(link.href || "#")}" target="_blank" rel="noreferrer">${escapeHTML(link.label || t("openLink"))}</a>`).join("")}
    </div>
  `;
}

function renderModal() {
  const productRaw = state.activeProduct;
  if (!productRaw) return;
  const product = localizedProduct(productRaw);

  const modalContent = $("#modal-content");
  modalContent.innerHTML = `
    <div class="modal-hero">
      <div class="modal-media-stack">
        <div class="modal-media-main">${mediaHTML(productRaw)}</div>
        ${renderMediaThumbs(productRaw)}
      </div>
      <div class="modal-copy">
        <div class="modal-kicker">
          <span>${escapeHTML(categoryLabel(productRaw.category))}</span>
          <span>${escapeHTML(product.status || t("projectFallback"))}</span>
        </div>
        <h2 id="modal-title">${escapeHTML(product.name)}</h2>
        <p>${escapeHTML(product.description || product.short || "")}</p>
        <ul class="modal-tags">
          ${(product.tech || []).map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}
        </ul>
        ${linksHTML(product.links)}
      </div>
    </div>
    <div class="detail-grid">
      <section class="detail-card">
        <h3>${escapeHTML(t("roleTitle"))}</h3>
        ${listHTML(product.role)}
      </section>
      <section class="detail-card">
        <h3>${escapeHTML(t("featuresTitle"))}</h3>
        ${listHTML(product.features)}
      </section>
      <section class="detail-card full">
        <h3>${escapeHTML(t("resultTitle"))}</h3>
        <p>${escapeHTML(product.result || t("defaultResult"))}</p>
      </section>
    </div>
  `;

  $$('[data-media-index]', modalContent).forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMediaIndex = Number(button.dataset.mediaIndex || 0);
      renderModal();
    });
  });
}

function openProduct(id) {
  const product = (state.data.products || []).find((item) => item.id === id);
  if (!product) return;
  state.activeProduct = product;
  state.activeMediaIndex = 0;
  renderModal();
  const modal = $("#product-modal");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const closeButton = $("[data-close-modal]", modal);
  if (closeButton) closeButton.focus({ preventScroll: true });
}

function closeModal() {
  const modal = $("#product-modal");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  state.activeProduct = null;
}

function renderAll({ animateName = false } = {}) {
  renderStaticText();
  renderProfile();
  if (animateName) animateHeroName((state.data.profile || FALLBACK_DATA.profile).name);
  renderProductsIntro();
  renderFilters();
  renderProducts();
  renderContact();
  if (state.activeProduct) renderModal();
}

function setLanguage(nextLang) {
  state.lang = nextLang === "en" ? "en" : "vi";
  localStorage.setItem("site-lang", state.lang);
  renderAll({ animateName: false });
}

function bindGlobalEvents() {
  $$('[data-close-modal]').forEach((item) => item.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  const langToggle = $("#lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => setLanguage(state.lang === "vi" ? "en" : "vi"));
  }
}

async function init() {
  await loadData();
  renderAll({ animateName: true });
  bindGlobalEvents();
  $("#year").textContent = new Date().getFullYear();
}

init();
