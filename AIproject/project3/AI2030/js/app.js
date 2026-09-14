/**
 * IT 2030 - Core Application Controller
 * Manages Language State (EN ⇄ தமிழ்), Scroll Progress, Interactive Polls & Global UI
 */

const App = {
  currentLang: 'en',
  
  init() {
    // Load saved language preference or default to English
    const savedLang = localStorage.getItem('it2030_lang');
    if (savedLang === 'ta' || savedLang === 'en') {
      this.currentLang = savedLang;
    }
    document.documentElement.lang = this.currentLang;

    // Initialize Event Listeners
    this.initLanguageSwitcher();
    this.initScrollProgress();
    this.initBackToTop();

    // Initialize Router
    Router.init();
    this.updateLanguageUI();
  },

  getLanguage() {
    return this.currentLang;
  },

  setLanguage(newLang) {
    if (newLang !== 'en' && newLang !== 'ta') return;
    this.currentLang = newLang;
    localStorage.setItem('it2030_lang', newLang);
    document.documentElement.lang = newLang;

    this.updateLanguageUI();
    Router.handleRoute(); // Re-render current route with new language immediately
  },

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'ta' : 'en';
    this.setLanguage(nextLang);
  },

  initLanguageSwitcher() {
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => this.toggleLanguage());
    }
  },

  updateLanguageUI() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (!langBtn) return;

    const navData = magazineContent[this.currentLang].nav;

    // The switcher button shows the alternate language to switch to
    if (this.currentLang === 'en') {
      langBtn.innerHTML = `
        <span class="lang-pill-dot"></span>
        <span class="lang-tag-en" style="color: var(--accent-cyan);">EN</span>
        <span class="lang-tag-divider">|</span>
        <span class="lang-tag-ta">தமிழ்</span>
      `;
      langBtn.setAttribute('aria-label', navData.switchLangAria);
    } else {
      langBtn.innerHTML = `
        <span class="lang-pill-dot"></span>
        <span class="lang-tag-ta" style="color: var(--accent-cyan);">தமிழ்</span>
        <span class="lang-tag-divider">|</span>
        <span class="lang-tag-en">EN</span>
      `;
      langBtn.setAttribute('aria-label', navData.switchLangAria);
    }

    // Update Header Navigation Links
    const navHome = document.querySelector('[data-nav="home"]');
    const brandTagline = document.getElementById('brand-tagline');
    if (navHome) navHome.textContent = navData.home;
    if (brandTagline) brandTagline.textContent = navData.tagline;
  },

  initScrollProgress() {
    const progressBar = document.getElementById('reading-progress');
    const floatingTopBtn = document.getElementById('floating-back-to-top');

    window.addEventListener('scroll', () => {
      // If we are in article view, calculate reading progress
      if (Router.currentRoute !== 'home') {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
          progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
      } else {
        if (progressBar) progressBar.style.width = '0%';
      }

      // Toggle Floating Back to Top Button
      if (floatingTopBtn) {
        if (window.scrollY > 400) {
          floatingTopBtn.style.opacity = '1';
          floatingTopBtn.style.pointerEvents = 'auto';
          floatingTopBtn.style.transform = 'translateY(0)';
        } else {
          floatingTopBtn.style.opacity = '0';
          floatingTopBtn.style.pointerEvents = 'none';
          floatingTopBtn.style.transform = 'translateY(12px)';
        }
      }
    }, { passive: true });
  },

  initBackToTop() {
    const floatingTopBtn = document.getElementById('floating-back-to-top');
    if (floatingTopBtn) {
      floatingTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  },

  /* ------------------------------------------------------------------------
     Interactive Poll Logic
     ------------------------------------------------------------------------ */
  getStoredVotes(articleId) {
    const key = `poll_votes_${articleId}`;
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch (e) {
      return {};
    }
  },

  hasUserVoted(articleId) {
    return localStorage.getItem(`poll_user_choice_${articleId}`);
  },

  attachPollEvents(articleId) {
    const pollWidget = document.getElementById(`poll-${articleId}`);
    if (!pollWidget) return;

    const buttons = pollWidget.querySelectorAll('.poll-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const optId = btn.getAttribute('data-opt-id');
        this.submitVote(articleId, optId);
      });
    });
  },

  submitVote(articleId, optionId) {
    const userVoted = this.hasUserVoted(articleId);
    if (userVoted === optionId) return; // already voted this option

    const storedVotes = this.getStoredVotes(articleId);
    const pollData = magazineContent[this.currentLang].articles[articleId].poll;

    // Initialize counts with base data if not set
    pollData.options.forEach(opt => {
      if (!storedVotes[opt.id]) {
        storedVotes[opt.id] = opt.count;
      }
    });

    // If user previously voted for another option, decrement that
    if (userVoted && storedVotes[userVoted]) {
      storedVotes[userVoted] = Math.max(0, storedVotes[userVoted] - 1);
    }

    // Increment selected option
    storedVotes[optionId] = (storedVotes[optionId] || 0) + 1;

    // Persist
    localStorage.setItem(`poll_votes_${articleId}`, JSON.stringify(storedVotes));
    localStorage.setItem(`poll_user_choice_${articleId}`, optionId);

    // Re-render poll component smoothly
    const pollContainer = document.getElementById(`poll-${articleId}`);
    if (pollContainer) {
      const parent = pollContainer.parentNode;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = Router.renderPollHTML(articleId, pollData, this.currentLang);
      const newPoll = tempDiv.firstElementChild;
      parent.replaceChild(newPoll, pollContainer);
      this.attachPollEvents(articleId);
    }
  }
};

// Launch App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
