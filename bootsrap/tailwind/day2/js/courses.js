/**
 * TechNova Learning Hub - Courses Catalog Controller
 * Filtering, Search, Detailed Syllabus Modal & Enrollment Management
 */

const TechNovaCourses = {
  currentFilter: {
    category: "all",
    level: "all",
    search: ""
  },

  init() {
    this.checkUrlParams();
    this.bindEvents();
    this.renderCourses();
  },

  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get("filter");
    const dept = urlParams.get("dept");
    const id = urlParams.get("id");

    if (dept) this.currentFilter.category = dept;
    if (filter) this.currentFilter.search = filter;

    if (id) {
      setTimeout(() => this.openSyllabusModal(id), 200);
    }
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById("course-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.currentFilter.search = e.target.value;
        this.renderCourses();
      });
    }

    // Category pills
    document.querySelectorAll(".course-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".course-cat-btn").forEach(b => {
          b.classList.remove("bg-blue-600", "text-white");
          b.classList.add("bg-slate-800", "text-slate-300");
        });
        btn.classList.add("bg-blue-600", "text-white");
        btn.classList.remove("bg-slate-800", "text-slate-300");

        this.currentFilter.category = btn.dataset.cat;
        this.renderCourses();
      });
    });

    // Level selector
    const levelSelect = document.getElementById("course-level-select");
    if (levelSelect) {
      levelSelect.addEventListener("change", (e) => {
        this.currentFilter.level = e.target.value;
        this.renderCourses();
      });
    }
  },

  renderCourses() {
    const container = document.getElementById("courses-catalog-grid");
    const countDisplay = document.getElementById("courses-count-display");
    if (!container || !window.TechNovaData) return;

    let list = window.TechNovaData.courses;

    // Filter Category
    if (this.currentFilter.category !== "all") {
      list = list.filter(c => c.category === this.currentFilter.category);
    }

    // Filter Level
    if (this.currentFilter.level !== "all") {
      list = list.filter(c => c.level.toLowerCase().includes(this.currentFilter.level.toLowerCase()));
    }

    // Filter Search
    if (this.currentFilter.search.trim()) {
      const q = this.currentFilter.search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${list.length} structured courses`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16">
          <i class="fa-solid fa-graduation-cap text-5xl text-slate-700 mb-3"></i>
          <h3 class="text-xl font-bold text-white">No courses match your criteria</h3>
          <p class="text-sm text-slate-400 mt-1">Try resetting filters or searching for "Python", "FastAPI", or "AI"</p>
          <button onclick="TechNovaCourses.resetFilters()" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold">
            Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    const currentUser = window.TechNovaAuth ? TechNovaAuth.getCurrentUser() : null;
    const enrolledIds = currentUser?.enrolledCourses || [];

    container.innerHTML = list.map(course => {
      const isEnrolled = enrolledIds.includes(course.id);
      const userProgress = currentUser?.progress?.[course.id] || 0;

      return `
        <div class="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
          <div>
            <!-- Card Header -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl border border-slate-700/80 shadow-md group-hover:scale-110 transition-transform">
                <i class="${course.imageIcon}"></i>
              </div>
              <div class="flex flex-col items-end">
                <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                  ${course.badge}
                </span>
                <span class="text-[11px] text-slate-400 mt-1 font-medium">${course.level}</span>
              </div>
            </div>

            <!-- Title & Summary -->
            <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">${course.title}</h3>
            <p class="text-xs text-slate-400 mt-2 line-clamp-2">${course.summary}</p>

            <!-- Metrics -->
            <div class="flex items-center gap-4 mt-4 py-2 border-y border-slate-800/80 text-xs text-slate-400">
              <div class="flex items-center gap-1.5">
                <i class="fa-regular fa-clock text-cyan-400"></i> ${course.duration}
              </div>
              <div class="flex items-center gap-1.5">
                <i class="fa-solid fa-layer-group text-purple-400"></i> ${course.lessonsCount} Lessons
              </div>
              <div class="flex items-center gap-1 text-amber-400 ml-auto font-bold">
                <i class="fa-solid fa-star"></i> ${course.rating}
              </div>
            </div>

            <!-- Instructor -->
            <div class="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <i class="fa-solid fa-chalkboard-user text-slate-500"></i>
              <span class="truncate">${course.instructor}</span>
            </div>

            <!-- Progress Bar if enrolled -->
            ${isEnrolled ? `
              <div class="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-cyan-400">Your Progress</span>
                  <span class="text-white">${userProgress}%</span>
                </div>
                <div class="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" style="width: ${userProgress}%"></div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- CTA Buttons -->
          <div class="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
            <a href="course-details.html?id=${course.id}" class="flex-1 py-2 text-center text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 transition-colors">
              View Syllabus
            </a>
            <a href="course-player.html?courseId=${course.id}" class="flex-1 py-2 text-center text-xs font-bold text-white ${isEnrolled ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400'} rounded-xl shadow-md transition-all">
              ${isEnrolled ? '<i class="fa-solid fa-play mr-1"></i> Continue' : '<i class="fa-solid fa-graduation-cap mr-1"></i> Open Course'}
            </a>
          </div>
        </div>
      `;
    }).join("");
  },

  resetFilters() {
    this.currentFilter = { category: "all", level: "all", search: "" };
    const searchInput = document.getElementById("course-search-input");
    if (searchInput) searchInput.value = "";
    document.querySelectorAll(".course-cat-btn").forEach((b, i) => {
      if (i === 0) {
        b.classList.add("bg-blue-600", "text-white");
        b.classList.remove("bg-slate-800", "text-slate-300");
      } else {
        b.classList.remove("bg-blue-600", "text-white");
        b.classList.add("bg-slate-800", "text-slate-300");
      }
    });
    this.renderCourses();
  },

  openSyllabusModal(courseId) {
    const course = window.TechNovaData.courses.find(c => c.id === courseId);
    if (!course) return;

    let modal = document.getElementById("course-syllabus-modal");
    if (!modal) {
      const modalHtml = `
        <div id="course-syllabus-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden">
          <div class="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div id="course-syllabus-body" class="p-6 sm:p-8 overflow-y-auto"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      modal = document.getElementById("course-syllabus-modal");
    }

    const currentUser = window.TechNovaAuth ? TechNovaAuth.getCurrentUser() : null;
    const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);

    const body = document.getElementById("course-syllabus-body");
    body.innerHTML = `
      <div class="flex items-start justify-between pb-4 border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-slate-700">
            <i class="${course.imageIcon}"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-black text-white">${course.title}</h2>
              <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">${course.level}</span>
            </div>
            <p class="text-xs text-slate-400 mt-1">${course.summary}</p>
          </div>
        </div>
        <button onclick="document.getElementById('course-syllabus-modal').classList.add('hidden')" class="text-slate-400 hover:text-white text-xl p-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Course Highlights -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div class="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Duration</span>
          <span class="text-sm font-black text-cyan-400">${course.duration}</span>
        </div>
        <div class="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Total Lessons</span>
          <span class="text-sm font-black text-purple-400">${course.lessonsCount} Lessons</span>
        </div>
        <div class="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Rating</span>
          <span class="text-sm font-black text-amber-400">★ ${course.rating} / 5.0</span>
        </div>
        <div class="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span class="block text-slate-400 text-[10px] uppercase font-bold">Enrolled</span>
          <span class="text-sm font-black text-emerald-400">${course.studentsCount.toLocaleString()}+</span>
        </div>
      </div>

      <!-- Syllabus Modules -->
      <div class="space-y-4 mb-6">
        <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400">Curriculum & Syllabus Breakdown</h4>
        ${course.modules.map((mod, mIdx) => `
          <div class="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <h5 class="text-sm font-bold text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold">${mIdx + 1}</span>
              ${mod.title}
            </h5>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs text-slate-300">
              ${mod.lessons.map(l => `
                <li class="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/60">
                  <i class="fa-regular fa-circle-play text-cyan-400 text-[10px]"></i>
                  <span class="truncate">${l}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        `).join("")}
      </div>

      <!-- Instructor Info -->
      <div class="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/30 flex items-center gap-3 mb-6">
        <i class="fa-solid fa-user-tie text-2xl text-cyan-400"></i>
        <div>
          <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Instructor</span>
          <p class="text-sm font-bold text-white">${course.instructor}</p>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <button onclick="document.getElementById('course-syllabus-modal').classList.add('hidden')" class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
          Close
        </button>
        <button onclick="TechNovaCourses.handleEnroll('${course.id}'); document.getElementById('course-syllabus-modal').classList.add('hidden');" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">
          ${isEnrolled ? 'Go to Course Player' : 'Enroll Now & Start Learning'} <i class="fa-solid fa-arrow-right ml-1"></i>
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  handleEnroll(courseId) {
    if (!TechNovaAuth.requireAuth()) return;

    const user = TechNovaAuth.getCurrentUser();
    if (!user) return;

    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.progress) user.progress = {};

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      user.progress[courseId] = 5; // Starting progress
      TechNovaAuth.saveCurrentUser(user);
      TechNovaMain.showToast("Successfully enrolled! Track your progress on your Dashboard.", "success");
      this.renderCourses();
    } else {
      TechNovaMain.showToast("Opening enrolled course on your Dashboard...", "info");
      window.location.href = "dashboard.html";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TechNovaCourses.init();
});

window.TechNovaCourses = TechNovaCourses;
