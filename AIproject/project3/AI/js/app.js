/**
 * IT IN 2030 — AI, Web Development & The Future
 * Application Logic, Hash-based Router, Bilingual State & Interactive View Controller
 */

(function () {
  'use strict';

  // Application State
  const state = {
    lang: localStorage.getItem('it2030_lang') || 'en',
    currentArticleId: null, // null means home view, otherwise 'article-1', 'article-2', 'article-3'
  };

  // DOM Elements
  const els = {
    html: document.documentElement,
    body: document.body,
    progressBar: document.getElementById('readingProgressBar'),
    siteHeader: document.getElementById('siteHeader'),
    brandLink: document.getElementById('brandLink'),
    navSiteTitle: document.getElementById('navSiteTitle'),
    navSiteTagline: document.getElementById('navSiteTagline'),
    headerContext: document.getElementById('headerContext'),
    contextCrumb: document.getElementById('contextCrumb'),
    contextCurrentTitle: document.getElementById('contextCurrentTitle'),
    headerBackBtn: document.getElementById('headerBackBtn'),
    headerBackBtnText: document.getElementById('headerBackBtnText'),
    btnLangEn: document.getElementById('btnLangEn'),
    btnLangTa: document.getElementById('btnLangTa'),
    homeView: document.getElementById('homeView'),
    articleView: document.getElementById('articleView'),
    heroTag: document.getElementById('heroTag'),
    heroTitle: document.getElementById('heroTitle'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    heroDesc: document.getElementById('heroDesc'),
    cardsGrid: document.getElementById('cardsGrid'),
    articleContainer: document.getElementById('articleContainer'),
    footerLogo: document.getElementById('footerLogo'),
    footerText: document.getElementById('footerText'),
  };

  // Article mapping for quick lookup
  const articleKeys = ['article-1', 'article-2', 'article-3'];

  /**
   * Initialize Application
   */
  function init() {
    setLanguage(state.lang, false);
    setupEventListeners();
    handleRoute();
  }

  /**
   * Set and Update Language
   */
  function setLanguage(newLang, triggerRender = true) {
    state.lang = newLang === 'ta' ? 'ta' : 'en';
    localStorage.setItem('it2030_lang', state.lang);

    // Update document attributes
    els.html.setAttribute('lang', state.lang);
    if (state.lang === 'ta') {
      els.body.classList.add('lang-ta');
      els.btnLangTa.classList.add('active');
      els.btnLangTa.setAttribute('aria-pressed', 'true');
      els.btnLangEn.classList.remove('active');
      els.btnLangEn.setAttribute('aria-pressed', 'false');
    } else {
      els.body.classList.remove('lang-ta');
      els.btnLangEn.classList.add('active');
      els.btnLangEn.setAttribute('aria-pressed', 'true');
      els.btnLangTa.classList.remove('active');
      els.btnLangTa.setAttribute('aria-pressed', 'false');
    }

    if (window.VIDEO_PLAYER && typeof window.VIDEO_PLAYER.updateLanguage === 'function') {
      window.VIDEO_PLAYER.updateLanguage(state.lang);
    }

    if (triggerRender) {
      renderCurrentView();
    }
  }

  /**
   * Attach Global Event Listeners
   */
  function setupEventListeners() {
    // Language Switcher Buttons
    els.btnLangEn.addEventListener('click', () => {
      if (state.lang !== 'en') setLanguage('en');
    });

    els.btnLangTa.addEventListener('click', () => {
      if (state.lang !== 'ta') setLanguage('ta');
    });

    // Brand Link (Back to Home)
    els.brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToHome();
    });

    // Context crumb link in header
    els.contextCrumb.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToHome();
    });

    // Header Back button
    els.headerBackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToHome();
    });

    // Window Hash Change / Browser Back & Forward
    window.addEventListener('hashchange', handleRoute);

    // Scroll listener for reading progress bar
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
  }

  /**
   * Router: Parse window hash and determine view
   */
  function handleRoute() {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();

    if (articleKeys.includes(hash)) {
      state.currentArticleId = hash;
    } else if (hash === 'article/1' || hash === '1') {
      state.currentArticleId = 'article-1';
    } else if (hash === 'article/2' || hash === '2') {
      state.currentArticleId = 'article-2';
    } else if (hash === 'article/3' || hash === '3') {
      state.currentArticleId = 'article-3';
    } else {
      state.currentArticleId = null;
    }

    renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateReadingProgress();
  }

  /**
   * Navigate to Article
   */
  function navigateToArticle(articleId) {
    window.location.hash = `#/${articleId}`;
  }

  /**
   * Navigate to Home
   */
  function navigateToHome() {
    if (window.location.hash === '' || window.location.hash === '#') {
      state.currentArticleId = null;
      renderCurrentView();
    } else {
      window.location.hash = '#';
    }
  }

  /**
   * Master Render Function
   */
  function renderCurrentView() {
    const data = window.ARTICLE_DATA[state.lang];

    // Update Header and Footer Static Content
    els.navSiteTitle.textContent = data.meta.siteTitle;
    els.navSiteTagline.textContent = data.hero.tag;
    els.headerBackBtnText.textContent = data.meta.backToHome;
    els.contextCrumb.textContent = state.lang === 'ta' ? 'கட்டுரைகள்' : 'Articles';
    els.footerLogo.textContent = data.meta.siteTitle;
    els.footerText.textContent = data.meta.allRights;

    if (state.currentArticleId && data.articles[state.currentArticleId]) {
      // ARTICLE VIEW
      els.homeView.style.display = 'none';
      els.articleView.style.display = 'block';
      els.headerBackBtn.classList.add('active-view');
      els.headerContext.classList.add('visible');

      const article = data.articles[state.currentArticleId];
      els.contextCurrentTitle.textContent = article.title;
      renderArticlePage(article, data);
    } else {
      // HOMEPAGE VIEW
      els.articleView.style.display = 'none';
      els.homeView.style.display = 'block';
      els.headerBackBtn.classList.remove('active-view');
      els.headerContext.classList.remove('visible');

      renderHomePage(data);
    }
  }

  /**
   * Render Homepage: Hero and EXACTLY 3 Main Cards
   */
  function renderHomePage(data) {
    // Hero texts
    els.heroTag.textContent = data.hero.tag;
    els.heroTitle.textContent = data.hero.title;
    els.heroSubtitle.textContent = data.hero.subtitle;
    els.heroDesc.textContent = data.hero.description;

    // Render EXACTLY 3 Cards
    els.cardsGrid.innerHTML = '';

    data.cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = `article-card ${card.isSolution ? 'solution-card' : ''}`;
      cardEl.setAttribute('data-card', card.id);
      cardEl.setAttribute('role', 'article');
      cardEl.setAttribute('tabindex', '0');

      // Visual graphic generator
      let visualHtml = '';
      if (card.id === 'article-1' && window.GRAPHICS.developerDirector) {
        visualHtml = window.GRAPHICS.developerDirector(true);
      } else if (card.id === 'article-2' && window.GRAPHICS.interconnectedWeb) {
        visualHtml = window.GRAPHICS.interconnectedWeb(true);
      } else if (card.id === 'article-3' && window.GRAPHICS.adaptiveHorizon) {
        visualHtml = window.GRAPHICS.adaptiveHorizon(true);
      }

      const badgeHtml = card.isSolution
        ? `<span class="card-category solution-badge">${card.badge || data.meta.solutionBadge}</span>`
        : `<span class="card-category">${card.category}</span>`;

      cardEl.innerHTML = `
        <div class="card-stripe"></div>
        <div class="card-header-row">
          <span class="card-num">${card.number}</span>
          ${badgeHtml}
        </div>
        <h3 class="card-title">
          <a href="#/${card.id}" class="card-title-link" style="color: inherit; text-decoration: none;">${card.title}</a>
        </h3>
        <p class="card-excerpt">${card.excerpt}</p>
        <div class="card-visual-frame">
          ${visualHtml}
        </div>
        <div class="card-action-bar">
          <a href="#/${card.id}" class="card-read-cta" style="text-decoration: none;">
            ${data.meta.readArticle} →
          </a>
          <span class="card-meta-pill">${card.readTime}</span>
        </div>
      `;

      // Click to open article
      cardEl.addEventListener('click', () => {
        navigateToArticle(card.id);
      });

      // Keyboard accessibility (Enter key)
      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToArticle(card.id);
        }
      });

      els.cardsGrid.appendChild(cardEl);
    });
  }

  /**
   * Render Complete Article View
   */
  function renderArticlePage(article, data) {
    let savedVideoState = null;
    const videoContainerId = article.id + '_videoContainer';
    if (window.VIDEO_PLAYER && typeof window.VIDEO_PLAYER.getPlayerState === 'function') {
      savedVideoState = window.VIDEO_PLAYER.getPlayerState(videoContainerId);
    }

    let visualHeroHtml = '';
    if (article.id === 'article-1' && window.GRAPHICS.developerDirector) {
      visualHeroHtml = `
        <div class="article-graphic-banner">
          ${window.GRAPHICS.developerDirector(false)}
          <div class="graphic-caption">${state.lang === 'ta' ? 'வரைபடம் 1: மனித இயக்குநரின் மேற்பார்வையில் இயங்கும் பல AI அமைப்புகள்' : 'Figure 1: The Human Director orchestrating multi-agent AI synthesizers'}</div>
        </div>
      `;
    } else if (article.id === 'article-2' && window.GRAPHICS.interconnectedWeb) {
      visualHeroHtml = `
        <div class="article-graphic-banner">
          ${window.GRAPHICS.interconnectedWeb(false)}
          <div class="graphic-caption">${state.lang === 'ta' ? 'வரைபடம் 2: திறந்த இணையத்தின் வழியாக இணைக்கப்பட்டுள்ள நவீன சமூகத் துறைகள்' : 'Figure 2: The open web protocol connecting critical societal infrastructure'}</div>
        </div>
      `;
    } else if (article.id === 'article-3' && window.GRAPHICS.centralSolutionFormula) {
      visualHeroHtml = `
        <div class="article-graphic-banner" style="border-color: var(--accent-teal-border); background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);">
          ${window.GRAPHICS.centralSolutionFormula()}
          <div class="graphic-caption" style="color: var(--accent-teal); font-weight: 700;">${state.lang === 'ta' ? 'தீர்வு வரைபடம்: மனித ரசனை + AI வேகம் + மனிதப் புரிதல் = எதிர்கால மதிப்பு' : 'The Solution Equation: Human Judgment + AI Speed + Empathy + Real Problem Solving = Future Value'}</div>
        </div>
      `;
    }

    // Build Contextual Side Visual Rail HTML
    let sideRailHtml = '';
    if (article.sidebars && article.sidebars.length > 0) {
      article.sidebars.forEach((sb) => {
        let svgContent = '';
        if (window.GRAPHICS && typeof window.GRAPHICS[sb.graphicKey] === 'function') {
          svgContent = window.GRAPHICS[sb.graphicKey]();
        }
        sideRailHtml += `
          <div class="side-rail-card">
            <div class="side-card-header">
              <span class="side-card-indicator ${article.isSolution ? 'teal-ind' : ''}"></span>
              <span class="side-card-title">${sb.title}</span>
            </div>
            <div class="side-card-visual">
              ${svgContent}
            </div>
            <p class="side-card-caption">${sb.caption}</p>
          </div>
        `;
      });
    }

    // Process article narrative sections with natural video placement
    let sectionsHtml = '';
    article.sections.forEach((sec) => {
      if (sec.type === 'callout') {
        sectionsHtml += `
          <aside class="editorial-callout" ${article.isSolution ? 'style="border-left-color: var(--accent-teal);"' : ''}>
            <blockquote>“${sec.quote}”</blockquote>
            <cite ${article.isSolution ? 'style="color: var(--accent-teal);"' : ''}>— ${sec.author}</cite>
          </aside>
        `;

        // Naturally embed Article 1 video right after the core principle callout
        if (article.id === 'article-1') {
          sectionsHtml += `<div id="${article.id}_videoContainer"></div>`;
        }
      } else if (sec.type === 'diagram' && sec.diagramType === 'progression') {
        let stepsHtml = '';
        sec.steps.forEach((st, idx) => {
          stepsHtml += `
            <div class="progression-item">
              <span class="prog-badge">0${idx + 1}</span>
              <div class="prog-info">
                <h4>${st.title}</h4>
                <p>${st.desc}</p>
              </div>
            </div>
          `;
        });
        sectionsHtml += `
          <div class="progression-wrap">
            <div class="progression-header">${sec.caption}</div>
            <div class="progression-grid">
              ${stepsHtml}
            </div>
          </div>
        `;
      } else if (sec.type === 'grid8') {
        let sectorsHtml = '';
        sec.sectors.forEach((sector) => {
          const iconSvg = (window.GRAPHICS.sectorIcons && window.GRAPHICS.sectorIcons[sector.icon]) || '';
          sectorsHtml += `
            <div class="sector-card">
              <div class="sector-icon-box">
                ${iconSvg}
              </div>
              <div class="sector-details">
                <h4>${sector.title}</h4>
                <p>${sector.description}</p>
              </div>
            </div>
          `;
        });
        sectionsHtml += `
          <div class="sector-section-wrap">
            <h3 class="sector-section-title">${sec.title}</h3>
            <div class="sector-grid-8">
              ${sectorsHtml}
            </div>
          </div>
        `;

        // Naturally embed Article 2 video right after 8 Sectors
        if (article.id === 'article-2') {
          sectionsHtml += `<div id="${article.id}_videoContainer"></div>`;
        }
      } else if (sec.type === 'framework') {
        // Naturally embed Article 3 video right before the Solution Framework
        if (article.id === 'article-3') {
          sectionsHtml += `<div id="${article.id}_videoContainer"></div>`;
        }

        let frameworkSteps = '';
        sec.steps.forEach((stepItem, idx) => {
          frameworkSteps += `
            <div class="framework-step-card">
              <div class="step-marker">${stepItem.label}</div>
              <div class="step-card-body">
                <div class="step-name">${stepItem.step}</div>
                <div class="step-desc">${stepItem.detail}</div>
              </div>
            </div>
          `;
          if (idx < sec.steps.length - 1) {
            frameworkSteps += `<div class="framework-arrow">↓</div>`;
          }
        });

        sectionsHtml += `
          <div class="framework-highlight-box">
            <span class="framework-top-badge">${state.lang === 'ta' ? 'தீர்வுச் செயல்திட்டம்' : 'THE SOLUTION FRAMEWORK'}</span>
            <h3 class="framework-title">${sec.title}</h3>
            <p class="framework-subtitle">${sec.subtitle}</p>
            <div class="framework-ladder">
              ${frameworkSteps}
            </div>
          </div>
        `;
      } else if (sec.type === 'conclusion') {
        sectionsHtml += `
          <div class="conclusion-box" ${article.isSolution ? 'style="border-color: var(--accent-teal-border); background: var(--accent-teal-subtle);"' : ''}>
            <div class="conclusion-label" ${article.isSolution ? 'style="color: var(--accent-teal);"' : ''}>${sec.heading}</div>
            <p class="conclusion-text">“${sec.text}”</p>
          </div>
        `;
      } else {
        // Standard Text Section (2-4 line concise paragraphs)
        let paragraphsHtml = '';
        if (sec.paragraphs) {
          sec.paragraphs.forEach((p) => {
            paragraphsHtml += `<p>${p}</p>`;
          });
        }
        sectionsHtml += `
          <div class="article-section-block">
            ${sec.heading ? `<h3 class="article-section-title">${sec.heading}</h3>` : ''}
            ${paragraphsHtml}
          </div>
        `;
      }
    });

    // Pagination calculations
    const currentIndex = articleKeys.indexOf(article.id);
    const prevKey = currentIndex > 0 ? articleKeys[currentIndex - 1] : null;
    const nextKey = currentIndex < articleKeys.length - 1 ? articleKeys[currentIndex + 1] : null;

    const prevArticle = prevKey ? data.articles[prevKey] : null;
    const nextArticle = nextKey ? data.articles[nextKey] : null;

    let paginationHtml = '<div class="article-pagination">';
    if (prevArticle) {
      paginationHtml += `
        <a class="pag-btn prev-btn" href="#/${prevKey}">
          <span class="pag-dir">← ${data.meta.prevArticle}</span>
          <span class="pag-title">${prevArticle.title}</span>
        </a>
      `;
    } else {
      paginationHtml += '<div class="pag-placeholder"></div>';
    }

    if (nextArticle) {
      paginationHtml += `
        <a class="pag-btn next-btn" href="#/${nextKey}">
          <span class="pag-dir">${data.meta.nextArticle} →</span>
          <span class="pag-title">${nextArticle.title}</span>
        </a>
      `;
    } else {
      paginationHtml += '<div class="pag-placeholder"></div>';
    }
    paginationHtml += '</div>';

    // Solution badge inside article header
    const solutionPillHtml = article.isSolution
      ? `<span class="article-solution-pill">${state.lang === 'ta' ? 'தீர்வு — THE SOLUTION' : 'THE SOLUTION'}</span>`
      : '';

    // Assemble Full Article DOM with Multi-Column Editorial Spread
    els.articleContainer.innerHTML = `
      <!-- Top Navigation -->
      <nav class="article-nav-top" aria-label="Article navigation">
        <a class="back-btn-link" id="topBackBtn" href="#">
          ${data.meta.backToHome}
        </a>
        <div class="article-top-meta">
          <span class="meta-chip">${article.readTime}</span>
          <span class="meta-chip">${data.meta.publishedDate}</span>
        </div>
      </nav>

      <!-- Article Header -->
      <header class="article-header">
        <div class="article-badge-row">
          <span class="article-num-tag">${article.number}</span>
          <span class="article-cat-tag">${article.category}</span>
          ${solutionPillHtml}
        </div>
        <h1 class="article-main-title">${article.title}</h1>
        <p class="article-subtitle">${article.subtitle}</p>
        <div class="article-divider"></div>
        <div class="article-lead ${article.isSolution ? 'lead-solution' : ''}">
          ${article.lead}
        </div>
      </header>

      <!-- Relevant Top Visual Banner -->
      ${visualHeroHtml}

      <!-- Multi-Column Editorial Spread: Main Narrative + Contextual Side Visual Rail -->
      <div class="editorial-spread-grid">
        <div class="editorial-narrative-col">
          ${sectionsHtml}
        </div>

        <aside class="editorial-side-rail" aria-label="Companion Visual Insights">
          ${sideRailHtml}
        </aside>
      </div>

      <!-- Pagination Next / Previous -->
      ${paginationHtml}

      <!-- Bottom Return Bar -->
      <div class="bottom-home-bar">
        <a class="back-btn-link" id="bottomBackBtn" href="#">
          ${data.meta.backToHome}
        </a>
      </div>
    `;

    // Hook top and bottom back buttons
    const topBack = document.getElementById('topBackBtn');
    const bottomBack = document.getElementById('bottomBackBtn');
    if (topBack) {
      topBack.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToHome();
      });
    }
    if (bottomBack) {
      bottomBack.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToHome();
      });
    }

    // Mount Explanatory Video Player for the current article
    if (window.VIDEO_PLAYER && typeof window.VIDEO_PLAYER.mount === 'function') {
      const player = window.VIDEO_PLAYER.mount(videoContainerId, article.id, state.lang);
      if (player && savedVideoState) {
        if (savedVideoState.currentTime > 0) {
          player.seek(savedVideoState.currentTime);
        }
        if (savedVideoState.isPlaying) {
          player.play();
        }
      }
    }
  }

  /**
   * Update Top Reading Progress Bar on Scroll
   */
  function updateReadingProgress() {
    if (!state.currentArticleId) {
      els.progressBar.style.width = '0%';
      els.progressBar.setAttribute('aria-valuenow', '0');
      return;
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      els.progressBar.style.width = '0%';
      return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    els.progressBar.style.width = `${progress.toFixed(1)}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
