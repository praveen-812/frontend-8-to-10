/**
 * TechNova Learning Hub - Real-World Projects Controller
 * Interactive Project Showcase, Architecture Viewer, SQL Schema & Interactive Demos
 */

const TechNovaProjects = {
  currentCategory: "all",
  currentDifficulty: "all",

  init() {
    this.checkUrlParams();
    this.bindEvents();
    this.renderProjects();
  },

  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      setTimeout(() => this.openProjectModal(id), 200);
    }
  },

  bindEvents() {
    // Category pills
    document.querySelectorAll(".project-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".project-cat-btn").forEach(b => {
          b.classList.remove("bg-blue-600", "text-white");
          b.classList.add("bg-slate-800", "text-slate-300");
        });
        btn.classList.add("bg-blue-600", "text-white");
        btn.classList.remove("bg-slate-800", "text-slate-300");

        this.currentCategory = btn.dataset.cat;
        this.renderProjects();
      });
    });

    // Difficulty filter
    const diffSelect = document.getElementById("project-diff-select");
    if (diffSelect) {
      diffSelect.addEventListener("change", (e) => {
        this.currentDifficulty = e.target.value;
        this.renderProjects();
      });
    }
  },

  renderProjects() {
    const container = document.getElementById("projects-grid-container");
    if (!container || !window.TechNovaData) return;

    let list = window.TechNovaData.projects;

    if (this.currentCategory !== "all") {
      list = list.filter(p => p.category === this.currentCategory);
    }

    if (this.currentDifficulty !== "all") {
      list = list.filter(p => p.difficulty.toLowerCase() === this.currentDifficulty.toLowerCase());
    }

    const currentUser = window.TechNovaAuth ? TechNovaAuth.getCurrentUser() : null;
    const completedIds = currentUser?.completedProjects || [];

    container.innerHTML = list.map(project => {
      const isCompleted = completedIds.includes(project.id);

      return `
        <div class="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
          <div>
            <!-- Header -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl border border-slate-700/80 shadow-md group-hover:scale-110 transition-transform">
                <i class="${project.icon}"></i>
              </div>
              <div class="flex items-center gap-2">
                ${isCompleted ? `
                  <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                    <i class="fa-solid fa-check mr-1"></i> Completed
                  </span>
                ` : ''}
                <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full ${project.difficulty === 'Beginner' ? 'bg-emerald-950 text-emerald-400 border-emerald-800/40' : 'bg-purple-950 text-purple-400 border-purple-800/40'} border">
                  ${project.difficulty}
                </span>
              </div>
            </div>

            <!-- Title & Description -->
            <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">${project.title}</h3>
            <p class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">${project.description}</p>

            <!-- Tech Stack Tags -->
            <div class="flex flex-wrap gap-1.5 mt-4">
              ${project.techStack.map(t => `
                <span class="px-2 py-0.5 bg-slate-800/80 rounded-md text-[11px] text-slate-300 font-mono border border-slate-700/50">
                  ${t}
                </span>
              `).join("")}
            </div>
          </div>

          <!-- Action Footer -->
          <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span class="text-[11px] text-slate-500 uppercase font-semibold">${project.category} Project</span>
            <button onclick="TechNovaProjects.openProjectModal('${project.id}')" class="px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5">
              View Project <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  openProjectModal(projId) {
    const project = window.TechNovaData.projects.find(p => p.id === projId);
    if (!project) return;

    let modal = document.getElementById("project-view-modal");
    if (!modal) {
      const modalHtml = `
        <div id="project-view-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden">
          <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div id="project-modal-body" class="p-6 sm:p-8 overflow-y-auto"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      modal = document.getElementById("project-view-modal");
    }

    const currentUser = window.TechNovaAuth ? TechNovaAuth.getCurrentUser() : null;
    const isCompleted = currentUser?.completedProjects?.includes(project.id);

    const body = document.getElementById("project-modal-body");
    body.innerHTML = `
      <div class="flex items-start justify-between pb-4 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-slate-700">
            <i class="${project.icon}"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-black text-white">${project.title}</h2>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">${project.difficulty}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${project.description}</p>
          </div>
        </div>
        <button onclick="document.getElementById('project-view-modal').classList.add('hidden')" class="text-slate-400 hover:text-white text-xl p-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Tech Stack Badges -->
      <div class="flex flex-wrap gap-2 my-4">
        <span class="text-xs text-slate-400 font-semibold my-auto mr-1">Stack:</span>
        ${project.techStack.map(t => `
          <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-xs text-cyan-300 font-mono border border-slate-700">
            ${t}
          </span>
        `).join("")}
      </div>

      <!-- Features & Architecture -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-list-check"></i> Core Features Built
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            ${project.features.map(f => `
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-emerald-400 mt-0.5 text-[10px]"></i>
                <span>${f}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <h4 class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
            <i class="fa-solid fa-diagram-project"></i> System Architecture
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${project.architecture}</p>
        </div>
      </div>

      <!-- SQL / Database Blueprint -->
      <div class="my-4">
        <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
          <i class="fa-solid fa-database"></i> Database Schema / State Model
        </h4>
        <div class="code-window">
          <pre class="p-4 text-xs font-mono overflow-x-auto text-slate-200"><code>${TechNovaMain.escapeHtml(project.dbSchema)}</code></pre>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
        <button onclick="TechNovaProjects.toggleProjectComplete('${project.id}')" class="px-4 py-2 rounded-xl text-xs font-bold ${isCompleted ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'} transition-all">
          <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : 'fa-circle-plus'} mr-1.5"></i>
          ${isCompleted ? 'Completed (Click to unmark)' : 'Mark as Completed in My Dashboard'}
        </button>

        <button onclick="document.getElementById('project-view-modal').classList.add('hidden')" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20">
          Done
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  toggleProjectComplete(projId) {
    if (!TechNovaAuth.requireAuth()) return;

    const user = TechNovaAuth.getCurrentUser();
    if (!user) return;

    if (!user.completedProjects) user.completedProjects = [];

    const index = user.completedProjects.indexOf(projId);
    if (index === -1) {
      user.completedProjects.push(projId);
      user.points = (user.points || 0) + 150;
      TechNovaAuth.saveCurrentUser(user);
      TechNovaMain.showToast("Project marked as completed! +150 Points added to your profile.", "success");
    } else {
      user.completedProjects.splice(index, 1);
      user.points = Math.max(0, (user.points || 0) - 150);
      TechNovaAuth.saveCurrentUser(user);
      TechNovaMain.showToast("Project unmarked from completed list.", "info");
    }

    this.renderProjects();
    this.openProjectModal(projId); // Refresh modal view
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TechNovaProjects.init();
});

window.TechNovaProjects = TechNovaProjects;
