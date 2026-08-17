/**
 * TechNova Learning Hub - Student Dashboard Controller
 * Dynamic Progress Calculations, Interactive Progress Updaters,
 * Real-time Certificate Generator (SVG/HTML + Print/Download) & Skill Breakdown
 */

const TechNovaDashboard = {
  init() {
    this.checkAuthentication();
    this.renderDashboard();
  },

  checkAuthentication() {
    const user = TechNovaAuth.getCurrentUser();
    const guestNotice = document.getElementById("dashboard-guest-notice");
    const mainContent = document.getElementById("dashboard-main-content");

    if (!user) {
      if (guestNotice) guestNotice.classList.remove("hidden");
      if (mainContent) mainContent.classList.add("hidden");
    } else {
      if (guestNotice) guestNotice.classList.add("hidden");
      if (mainContent) mainContent.classList.remove("hidden");
    }
  },

  renderDashboard() {
    const user = TechNovaAuth.getCurrentUser();
    if (!user) return;

    this.renderProfileBanner(user);
    this.renderStatsCards(user);
    this.renderEnrolledCourses(user);
    this.renderCertificates(user);
    this.renderRecommendedTechs(user);
  },

  renderProfileBanner(user) {
    const avatarEl = document.getElementById("dash-user-avatar");
    const nameEl = document.getElementById("dash-user-name");
    const emailEl = document.getElementById("dash-user-email");
    const phoneEl = document.getElementById("dash-user-phone");
    const roleEl = document.getElementById("dash-user-role");
    const streakEl = document.getElementById("dash-user-streak");
    const pointsEl = document.getElementById("dash-user-points");

    if (avatarEl) avatarEl.src = user.avatar;
    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (roleEl) roleEl.textContent = user.role;
    if (streakEl) streakEl.textContent = `${user.streakDays || 1} Days`;
    if (pointsEl) pointsEl.textContent = `${(user.points || 250).toLocaleString()} XP`;
  },

  renderStatsCards(user) {
    const enrolledCount = user.enrolledCourses?.length || 0;
    const completedProjCount = user.completedProjects?.length || 0;
    const certsCount = user.certificates?.length || 0;

    // Calculate average progress
    let totalProgress = 0;
    if (enrolledCount > 0 && user.progress) {
      const values = Object.values(user.progress);
      totalProgress = Math.round(values.reduce((a, b) => a + b, 0) / enrolledCount);
    }

    const statEnrolled = document.getElementById("stat-enrolled-count");
    const statProgress = document.getElementById("stat-avg-progress");
    const statProjects = document.getElementById("stat-projects-count");
    const statCerts = document.getElementById("stat-certs-count");

    if (statEnrolled) statEnrolled.textContent = enrolledCount;
    if (statProgress) statProgress.textContent = `${totalProgress}%`;
    if (statProjects) statProjects.textContent = completedProjCount;
    if (statCerts) statCerts.textContent = certsCount;
  },

  renderEnrolledCourses(user) {
    const container = document.getElementById("dash-courses-container");
    if (!container || !window.TechNovaData) return;

    const enrolledIds = user.enrolledCourses || [];
    if (enrolledIds.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
          <i class="fa-solid fa-book-open text-4xl text-slate-600 mb-3"></i>
          <h4 class="text-lg font-bold text-white">No Enrolled Courses Yet</h4>
          <p class="text-xs text-slate-400 mt-1 mb-4">Explore our Full-Stack & AI tracks to kickstart your journey.</p>
          <a href="courses.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all">
            Browse All Courses
          </a>
        </div>
      `;
      return;
    }

    const allCourses = window.TechNovaData.courses;
    const courses = allCourses.filter(c => enrolledIds.includes(c.id));

    container.innerHTML = courses.map(course => {
      const progress = user.progress?.[course.id] || 0;
      const isComplete = progress >= 100;

      return `
        <div class="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between mb-3">
              <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                <i class="${course.imageIcon}"></i>
              </div>
              <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full ${isComplete ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-cyan-950 text-cyan-400 border border-cyan-800/50'}">
                ${isComplete ? 'Completed 🎉' : 'In Progress'}
              </span>
            </div>
            <h4 class="text-base font-bold text-white">${course.title}</h4>
            <p class="text-xs text-slate-400 mt-1">${course.lessonsCount} Lessons • ${course.duration}</p>

            <!-- Progress Bar -->
            <div class="mt-4">
              <div class="flex justify-between text-xs font-semibold mb-1">
                <span class="text-slate-400">Mastery Level</span>
                <span class="${isComplete ? 'text-emerald-400' : 'text-cyan-400'}">${progress}%</span>
              </div>
              <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div class="h-full ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-400'} rounded-full transition-all duration-500" style="width: ${progress}%"></div>
              </div>
            </div>
          </div>

          <!-- Interactive Actions -->
          <div class="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <a href="course-player.html?courseId=${course.id}" class="px-3.5 py-1.5 rounded-xl ${isComplete ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'} text-[11px] font-bold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-play text-[10px]"></i> ${isComplete ? 'Review in Player' : 'Open Classroom Player'}
            </a>
            ${!isComplete ? `
              <button onclick="TechNovaDashboard.incrementCourseProgress('${course.id}', 25)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-cyan-300 transition-colors">
                <i class="fa-solid fa-check text-[10px] mr-1"></i> Quick +25%
              </button>
            ` : `
              <button onclick="TechNovaDashboard.viewCertificateForCourse('${course.id}')" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold transition-colors">
                <i class="fa-solid fa-award mr-1"></i> Certificate
              </button>
            `}
          </div>
        </div>
      `;
    }).join("");
  },

  incrementCourseProgress(courseId, step = 25) {
    const user = TechNovaAuth.getCurrentUser();
    if (!user) return;

    if (!user.progress) user.progress = {};
    const current = user.progress[courseId] || 0;
    const updated = Math.min(100, current + step);
    user.progress[courseId] = updated;

    if (updated === 100) {
      // Issue certificate if not already issued
      if (!user.certificates) user.certificates = [];
      const course = window.TechNovaData.courses.find(c => c.id === courseId);
      
      const alreadyHas = user.certificates.some(c => c.courseId === courseId);
      if (!alreadyHas && course) {
        const cert = {
          id: "CERT-TN-" + Math.floor(1000 + Math.random() * 9000),
          courseId: course.id,
          courseTitle: course.title,
          issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          grade: "98% (Exemplary Mastery)"
        };
        user.certificates.push(cert);
        user.points = (user.points || 0) + 300;
        TechNovaMain.showToast(`🎓 Congratulations! You completed "${course.title}" and earned an official Certificate!`, "success");
      }
    } else {
      user.points = (user.points || 0) + 50;
      TechNovaMain.showToast(`Lesson marked complete! Progress updated to ${updated}%.`, "info");
    }

    TechNovaAuth.saveCurrentUser(user);
    this.renderDashboard();
  },

  renderCertificates(user) {
    const container = document.getElementById("dash-certs-container");
    if (!container) return;

    const certs = user.certificates || [];
    if (certs.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-slate-500 text-xs">
          <i class="fa-solid fa-award text-3xl mb-2 text-slate-700"></i>
          <p>No certificates earned yet. Reach 100% completion in any course to unlock verified certificates!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = certs.map(cert => `
      <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-amber-500/30 shadow-lg flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/40">
            <i class="fa-solid fa-certificate"></i>
          </div>
          <div>
            <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest">${cert.id}</span>
            <h5 class="text-sm font-bold text-white">${cert.courseTitle}</h5>
            <p class="text-[11px] text-slate-400">Issued: ${cert.issueDate} • Grade: ${cert.grade}</p>
          </div>
        </div>
        <button onclick="TechNovaDashboard.displayCertificateModal('${cert.id}')" class="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md">
          <i class="fa-solid fa-eye mr-1"></i> Preview
        </button>
      </div>
    `).join("");
  },

  viewCertificateForCourse(courseId) {
    const user = TechNovaAuth.getCurrentUser();
    const cert = user?.certificates?.find(c => c.courseId === courseId);
    if (cert) {
      this.displayCertificateModal(cert.id);
    }
  },

  displayCertificateModal(certId) {
    const user = TechNovaAuth.getCurrentUser();
    const cert = user?.certificates?.find(c => c.id === certId);
    if (!cert) return;

    let modal = document.getElementById("certificate-view-modal");
    if (!modal) {
      const modalHtml = `
        <div id="certificate-view-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md hidden">
          <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-100">
            <div id="certificate-modal-body" class="p-4 sm:p-8 overflow-y-auto"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      modal = document.getElementById("certificate-view-modal");
    }

    const body = document.getElementById("certificate-modal-body");
    body.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <h3 class="text-xl font-bold text-white">Verified TechNova Certificate</h3>
          <p class="text-xs text-slate-400">Official proof of completion and full-stack/AI competency.</p>
        </div>
        <button onclick="document.getElementById('certificate-view-modal').classList.add('hidden')" class="text-slate-400 hover:text-white text-xl p-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Printable Certificate Canvas / Frame -->
      <div id="printable-certificate" class="certificate-frame p-8 sm:p-12 rounded-3xl text-center text-white relative overflow-hidden">
        <div class="certificate-inner-border p-6 sm:p-10 rounded-2xl relative z-10">
          
          <!-- Seal & Logo -->
          <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-2xl text-white shadow-lg">
              <i class="fa-solid fa-cube"></i>
            </div>
            <div class="text-left">
              <h2 class="text-xl font-black tracking-wider text-cyan-400 font-display">TECHNOVA</h2>
              <p class="text-[10px] tracking-widest text-slate-300 uppercase">Institute of Advanced Technology</p>
            </div>
          </div>

          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">Certificate of Technical Mastery</p>
          <p class="text-xs text-slate-300 mb-4">This is to officially certify that</p>
          
          <h1 class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white font-display my-3 border-b-2 border-amber-500/40 inline-block px-8 pb-2">
            ${user.name}
          </h1>

          <p class="text-xs text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            Has successfully fulfilled all curriculum requirements, hands-on lab assignments, and capstone projects for the professional certification track:
          </p>

          <h3 class="text-xl sm:text-2xl font-bold text-cyan-300 mt-3 font-display">
            ${cert.courseTitle}
          </h3>

          <p class="text-xs text-amber-400 font-mono mt-1 font-semibold">Grade: ${cert.grade}</p>

          <!-- Footer Details -->
          <div class="grid grid-cols-3 gap-4 pt-10 mt-8 border-t border-slate-700/80 text-xs">
            <div class="text-left">
              <span class="block text-[10px] text-slate-400 uppercase">Issue Date</span>
              <span class="font-bold text-slate-200">${cert.issueDate}</span>
            </div>
            <div>
              <div class="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 border border-amber-500 flex items-center justify-center text-xl font-bold shadow-lg">
                ★
              </div>
              <span class="block text-[9px] text-amber-400 uppercase mt-1">Verified Credential</span>
            </div>
            <div class="text-right">
              <span class="block text-[10px] text-slate-400 uppercase">Verification ID</span>
              <span class="font-mono text-cyan-400 font-bold">${cert.id}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Modal Actions -->
      <div class="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
        <span class="text-xs text-slate-400"><i class="fa-solid fa-shield-halved text-emerald-400 mr-1"></i> Digitally Signed & Authenticated</span>
        <div class="flex gap-2">
          <button onclick="window.print()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors">
            <i class="fa-solid fa-print mr-1"></i> Print / PDF
          </button>
          <button onclick="document.getElementById('certificate-view-modal').classList.add('hidden')" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl">
            Done
          </button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  renderRecommendedTechs(user) {
    const container = document.getElementById("dash-recommended-techs");
    if (!container || !window.TechNovaData) return;

    const techs = window.TechNovaData.technologies.slice(0, 4);
    container.innerHTML = techs.map(t => `
      <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
            <i class="${t.icon}"></i>
          </div>
          <div>
            <h5 class="text-xs font-bold text-white">${t.name}</h5>
            <span class="text-[10px] text-slate-400">${t.level} • ${t.category === 'ai' ? 'AI Track' : 'Full-Stack'}</span>
          </div>
        </div>
        <a href="${t.category === 'ai' ? 'ai.html' : 'fullstack.html'}#${t.id}" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
          Learn <i class="fa-solid fa-arrow-right text-[10px]"></i>
        </a>
      </div>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TechNovaDashboard.init();
});

window.TechNovaDashboard = TechNovaDashboard;
