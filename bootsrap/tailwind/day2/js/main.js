/**
 * TechNova Learning Hub - Global Main Controller
 * Theme Manager, Search Modal (Ctrl+K), Toast System, Tech Explorer & Navbars
 */

const TechNovaMain = {
  themeKey: "technova_theme",

  init() {
    this.initTheme();
    this.initSearchModal();
    this.initTechExplorer();
    this.initFaqAccordions();
    this.initActiveNavLinks();
    this.initMobileMenu();
    this.initKeyBindings();
  },

  // 1. Theme Management (Dark / Light)
  initTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      this.updateThemeIcons(true);
    } else {
      document.documentElement.classList.remove("dark");
      this.updateThemeIcons(false);
    }

    // Bind toggle buttons
    const themeToggles = document.querySelectorAll(".theme-toggle-btn");
    themeToggles.forEach(btn => {
      btn.addEventListener("click", () => this.toggleTheme());
    });
  },

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(this.themeKey, isDark ? "dark" : "light");
    this.updateThemeIcons(isDark);
    this.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, "info");
  },

  updateThemeIcons(isDark) {
    const icons = document.querySelectorAll(".theme-toggle-icon");
    icons.forEach(icon => {
      if (isDark) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun", "text-amber-400");
      } else {
        icon.classList.remove("fa-sun", "text-amber-400");
        icon.classList.add("fa-moon", "text-slate-600");
      }
    });
  },

  // 2. Global Toast Notification System
  showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-msg";

    let icon = "fa-circle-info text-blue-400";
    let bgStyle = "bg-slate-900 border border-slate-700 text-white";

    if (type === "success") {
      icon = "fa-circle-check text-emerald-400";
      bgStyle = "bg-slate-900 border border-emerald-500/40 text-emerald-100";
    } else if (type === "error") {
      icon = "fa-circle-exclamation text-rose-400";
      bgStyle = "bg-slate-900 border border-rose-500/40 text-rose-100";
    } else if (type === "ai") {
      icon = "fa-wand-magic-sparkles text-purple-400";
      bgStyle = "bg-slate-900 border border-purple-500/40 text-purple-100";
    }

    toast.className += ` ${bgStyle}`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-lg shrink-0"></i>
      <div class="flex-1 font-medium text-sm">${message}</div>
      <button class="text-slate-400 hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  },

  // 3. Global Search Modal (Ctrl+K / Cmd+K)
  initSearchModal() {
    this.injectSearchModal();
  },

  injectSearchModal() {
    if (document.getElementById("global-search-modal")) return;

    const modalHtml = `
      <div id="global-search-modal" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-950/80 backdrop-blur-md hidden">
        <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          <!-- Search Header -->
          <div class="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/90">
            <i class="fa-solid fa-magnifying-glass text-slate-400 text-lg ml-2"></i>
            <input id="global-search-input" type="text" placeholder="Search technologies, courses, AI concepts, projects..." class="flex-1 bg-transparent border-none text-white text-base focus:outline-none placeholder-slate-500">
            <span class="px-2 py-1 text-[11px] font-mono text-slate-400 bg-slate-800 rounded-md border border-slate-700">ESC</span>
            <button onclick="TechNovaMain.closeSearchModal()" class="text-slate-400 hover:text-white p-1 ml-1"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <!-- Quick Filters -->
          <div class="flex items-center gap-2 p-3 bg-slate-950/50 border-b border-slate-800/80 text-xs overflow-x-auto">
            <span class="text-slate-500 font-semibold uppercase text-[10px] tracking-wider shrink-0">Filter:</span>
            <button onclick="TechNovaMain.filterSearchResults('all')" class="search-filter-btn px-2.5 py-1 rounded-lg bg-blue-600 text-white font-medium">All</button>
            <button onclick="TechNovaMain.filterSearchResults('technologies')" class="search-filter-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white">Technologies</button>
            <button onclick="TechNovaMain.filterSearchResults('courses')" class="search-filter-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white">Courses</button>
            <button onclick="TechNovaMain.filterSearchResults('projects')" class="search-filter-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white">Projects</button>
            <button onclick="TechNovaMain.filterSearchResults('ai')" class="search-filter-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white">AI Concepts</button>
          </div>

          <!-- Search Results Container -->
          <div id="search-results-list" class="flex-1 p-4 overflow-y-auto space-y-2">
            <p class="text-xs text-slate-500 text-center py-8">Type keywords above to discover courses, code blueprints, and AI modules.</p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const input = document.getElementById("global-search-input");
    input?.addEventListener("input", (e) => this.handleSearchInput(e.target.value));
  },

  openSearchModal() {
    const modal = document.getElementById("global-search-modal");
    if (modal) {
      modal.classList.remove("hidden");
      setTimeout(() => {
        const input = document.getElementById("global-search-input");
        if (input) {
          input.focus();
          this.handleSearchInput(input.value || "AI");
        }
      }, 50);
    }
  },

  closeSearchModal() {
    const modal = document.getElementById("global-search-modal");
    if (modal) modal.classList.add("hidden");
  },

  currentSearchCategory: "all",

  filterSearchResults(cat) {
    this.currentSearchCategory = cat;
    document.querySelectorAll(".search-filter-btn").forEach(btn => {
      btn.className = "search-filter-btn px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white";
    });
    event?.target?.classList.add("bg-blue-600", "text-white");
    event?.target?.classList.remove("bg-slate-800", "text-slate-300");

    const input = document.getElementById("global-search-input");
    this.handleSearchInput(input ? input.value : "");
  },

  handleSearchInput(query) {
    const resultsContainer = document.getElementById("search-results-list");
    if (!resultsContainer) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `<p class="text-xs text-slate-500 text-center py-8">Type keywords above to search across TechNova...</p>`;
      return;
    }

    if (!window.TechNovaData) return;

    let items = [];

    // Search Technologies
    if (this.currentSearchCategory === "all" || this.currentSearchCategory === "technologies" || this.currentSearchCategory === "ai") {
      window.TechNovaData.technologies.forEach(t => {
        if (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.whyLearn.toLowerCase().includes(q)) {
          items.push({
            type: t.category === "ai" ? "AI & Emerging Tech" : "Full-Stack Tech",
            title: t.name,
            desc: t.description,
            icon: t.icon,
            link: t.category === "ai" ? `ai.html#${t.id}` : `fullstack.html#${t.id}`,
            badge: t.level
          });
        }
      });
    }

    // Search Courses
    if (this.currentSearchCategory === "all" || this.currentSearchCategory === "courses") {
      window.TechNovaData.courses.forEach(c => {
        if (c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)) {
          items.push({
            type: "Structured Course",
            title: c.title,
            desc: `${c.duration} • ${c.lessonsCount} Lessons • ${c.instructor}`,
            icon: c.imageIcon,
            link: `courses.html?id=${c.id}`,
            badge: c.level
          });
        }
      });
    }

    // Search Projects
    if (this.currentSearchCategory === "all" || this.currentSearchCategory === "projects") {
      window.TechNovaData.projects.forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.techStack.join(" ").toLowerCase().includes(q)) {
          items.push({
            type: "Real-World Project",
            title: p.title,
            desc: p.description,
            icon: p.icon,
            link: `projects.html?id=${p.id}`,
            badge: p.difficulty
          });
        }
      });
    }

    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <i class="fa-solid fa-face-meh text-3xl text-slate-600 mb-2"></i>
          <p class="text-sm text-slate-400">No results found for "${query}"</p>
          <p class="text-xs text-slate-600 mt-1">Try searching for "Python", "HTML", "AI Agents", or "Generative AI"</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = items.slice(0, 10).map(item => `
      <a href="${item.link}" class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 transition-all group">
        <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700 text-lg">
          <i class="${item.icon}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-cyan-400 uppercase tracking-wider text-[10px]">${item.type}</span>
            <span class="text-xs text-slate-500">•</span>
            <span class="text-[10px] text-slate-400">${item.badge}</span>
          </div>
          <h4 class="text-sm font-bold text-white group-hover:text-cyan-300 truncate transition-colors">${item.title}</h4>
          <p class="text-xs text-slate-400 truncate mt-0.5">${item.desc}</p>
        </div>
        <i class="fa-solid fa-arrow-right text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all text-xs mr-1"></i>
      </a>
    `).join("");
  },

  // 4. Interactive Technology Explorer (Home page & Department Hub)
  initTechExplorer() {
    const tabsContainer = document.getElementById("tech-explorer-tabs");
    if (!tabsContainer || !window.TechNovaData) return;

    const techs = window.TechNovaData.technologies;

    // Render tab buttons
    tabsContainer.innerHTML = techs.map((t, idx) => `
      <button onclick="TechNovaMain.selectTechExplorer('${t.id}')" id="tech-tab-${t.id}" class="tech-tab-btn px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700/80 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600 transition-all shrink-0 flex items-center gap-2 ${idx === 0 ? 'active' : ''}">
        <i class="${t.icon}"></i> ${t.name}
      </button>
    `).join("");

    // Show initial technology
    this.selectTechExplorer(techs[0].id);
  },

  selectTechExplorer(techId) {
    if (!window.TechNovaData) return;
    const tech = window.TechNovaData.technologies.find(t => t.id === techId);
    if (!tech) return;

    // Update active tab buttons
    document.querySelectorAll(".tech-tab-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tech-tab-${techId}`)?.classList.add("active");

    const display = document.getElementById("tech-explorer-content");
    if (!display) return;

    display.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Details Column -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-3xl shadow-lg">
              <i class="${tech.icon}"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-2xl font-black text-white">${tech.name}</h3>
                <span class="px-2.5 py-0.5 text-xs font-bold rounded-full ${tech.badgeColor} border">${tech.level}</span>
              </div>
              <p class="text-slate-400 text-sm mt-0.5">${tech.description}</p>
            </div>
          </div>

          <!-- Why Learn Section -->
          <div class="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-2">
              <i class="fa-solid fa-lightbulb"></i> Why Learn ${tech.name}?
            </h4>
            <p class="text-sm text-slate-300 leading-relaxed">${tech.whyLearn}</p>
          </div>

          <!-- Concepts Tabs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Basic Concepts -->
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <i class="fa-solid fa-seedling"></i> Basic Concepts
              </h4>
              <ul class="space-y-2 text-xs text-slate-300">
                ${tech.basicConcepts.map(c => `
                  <li class="flex items-start gap-2">
                    <i class="fa-solid fa-check text-emerald-400 mt-0.5 text-[10px]"></i>
                    <span>${c}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <!-- Intermediate Concepts -->
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
                <i class="fa-solid fa-rocket"></i> Intermediate Concepts
              </h4>
              <ul class="space-y-2 text-xs text-slate-300">
                ${tech.intermediateConcepts.map(c => `
                  <li class="flex items-start gap-2">
                    <i class="fa-solid fa-bolt text-purple-400 mt-0.5 text-[10px]"></i>
                    <span>${c}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>

          <!-- Career Paths & Practical Projects -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs">
            <div>
              <span class="text-slate-400 font-semibold block mb-1">Career Roles:</span>
              <div class="flex flex-wrap gap-1.5">
                ${tech.careerRoles.map(r => `<span class="px-2 py-0.5 bg-slate-800 rounded-md text-slate-300 font-medium">${r}</span>`).join("")}
              </div>
            </div>
            <a href="${tech.category === 'ai' ? 'ai.html' : 'fullstack.html'}#${tech.id}" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all">
              Full Module Track <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>

        <!-- Right Code Preview Column -->
        <div class="lg:col-span-5">
          <div class="code-window">
            <div class="code-window-header">
              <div class="code-dots">
                <span class="code-dot red"></span>
                <span class="code-dot yellow"></span>
                <span class="code-dot green"></span>
              </div>
              <span class="text-xs font-mono text-slate-400">${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}_demo</span>
              <button onclick="TechNovaMain.copyCodeSnippet('${tech.id}')" class="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                <i class="fa-regular fa-copy"></i> Copy
              </button>
            </div>
            <pre class="p-4 text-xs font-mono overflow-x-auto text-slate-200 leading-relaxed max-h-[380px]"><code>${this.escapeHtml(tech.codeSnippet)}</code></pre>
          </div>
        </div>
      </div>
    `;
  },

  copyCodeSnippet(techId) {
    const tech = window.TechNovaData.technologies.find(t => t.id === techId);
    if (tech && navigator.clipboard) {
      navigator.clipboard.writeText(tech.codeSnippet);
      this.showToast(`Copied ${tech.name} code snippet to clipboard!`, "success");
    }
  },

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  },

  // 5. FAQ Accordion Handler
  initFaqAccordions() {
    const headers = document.querySelectorAll(".faq-header");
    headers.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const isOpen = item.classList.contains("open");
        
        // Close others in same container if desired
        document.querySelectorAll(".faq-item").forEach(other => other.classList.remove("open"));
        
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    });
  },

  // 6. Highlight Active Navbar Link
  initActiveNavLinks() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentPath || (currentPath === "" && href === "index.html")) {
        link.classList.add("text-cyan-400", "font-bold");
        link.classList.remove("text-slate-300");
      }
    });
  },

  // 7. Mobile Menu Toggle
  initMobileMenu() {
    const toggleBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu-drawer");
    const closeBtn = document.getElementById("mobile-menu-close-btn");

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    }
  },

  // 8. Keybindings (Ctrl+K or / to search)
  initKeyBindings() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.openSearchModal();
      }
      if (e.key === "Escape") {
        this.closeSearchModal();
        if (typeof TechNovaAuth !== "undefined") TechNovaAuth.closeAuthModal();
      }
    });
  }
};

// Auto initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  TechNovaMain.init();
});

window.TechNovaMain = TechNovaMain;
