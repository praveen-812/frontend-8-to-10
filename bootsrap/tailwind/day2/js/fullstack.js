/**
 * TechNova Learning Hub - Full-Stack Department & Live Code Sandbox Controller
 */

const TechNovaFullStack = {
  defaultCodePresets: {
    html_css: {
      html: `<div class="card">
  <div class="badge">TechNova Live</div>
  <h2>Interactive Frontend</h2>
  <p>Modify this code live and watch the preview update instantly!</p>
  <button id="demo-btn">Click Me!</button>
</div>`,
      css: `body {
  margin: 0;
  padding: 24px;
  background: #0f172a;
  font-family: system-ui, -apple-system, sans-serif;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  border-color: #06b6d4;
}
.badge {
  display: inline-block;
  background: rgba(6, 182, 212, 0.15);
  color: #06b6d4;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 9999px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
h2 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #38bdf8;
}
p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
}
button {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 16px;
  transition: opacity 0.2s;
}
button:hover {
  opacity: 0.9;
}`,
      js: `document.getElementById('demo-btn').addEventListener('click', () => {
  alert('🚀 TechNova Interactive Playground: Code is running perfectly!');
});`
    },
    tailwind_js: {
      html: `<div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
  <div class="p-6 max-w-sm w-full bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl text-center">
    <div class="w-12 h-12 mx-auto mb-4 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold">
      ⚡
    </div>
    <h3 class="text-xl font-black text-white">Tailwind Utility Engine</h3>
    <p class="text-xs text-slate-400 mt-2">Zero CSS classes required in external files. Fast and modern.</p>
    <div class="mt-4 flex gap-2">
      <span class="flex-1 py-1.5 bg-slate-800 rounded-lg text-xs text-cyan-400 font-semibold">Responsive</span>
      <span class="flex-1 py-1.5 bg-slate-800 rounded-lg text-xs text-emerald-400 font-semibold">Dark Mode</span>
    </div>
  </div>
</div>`,
      css: `/* Tailwind is loaded via script */`,
      js: `console.log("Tailwind UI Sandbox Ready");`
    }
  },

  init() {
    this.initLiveSandbox();
    this.renderFullstackTracks();
  },

  initLiveSandbox() {
    const runBtn = document.getElementById("sandbox-run-btn");
    const resetBtn = document.getElementById("sandbox-reset-btn");
    const presetSelect = document.getElementById("sandbox-preset-select");

    if (runBtn) {
      runBtn.addEventListener("click", () => this.runSandboxCode());
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.loadSandboxPreset("html_css"));
    }
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => this.loadSandboxPreset(e.target.value));
    }

    // Initial load
    if (document.getElementById("sandbox-html-input")) {
      this.loadSandboxPreset("html_css");
      this.runSandboxCode();
    }
  },

  loadSandboxPreset(key) {
    const preset = this.defaultCodePresets[key] || this.defaultCodePresets.html_css;
    const htmlInput = document.getElementById("sandbox-html-input");
    const cssInput = document.getElementById("sandbox-css-input");
    const jsInput = document.getElementById("sandbox-js-input");

    if (htmlInput) htmlInput.value = preset.html;
    if (cssInput) cssInput.value = preset.css;
    if (jsInput) jsInput.value = preset.js;

    this.runSandboxCode();
  },

  runSandboxCode() {
    const html = document.getElementById("sandbox-html-input")?.value || "";
    const css = document.getElementById("sandbox-css-input")?.value || "";
    const js = document.getElementById("sandbox-js-input")?.value || "";
    const iframe = document.getElementById("sandbox-preview-frame");

    if (!iframe) return;

    const source = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            try {
              ${js}
            } catch (err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(source);
    doc.close();

    if (typeof TechNovaMain !== "undefined") {
      TechNovaMain.showToast("Sandbox preview updated!", "success");
    }
  },

  renderFullstackTracks() {
    const container = document.getElementById("fullstack-tracks-grid");
    if (!container || !window.TechNovaData) return;

    const fsTechs = window.TechNovaData.technologies.filter(t => t.category === "fullstack");

    container.innerHTML = fsTechs.map(tech => `
      <div id="${tech.id}" class="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl border border-slate-700/80 shadow-md group-hover:scale-110 transition-transform">
              <i class="${tech.icon}"></i>
            </div>
            <span class="px-3 py-1 text-xs font-bold rounded-full ${tech.badgeColor} border">${tech.level}</span>
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">${tech.name}</h3>
          <p class="text-slate-400 text-xs mt-2 line-clamp-2">${tech.description}</p>

          <div class="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
            <p class="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Key Concepts</p>
            <ul class="text-xs text-slate-300 space-y-1.5">
              ${tech.basicConcepts.slice(0, 3).map(c => `
                <li class="flex items-center gap-2 truncate">
                  <i class="fa-solid fa-angle-right text-cyan-400 text-[10px]"></i>
                  <span class="truncate">${c}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-medium">${tech.projects.length} Hands-on Labs</span>
          <button onclick="TechNovaFullStack.openTechModal('${tech.id}')" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white transition-colors">
            Deep Dive <i class="fa-solid fa-arrow-right text-[10px] ml-1"></i>
          </button>
        </div>
      </div>
    `).join("");
  },

  openTechModal(techId) {
    const tech = window.TechNovaData.technologies.find(t => t.id === techId);
    if (!tech) return;

    let modal = document.getElementById("tech-detail-modal");
    if (!modal) {
      const modalHtml = `
        <div id="tech-detail-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden">
          <div class="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div id="tech-detail-modal-body" class="p-6 overflow-y-auto"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      modal = document.getElementById("tech-detail-modal");
    }

    const body = document.getElementById("tech-detail-modal-body");
    body.innerHTML = `
      <div class="flex items-start justify-between pb-4 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-slate-700">
            <i class="${tech.icon}"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-black text-white">${tech.name} Curriculum Track</h2>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full ${tech.badgeColor} border">${tech.level}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${tech.description}</p>
          </div>
        </div>
        <button onclick="document.getElementById('tech-detail-modal').classList.add('hidden')" class="text-slate-400 hover:text-white text-xl p-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-seedling"></i> Beginner Fundamentals
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            ${tech.basicConcepts.map(c => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-400 mt-0.5 text-[10px]"></i><span>${c}</span></li>`).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-bolt"></i> Intermediate & Production
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            ${tech.intermediateConcepts.map(c => `<li class="flex items-start gap-2"><i class="fa-solid fa-star text-purple-400 mt-0.5 text-[10px]"></i><span>${c}</span></li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mb-6">
        <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Practical Code Example</h4>
        <div class="code-window">
          <pre class="p-4 text-xs font-mono overflow-x-auto text-slate-200"><code>${TechNovaMain.escapeHtml(tech.codeSnippet)}</code></pre>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-800">
        <span class="text-xs text-slate-400">Target Roles: <strong class="text-white">${tech.careerRoles.join(", ")}</strong></span>
        <button onclick="document.getElementById('tech-detail-modal').classList.add('hidden'); window.location.href='courses.html?filter=${tech.id}';" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">
          Explore Courses for ${tech.name} <i class="fa-solid fa-arrow-right ml-1"></i>
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TechNovaFullStack.init();
});

window.TechNovaFullStack = TechNovaFullStack;
