/**
 * TechNova Learning Hub - Authentication & User Management Engine
 * Supports Email + Phone Number validation, Session Persistence,
 * Dynamic Navbar Profile Updates, Route Protection, and OTP simulation.
 */

const TechNovaAuth = {
  STORAGE_KEY: "technova_currentUser",
  USERS_KEY: "technova_registered_users",

  // Default pre-seeded test accounts
  defaultAccounts: [
    {
      id: "usr-101",
      name: "Alex Chen",
      email: "alex.chen@technova.dev",
      phone: "+1 555-0199",
      role: "Pro Learner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      enrolledCourses: ["course-html-css", "course-js-es6", "course-genai-llm", "course-python-fastapi"],
      completedProjects: ["proj-portfolio", "proj-todo-kanban"],
      progress: {
        "course-html-css": 100,
        "course-js-es6": 75,
        "course-genai-llm": 45,
        "course-python-fastapi": 30
      },
      streakDays: 14,
      points: 2450,
      certificates: [
        {
          id: "CERT-TN-8821",
          courseId: "course-html-css",
          courseTitle: "Modern HTML5 & CSS3 Masterclass",
          issueDate: "August 10, 2026",
          grade: "98% (Exemplary)"
        }
      ]
    },
    {
      id: "usr-102",
      name: "Priya Patel",
      email: "priya.patel@technova.dev",
      phone: "+91 9876543210",
      role: "AI Track Scholar",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      enrolledCourses: ["course-ai-foundations", "course-genai-llm", "course-ai-agents"],
      completedProjects: ["proj-ai-chatbot", "proj-ai-image-gen"],
      progress: {
        "course-ai-foundations": 100,
        "course-genai-llm": 85,
        "course-ai-agents": 40
      },
      streakDays: 21,
      points: 3120,
      certificates: [
        {
          id: "CERT-TN-9934",
          courseId: "course-ai-foundations",
          courseTitle: "Foundations of AI & Machine Learning",
          issueDate: "August 12, 2026",
          grade: "99% (Distinction)"
        }
      ]
    }
  ],

  // Initialize storage
  init() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.defaultAccounts));
    }
    this.updateNavbarUI();
  },

  // Get current logged-in user
  getCurrentUser() {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  // Get all registered users
  getAllUsers() {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : this.defaultAccounts;
  },

  // Save updated current user back to local storage
  saveCurrentUser(user) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    // Also sync to users list
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.email === user.email || u.id === user.id);
    if (index !== -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    this.updateNavbarUI();
  },

  // Validate Email format
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  // Validate Phone format (allows international formats like +1 234..., +91..., 10 digits)
  isValidPhone(phone) {
    const cleaned = String(phone).replace(/[\s\-\(\)\.]/g, "");
    return cleaned.length >= 8 && cleaned.length <= 16 && /^\+?[0-9]+$/.test(cleaned);
  },

  // Standard Login with Email OR Phone Number
  login(identifier, password) {
    if (!identifier || !password) {
      return { success: false, message: "Please enter your email or phone number and password." };
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const users = this.getAllUsers();

    // Check if matches email or phone
    const user = users.find(u => 
      u.email.toLowerCase() === cleanIdentifier || 
      u.phone.replace(/[\s\-\(\)]/g, "") === cleanIdentifier.replace(/[\s\-\(\)]/g, "")
    );

    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      this.updateNavbarUI();
      return { success: true, user };
    } else {
      // If user doesn't exist in pre-seeded list, create dynamically if valid format
      if (this.isValidEmail(identifier) || this.isValidPhone(identifier)) {
        const newUser = {
          id: "usr-" + Date.now().toString().slice(-4),
          name: identifier.split("@")[0].replace(/[0-9+]/g, "").trim() || "TechNova Learner",
          email: this.isValidEmail(identifier) ? identifier : `${identifier.replace(/\D/g, "")}@student.technova.dev`,
          phone: this.isValidPhone(identifier) ? identifier : "+1 555-0100",
          role: "Active Learner",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          enrolledCourses: ["course-html-css", "course-ai-foundations"],
          completedProjects: ["proj-portfolio"],
          progress: {
            "course-html-css": 60,
            "course-ai-foundations": 35
          },
          streakDays: 1,
          points: 500,
          certificates: []
        };
        this.saveCurrentUser(newUser);
        return { success: true, user: newUser };
      }
      return { success: false, message: "Invalid email or phone number format." };
    }
  },

  // Register new student (Mandatory Email AND Phone Number)
  register(name, email, phone, password, track = "Full-Stack") {
    if (!name || name.trim().length < 2) {
      return { success: false, message: "Please enter your full name (minimum 2 characters)." };
    }
    if (!email || !this.isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address (e.g. yourname@example.com)." };
    }
    if (!phone || !this.isValidPhone(phone)) {
      return { success: false, message: "Please enter a valid phone number with country code (e.g. +1 555-0199 or +91 9876543210)." };
    }
    if (!password || password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const users = this.getAllUsers();
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { success: false, message: "An account with this email address already exists. Please log in." };
    }

    const newUser = {
      id: "usr-" + Date.now().toString().slice(-4),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: `${track} Specialist`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      enrolledCourses: track.includes("AI") ? ["course-ai-foundations", "course-genai-llm"] : ["course-html-css", "course-js-es6"],
      completedProjects: [],
      progress: track.includes("AI") ? { "course-ai-foundations": 10 } : { "course-html-css": 15 },
      streakDays: 1,
      points: 250,
      certificates: []
    };

    this.saveCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  // 1-Click Quick Demo Login
  loginAsDemo(demoIndex = 0) {
    const user = this.defaultAccounts[demoIndex] || this.defaultAccounts[0];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.updateNavbarUI();
    return user;
  },

  // Logout
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateNavbarUI();
    window.location.reload();
  },

  // Protect page or action
  requireAuth(redirectUrl = null) {
    const user = this.getCurrentUser();
    if (!user) {
      if (typeof TechNovaMain !== "undefined" && TechNovaMain.showToast) {
        TechNovaMain.showToast("Please log in with Email & Phone to access this feature.", "info");
      }
      if (redirectUrl) {
        window.location.href = `login.html?redirect=${encodeURIComponent(redirectUrl)}`;
      } else {
        this.openAuthModal();
      }
      return false;
    }
    return true;
  },

  // Update Dynamic Navbar UI across all pages
  updateNavbarUI() {
    const user = this.getCurrentUser();
    const authNavContainer = document.getElementById("navbar-auth-section");
    const mobileAuthNavContainer = document.getElementById("mobile-navbar-auth-section");

    if (!authNavContainer) return;

    if (user) {
      // User is logged in
      const profileHtml = `
        <div class="relative group">
          <button id="user-profile-menu-btn" class="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all text-left">
            <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border border-cyan-400">
            <div class="hidden sm:block">
              <p class="text-xs font-bold text-slate-200 leading-tight">${user.name}</p>
              <p class="text-[10px] text-cyan-400 font-medium">${user.phone}</p>
            </div>
            <i class="fa-solid fa-chevron-down text-xs text-slate-400 ml-1 transition-transform group-hover:rotate-180"></i>
          </button>
          
          <!-- Dropdown Menu -->
          <div class="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="p-2 border-b border-slate-800 mb-2">
              <p class="text-sm font-bold text-white">${user.name}</p>
              <p class="text-xs text-slate-400 truncate">${user.email}</p>
              <p class="text-xs text-cyan-400 font-mono mt-0.5"><i class="fa-solid fa-phone text-[10px] mr-1"></i>${user.phone}</p>
              <span class="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold bg-cyan-950 text-cyan-400 rounded-full border border-cyan-800/50">
                ${user.role}
              </span>
            </div>
            <a href="dashboard.html" class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors">
              <i class="fa-solid fa-gauge-high text-cyan-400 w-4"></i> My Learning Dashboard
            </a>
            <a href="courses.html" class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors">
              <i class="fa-solid fa-book-bookmark text-purple-400 w-4"></i> Enrolled Courses (${user.enrolledCourses ? user.enrolledCourses.length : 0})
            </a>
            <a href="dashboard.html#certificates-section" class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors">
              <i class="fa-solid fa-award text-yellow-400 w-4"></i> My Certificates
            </a>
            <div class="border-t border-slate-800 mt-2 pt-2">
              <button onclick="TechNovaAuth.logout()" class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left">
                <i class="fa-solid fa-arrow-right-from-bracket w-4"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      `;
      authNavContainer.innerHTML = profileHtml;

      if (mobileAuthNavContainer) {
        mobileAuthNavContainer.innerHTML = `
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center gap-3">
            <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover border border-cyan-400">
            <div class="overflow-hidden">
              <p class="font-bold text-white text-sm">${user.name}</p>
              <p class="text-xs text-slate-400 truncate">${user.email}</p>
              <p class="text-xs text-cyan-400 font-mono">${user.phone}</p>
            </div>
          </div>
          <a href="dashboard.html" class="block w-full py-2.5 text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl mt-3 transition-colors">
            Go to My Dashboard
          </a>
          <button onclick="TechNovaAuth.logout()" class="block w-full py-2 text-center text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl mt-2 transition-colors">
            Sign Out
          </button>
        `;
      }
    } else {
      // User is logged out
      const loggedOutHtml = `
        <div class="flex items-center gap-2.5">
          <a href="login.html" class="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Log In
          </a>
          <a href="login.html?tab=register" class="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95">
            Sign Up
          </a>
        </div>
      `;
      authNavContainer.innerHTML = loggedOutHtml;

      if (mobileAuthNavContainer) {
        mobileAuthNavContainer.innerHTML = `
          <div class="grid grid-cols-2 gap-3 pt-2">
            <a href="login.html" class="py-2.5 text-center font-semibold text-slate-200 bg-slate-800 rounded-xl border border-slate-700">
              Log In
            </a>
            <a href="login.html?tab=register" class="py-2.5 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl">
              Sign Up
            </a>
          </div>
        `;
      }
    }
  },

  // Open Quick Modal from any page
  openAuthModal(defaultTab = "login") {
    let modal = document.getElementById("global-auth-modal");
    if (!modal) {
      this.injectAuthModal();
      modal = document.getElementById("global-auth-modal");
    }
    modal.classList.remove("hidden");
    this.switchAuthTab(defaultTab);
  },

  closeAuthModal() {
    const modal = document.getElementById("global-auth-modal");
    if (modal) modal.classList.add("hidden");
  },

  switchAuthTab(tab) {
    const loginTabBtn = document.getElementById("modal-tab-login-btn");
    const registerTabBtn = document.getElementById("modal-tab-register-btn");
    const loginForm = document.getElementById("modal-login-form");
    const registerForm = document.getElementById("modal-register-form");

    if (tab === "login") {
      loginTabBtn?.classList.add("border-b-2", "border-cyan-400", "text-cyan-400");
      loginTabBtn?.classList.remove("text-slate-400");
      registerTabBtn?.classList.remove("border-b-2", "border-cyan-400", "text-cyan-400");
      registerTabBtn?.classList.add("text-slate-400");
      loginForm?.classList.remove("hidden");
      registerForm?.classList.add("hidden");
    } else {
      registerTabBtn?.classList.add("border-b-2", "border-cyan-400", "text-cyan-400");
      registerTabBtn?.classList.remove("text-slate-400");
      loginTabBtn?.classList.remove("border-b-2", "border-cyan-400", "text-cyan-400");
      loginTabBtn?.classList.add("text-slate-400");
      loginForm?.classList.add("hidden");
      registerForm?.classList.remove("hidden");
    }
  },

  injectAuthModal() {
    const modalHtml = `
      <div id="global-auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden">
        <div class="relative w-full max-w-md p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100">
          <button onclick="TechNovaAuth.closeAuthModal()" class="absolute top-5 right-5 text-slate-400 hover:text-white text-lg">
            <i class="fa-solid fa-xmark"></i>
          </button>
          
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 mb-3 shadow-lg shadow-cyan-500/20">
              <i class="fa-solid fa-cube text-xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold font-display text-white">TechNova Portal</h3>
            <p class="text-xs text-slate-400 mt-1">Authenticate with your Email & Phone Number</p>
          </div>

          <!-- Tabs -->
          <div class="flex border-b border-slate-800 mb-6">
            <button id="modal-tab-login-btn" onclick="TechNovaAuth.switchAuthTab('login')" class="flex-1 pb-3 font-semibold text-sm transition-colors text-cyan-400 border-b-2 border-cyan-400">
              Log In
            </button>
            <button id="modal-tab-register-btn" onclick="TechNovaAuth.switchAuthTab('register')" class="flex-1 pb-3 font-semibold text-sm transition-colors text-slate-400">
              Sign Up
            </button>
          </div>

          <!-- 1-Click Demo Buttons -->
          <div class="mb-5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80">
            <p class="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider mb-2">⚡ 1-Click Test Accounts</p>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="TechNovaAuth.loginAsDemo(0); TechNovaAuth.closeAuthModal(); TechNovaMain.showToast('Logged in as Alex Chen!', 'success');" class="px-2.5 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg text-left truncate">
                👨‍💻 Alex (Full-Stack)
              </button>
              <button type="button" onclick="TechNovaAuth.loginAsDemo(1); TechNovaAuth.closeAuthModal(); TechNovaMain.showToast('Logged in as Priya Patel!', 'success');" class="px-2.5 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg text-left truncate">
                👩‍🔬 Priya (AI Track)
              </button>
            </div>
          </div>

          <!-- Login Form -->
          <form id="modal-login-form" onsubmit="event.preventDefault(); TechNovaAuth.handleModalLogin();" class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1.5">Email or Phone Number</label>
              <div class="relative">
                <i class="fa-solid fa-user absolute left-3.5 top-3.5 text-slate-500 text-sm"></i>
                <input id="modal-login-ident" type="text" placeholder="alex.chen@technova.dev or +1 555-0199" required class="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400">
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div class="relative">
                <i class="fa-solid fa-lock absolute left-3.5 top-3.5 text-slate-500 text-sm"></i>
                <input id="modal-login-pass" type="password" placeholder="••••••••" required class="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400">
              </div>
            </div>
            <button type="submit" class="w-full py-3 font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-cyan-500/20 transition-all">
              Sign In to Continue
            </button>
          </form>

          <!-- Register Form -->
          <form id="modal-register-form" onsubmit="event.preventDefault(); TechNovaAuth.handleModalRegister();" class="space-y-3 hidden">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input id="modal-reg-name" type="text" placeholder="e.g. Sarah Connor" required class="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <input id="modal-reg-email" type="email" placeholder="sarah@example.com" required class="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Phone Number (with Country Code)</label>
              <input id="modal-reg-phone" type="tel" placeholder="+1 555 0199 or +91 9876543210" required class="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Choose Password</label>
              <input id="modal-reg-pass" type="password" placeholder="Minimum 6 characters" required class="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Primary Learning Goal</label>
              <select id="modal-reg-track" class="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400">
                <option value="Full-Stack Developer">Full-Stack Web Development</option>
                <option value="AI & ML Specialist">AI, LLMs & Machine Learning</option>
                <option value="Enterprise Java Architect">Enterprise Java & Spring Boot</option>
                <option value="Python Backend Engineer">Python Backend & FastAPI</option>
              </select>
            </div>
            <button type="submit" class="w-full py-3 font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-cyan-500/20 transition-all mt-2">
              Create TechNova Account
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  },

  handleModalLogin() {
    const ident = document.getElementById("modal-login-ident").value;
    const pass = document.getElementById("modal-login-pass").value;
    const res = this.login(ident, pass);
    if (res.success) {
      this.closeAuthModal();
      if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast(`Welcome back, ${res.user.name}!`, "success");
    } else {
      if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast(res.message, "error");
    }
  },

  handleModalRegister() {
    const name = document.getElementById("modal-reg-name").value;
    const email = document.getElementById("modal-reg-email").value;
    const phone = document.getElementById("modal-reg-phone").value;
    const pass = document.getElementById("modal-reg-pass").value;
    const track = document.getElementById("modal-reg-track").value;

    const res = this.register(name, email, phone, pass, track);
    if (res.success) {
      this.closeAuthModal();
      if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast(`Registration complete! Welcome ${res.user.name}.`, "success");
    } else {
      if (typeof TechNovaMain !== "undefined") TechNovaMain.showToast(res.message, "error");
    }
  }
};

// Auto initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  TechNovaAuth.init();
});

window.TechNovaAuth = TechNovaAuth;
