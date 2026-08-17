/**
 * TechNova Learning Hub - MVC Controller Layer: PlayerController
 * Powers the Interactive Course Classroom, Lesson Navigation, Code Runner & Quiz Grader
 */

const PlayerController = {
  currentCourse: null,
  currentModule: null,
  currentLesson: null,

  init() {
    this.loadCourseFromUrl();
    this.bindEvents();
  },

  loadCourseFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId") || "course-html-css";
    const lessonId = params.get("lessonId");

    this.currentCourse = window.CourseModel ? CourseModel.getById(courseId) : null;
    if (!this.currentCourse) return;

    // Find requested lesson or default to first
    let foundLesson = null;
    let foundModule = null;

    for (const mod of this.currentCourse.modules) {
      for (const les of mod.lessons) {
        if (lessonId && les.id === lessonId) {
          foundLesson = les;
          foundModule = mod;
          break;
        }
      }
      if (foundLesson) break;
    }

    if (!foundLesson && this.currentCourse.modules[0]?.lessons[0]) {
      foundModule = this.currentCourse.modules[0];
      foundLesson = this.currentCourse.modules[0].lessons[0];
    }

    this.currentModule = foundModule;
    this.currentLesson = foundLesson;

    this.renderClassroom();
  },

  bindEvents() {
    // Tab switching in player (Reading vs Code Exercise vs Quiz)
    document.querySelectorAll(".player-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Run code button
    document.getElementById("player-run-code-btn")?.addEventListener("click", () => {
      this.executeExerciseCode();
    });

    // Reset code button
    document.getElementById("player-reset-code-btn")?.addEventListener("click", () => {
      this.resetExerciseCode();
    });
  },

  switchTab(tabName) {
    document.querySelectorAll(".player-tab-btn").forEach(b => {
      if (b.dataset.tab === tabName) {
        b.className = "player-tab-btn px-4 py-2 text-xs font-bold text-cyan-400 border-b-2 border-cyan-400 transition-colors";
      } else {
        b.className = "player-tab-btn px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors";
      }
    });

    document.getElementById("tab-pane-reading")?.classList.toggle("hidden", tabName !== "reading");
    document.getElementById("tab-pane-code")?.classList.toggle("hidden", tabName !== "code");
    document.getElementById("tab-pane-quiz")?.classList.toggle("hidden", tabName !== "quiz");
  },

  renderClassroom() {
    if (!this.currentCourse || !this.currentLesson) return;

    // 1. Update Header Info
    const courseTitleEl = document.getElementById("player-course-title");
    const lessonTitleEl = document.getElementById("player-lesson-title");
    const lessonMetaEl = document.getElementById("player-lesson-meta");

    if (courseTitleEl) courseTitleEl.textContent = this.currentCourse.title;
    if (lessonTitleEl) lessonTitleEl.textContent = this.currentLesson.title;
    if (lessonMetaEl) lessonMetaEl.textContent = `${this.currentModule.title} • ${this.currentLesson.duration}`;

    // 2. Render Sidebar Curriculum Tree
    this.renderSidebarTree();

    // 3. Render Lesson Reading Content
    const readingPane = document.getElementById("tab-pane-reading");
    if (readingPane) {
      readingPane.innerHTML = `
        <div class="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4">
          ${this.currentLesson.content}
        </div>
      `;
    }

    // 4. Render Code Exercise
    const codeInput = document.getElementById("player-code-editor");
    if (codeInput && this.currentLesson.codeExercise) {
      codeInput.value = this.currentLesson.codeExercise.initialCode;
      this.executeExerciseCode();
    }

    // 5. Render Quiz
    this.renderQuiz();

    // 6. Calculate and display overall course progress %
    this.updateProgressMetrics();
  },

  renderSidebarTree() {
    const sidebar = document.getElementById("player-curriculum-tree");
    if (!sidebar) return;

    const completedLessonIds = StorageService.getCompletedLessons(this.currentCourse.id);

    sidebar.innerHTML = this.currentCourse.modules.map(mod => `
      <div class="mb-4">
        <div class="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-900/90 rounded-xl border border-slate-800/80 mb-2 flex items-center justify-between">
          <span class="truncate">${mod.title}</span>
          <span class="text-[10px] text-slate-500 font-mono">${mod.lessons.length} Lessons</span>
        </div>
        <div class="space-y-1 pl-1">
          ${mod.lessons.map(l => {
            const isActive = l.id === this.currentLesson.id;
            const isDone = completedLessonIds.includes(l.id);

            return `
              <button onclick="PlayerController.selectLesson('${l.id}')" class="w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2.5 ${isActive ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/50' : 'text-slate-300 hover:bg-slate-800/60'}">
                <i class="fa-solid ${isDone ? 'fa-circle-check text-emerald-400' : (isActive ? 'fa-circle-dot text-cyan-400' : 'fa-circle-play text-slate-500')} text-sm shrink-0"></i>
                <span class="truncate flex-1">${l.title}</span>
                <span class="text-[10px] text-slate-500 font-mono">${l.duration}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");
  },

  selectLesson(lessonId) {
    for (const mod of this.currentCourse.modules) {
      const les = mod.lessons.find(l => l.id === lessonId);
      if (les) {
        this.currentModule = mod;
        this.currentLesson = les;
        break;
      }
    }
    this.renderClassroom();
  },

  executeExerciseCode() {
    const code = document.getElementById("player-code-editor")?.value || "";
    const iframe = document.getElementById("player-code-preview");
    if (!iframe) return;

    const source = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-900 text-white p-4 font-sans">
          ${code}
        </body>
      </html>
    `;

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(source);
    doc.close();
  },

  resetExerciseCode() {
    const codeInput = document.getElementById("player-code-editor");
    if (codeInput && this.currentLesson?.codeExercise) {
      codeInput.value = this.currentLesson.codeExercise.initialCode;
      this.executeExerciseCode();
      if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast("Code reset to template.", "info");
    }
  },

  renderQuiz() {
    const quizPane = document.getElementById("tab-pane-quiz");
    if (!quizPane || !this.currentLesson.quiz) {
      if (quizPane) quizPane.innerHTML = `<p class="text-xs text-slate-500">No quiz attached to this lesson.</p>`;
      return;
    }

    const quiz = this.currentLesson.quiz;

    quizPane.innerHTML = `
      <div class="max-w-xl mx-auto p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div>
          <span class="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">Knowledge Check</span>
          <h3 class="text-lg font-bold text-white mt-2">${quiz.question}</h3>
        </div>

        <div class="space-y-2.5" id="quiz-options-container">
          ${quiz.options.map((opt, i) => `
            <button onclick="PlayerController.checkQuizAnswer(${i})" class="quiz-option-btn w-full text-left p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between group">
              <span>${opt}</span>
              <span class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:text-white">${String.fromCharCode(65 + i)}</span>
            </button>
          `).join("")}
        </div>

        <div id="quiz-feedback-box" class="hidden p-4 rounded-2xl text-xs leading-relaxed"></div>
      </div>
    `;
  },

  checkQuizAnswer(selectedIndex) {
    const quiz = this.currentLesson.quiz;
    if (!quiz) return;

    const feedbackBox = document.getElementById("quiz-feedback-box");
    const optionButtons = document.querySelectorAll(".quiz-option-btn");

    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === quiz.correctIndex) {
        btn.classList.add("bg-emerald-950", "border-emerald-500", "text-emerald-300");
      } else if (idx === selectedIndex) {
        btn.classList.add("bg-rose-950", "border-rose-500", "text-rose-300");
      }
    });

    if (feedbackBox) {
      feedbackBox.classList.remove("hidden");
      if (selectedIndex === quiz.correctIndex) {
        feedbackBox.className = "p-4 rounded-2xl text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-200";
        feedbackBox.innerHTML = `<strong class="font-bold block mb-1">🎉 Correct Answer! (+50 XP)</strong>${quiz.explanation}`;
        if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast("Correct Answer! +50 XP", "success");
      } else {
        feedbackBox.className = "p-4 rounded-2xl text-xs bg-rose-950/60 border border-rose-500/40 text-rose-200";
        feedbackBox.innerHTML = `<strong class="font-bold block mb-1">Incorrect.</strong>${quiz.explanation}`;
      }
    }
  },

  markCurrentLessonComplete() {
    if (!this.currentCourse || !this.currentLesson) return;

    StorageService.markLessonComplete(this.currentCourse.id, this.currentLesson.id);
    
    // Update user profile in storage
    const user = StorageService.getCurrentUser();
    if (user) {
      if (!user.progress) user.progress = {};
      const totalLessons = this.currentCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0);
      const completedCount = StorageService.getCompletedLessons(this.currentCourse.id).length;
      const pct = Math.round((completedCount / totalLessons) * 100);
      
      user.progress[this.currentCourse.id] = pct;
      user.points = (user.points || 0) + 100;

      if (pct >= 100) {
        if (!user.certificates) user.certificates = [];
        const exists = user.certificates.some(c => c.courseId === this.currentCourse.id);
        if (!exists) {
          user.certificates.push({
            id: "CERT-TN-" + Math.floor(1000 + Math.random() * 9000),
            courseId: this.currentCourse.id,
            courseTitle: this.currentCourse.title,
            issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            grade: "99% (Mastery)"
          });
        }
      }
      StorageService.saveCurrentUser(user);
    }

    if (typeof TechNovaMain !== "undefined") {
      TechNovaMain.showToast("Lesson completed! Progress saved to your Dashboard.", "success");
    }

    this.renderSidebarTree();
    this.updateProgressMetrics();
    this.goToNextLesson();
  },

  goToNextLesson() {
    let nextFound = false;
    let nextLesson = null;
    let nextModule = null;

    for (const mod of this.currentCourse.modules) {
      for (const les of mod.lessons) {
        if (nextFound) {
          nextLesson = les;
          nextModule = mod;
          break;
        }
        if (les.id === this.currentLesson.id) {
          nextFound = true;
        }
      }
      if (nextLesson) break;
    }

    if (nextLesson) {
      this.currentModule = nextModule;
      this.currentLesson = nextLesson;
      this.renderClassroom();
    } else {
      if (typeof TechNovaMain !== "undefined") {
        TechNovaMain.showToast("🏆 You have completed all lessons in this course! Check your Dashboard for your Certificate.", "success");
      }
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    }
  },

  updateProgressMetrics() {
    const totalLessons = this.currentCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completed = StorageService.getCompletedLessons(this.currentCourse.id).length;
    const pct = Math.min(100, Math.round((completed / totalLessons) * 100));

    const barEl = document.getElementById("player-progress-bar");
    const pctEl = document.getElementById("player-progress-pct");

    if (barEl) barEl.style.width = `${pct}%`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  PlayerController.init();
});

window.PlayerController = PlayerController;
