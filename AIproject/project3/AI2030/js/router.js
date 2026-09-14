/**
 * IT 2030 - Hash-Based Router & View Renderer
 * Provides seamless zero-reload navigation between Homepage and Dedicated Article Pages
 */

const Router = {
  currentRoute: 'home',
  
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash.slice(1);
    
    if (hash === 'article-1' || hash === 'article-2' || hash === 'article-3') {
      this.currentRoute = hash;
      this.renderArticle(hash);
    } else {
      this.currentRoute = 'home';
      this.renderHome();
    }

    // Scroll to top upon route transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update active nav links
    this.updateNavState();
  },

  navigate(route) {
    window.location.hash = route;
  },

  updateNavState() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const target = link.getAttribute('data-nav');
      if ((target === 'home' && this.currentRoute === 'home') || target === this.currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  renderHome() {
    const lang = App.getLanguage();
    const data = magazineContent[lang];

    // Document Title
    document.title = `${data.hero.title} • ${data.hero.subtitle}`;

    // Hide article container, show homepage containers
    const homeView = document.getElementById('home-view');
    const articleView = document.getElementById('article-view');
    const readingBar = document.getElementById('reading-progress');

    if (homeView) homeView.style.display = 'block';
    if (articleView) articleView.style.display = 'none';
    if (readingBar) readingBar.style.width = '0%';

    // Populate Hero
    document.getElementById('hero-tag').textContent = data.hero.tag;
    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-desc').textContent = data.hero.description;

    // Populate Hero Stats
    const statsContainer = document.getElementById('hero-stats');
    if (statsContainer) {
      statsContainer.innerHTML = data.hero.statCards.map(stat => `
        <div class="stat-item">
          <span class="stat-value">${stat.value}</span>
          <span class="stat-label">${stat.label}</span>
        </div>
      `).join('');
    }

    // Section Header
    document.getElementById('section-title').textContent = data.homepage.sectionTitle;
    document.getElementById('section-subtitle').textContent = data.homepage.sectionSubtitle;

    // Render Exactly 3 Article Cards
    const cardsGrid = document.getElementById('cards-grid');
    if (cardsGrid) {
      cardsGrid.innerHTML = data.cards.map(card => `
        <article class="article-card" data-topic="${card.id}" tabindex="0" role="button" aria-label="${card.title}">
          <div class="card-media-wrap">
            <img src="${card.image}" alt="${card.imageAlt}" class="card-image" loading="lazy" />
            <div class="card-media-overlay"></div>
            <span class="card-badge-floating">${card.badge}</span>
          </div>
          <div class="card-body">
            <div class="card-meta-top">
              <span class="card-number">${card.number}</span>
              <span class="card-category">${card.category}</span>
            </div>
            <h3 class="card-title">${card.title}</h3>
            <p class="card-excerpt">${card.excerpt}</p>
            <div class="card-footer">
              <span class="card-read-time">${card.readTime}</span>
              <span class="card-action-btn">
                <span>${lang === 'ta' ? 'கட்டுரையைப் படிக்க' : 'Read Dispatch'}</span>
                <span class="card-action-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </article>
      `).join('');

      // Add click & keyboard listeners to cards
      document.querySelectorAll('.article-card').forEach(cardEl => {
        const topic = cardEl.getAttribute('data-topic');
        cardEl.addEventListener('click', () => this.navigate(topic));
        cardEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.navigate(topic);
          }
        });
      });
    }

    // Render Solution Framework Preview on Homepage
    this.renderFrameworkPreview(lang);
    
    // Update Footer
    this.renderFooter(lang);
  },

  renderFrameworkPreview(lang) {
    const data = magazineContent[lang];
    const previewContainer = document.getElementById('framework-preview');
    if (!previewContainer) return;

    if (lang === 'ta') {
      previewContainer.innerHTML = `
        <div class="framework-card-banner">
          <div class="framework-header">
            <span class="framework-tag">2030 எதிர்காலத் தீர்வு கட்டமைப்பு</span>
            <h3 class="framework-heading">மனித சிந்தனையும் AI ஆற்றலும் இணையும் எதிர்கால IT சமன்பாடு</h3>
          </div>
          <p style="color: var(--text-secondary); max-width: 700px; margin-bottom: 1.5rem;">
            மென்பொருள் பொறியியல் மற்றும் தகவல் தொழில்நுட்பத்தின் எதிர்காலம் அச்சத்தில் இல்லை; மனிதப் பண்புகளையும் செயற்கை நுண்ணறிவையும் எவ்வாறு ஒன்றிணைக்கிறோம் என்பதிலேயே உள்ளது.
          </p>
          <div class="formula-flow-preview">
            <div class="formula-pill"><span class="dot"></span>மனித சிந்தனை</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>AI ஆற்றல்</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>தொழில்நுட்ப அறிவு</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>படைப்பாற்றல்</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>அறநெறிப் பொறுப்பு</div>
            <span class="formula-plus">=</span>
            <div class="formula-pill result-pill">எதிர்கால IT</div>
          </div>
        </div>
      `;
    } else {
      previewContainer.innerHTML = `
        <div class="framework-card-banner">
          <div class="framework-header">
            <span class="framework-tag">The 2030 Solution Architecture</span>
            <h3 class="framework-heading">Human Cognitive Judgment Multiplied by Machine Acceleration</h3>
          </div>
          <p style="color: var(--text-secondary); max-width: 700px; margin-bottom: 1.5rem;">
            The future of software engineering is neither machine tyranny nor human obsolescence. It is the disciplined synthesis of deep computer science, ethical guardrails, and verification engineering.
          </p>
          <div class="formula-flow-preview">
            <div class="formula-pill"><span class="dot"></span>Human Thinking</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>AI Power</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>Technical Depth</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>Creativity</div>
            <span class="formula-plus">+</span>
            <div class="formula-pill"><span class="dot"></span>Ethical Responsibility</div>
            <span class="formula-plus">=</span>
            <div class="formula-pill result-pill">Future-Ready IT</div>
          </div>
        </div>
      `;
    }
  },

  renderArticle(articleId) {
    const lang = App.getLanguage();
    const article = magazineContent[lang].articles[articleId];
    if (!article) return this.renderHome();

    // Document Title
    document.title = `${article.title} • IT 2030`;

    // Toggle Views
    const homeView = document.getElementById('home-view');
    const articleView = document.getElementById('article-view');
    if (homeView) homeView.style.display = 'none';
    if (articleView) articleView.style.display = 'block';

    const backLabel = lang === 'ta' ? 'முகப்பு பக்கத்திற்கு திரும்புக' : 'Back to Dispatches';
    const nextPrevLinks = this.getAdjacentArticles(articleId, lang);

    articleView.innerHTML = `
      <div class="container article-view">
        <!-- Back Navigation -->
        <div class="article-top-nav">
          <button class="back-btn" onclick="Router.navigate('home')">
            <span class="back-btn-arrow" aria-hidden="true">←</span>
            <span>${backLabel}</span>
          </button>
        </div>

        <!-- Article Header -->
        <header class="article-header reading-container">
          <div class="article-meta-header">
            <span class="article-number-badge">${article.number}</span>
            <span class="article-category-badge">${article.category}</span>
            <span class="article-readtime-badge">◈ ${article.readTime}</span>
          </div>
          <h1 class="article-hero-title">${article.title}</h1>
          <p class="article-hero-subtitle">${article.subtitle}</p>
        </header>

        <!-- Cinematic Hero Media Box -->
        <div class="reading-container">
          <div class="article-hero-media-box">
            <img src="${article.heroImage}" alt="${article.title}" class="article-hero-img" />
            <div class="article-hero-caption">${article.heroCaption}</div>
          </div>
        </div>

        <!-- Editorial Reading Column -->
        <main class="reading-container article-content-flow">
          <div class="article-lead-intro">
            ${article.intro}
          </div>

          <!-- Article Sections -->
          ${article.sections.map(section => `
            <section class="article-section-block">
              <h2 class="article-section-title">${section.heading}</h2>
              <div class="section-body">
                ${section.content}
              </div>
              ${section.highlight ? `
                <div class="quote-callout-box">
                  <p class="quote-text">${section.highlight.quote}</p>
                  <span class="quote-author">— ${section.highlight.author}</span>
                </div>
              ` : ''}
              ${section.matrix ? `
                <div class="matrix-container">
                  ${section.matrix.map(m => `
                    <div class="matrix-tier-card">
                      <div class="matrix-tier-header">
                        <span class="matrix-tier-title">${m.tier}</span>
                      </div>
                      <div class="matrix-tier-desc">${m.description}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </section>
          `).join('')}

          <!-- Interactive Thought Experiment Poll -->
          ${article.poll ? this.renderPollHTML(articleId, article.poll, lang) : ''}

          <!-- Credible Sources & Citations Section -->
          ${article.sources ? `
            <div class="sources-section">
              <div class="sources-header">
                <span style="color: var(--accent-cyan);">⬡</span>
                <h3 class="sources-title">${lang === 'ta' ? 'நம்பகமான ஆய்வுகள் & ஆதாரங்கள்' : 'Credible Sources & Further Reading'}</h3>
              </div>
              <ul class="sources-list">
                ${article.sources.map(src => `
                  <li class="source-item">
                    <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="source-link">
                      ${src.title} ↗
                    </a>
                    <div class="source-note">${src.note}</div>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Bottom Navigation Between Dispatches -->
          <nav class="article-nav-bottom" aria-label="Dispatch navigation">
            ${nextPrevLinks.prev ? `
              <a href="#${nextPrevLinks.prev.id}" class="dispatch-nav-card">
                <span class="dispatch-nav-label">← ${lang === 'ta' ? 'முந்தைய பதிவு' : 'Previous Dispatch'}</span>
                <span class="dispatch-nav-title">${nextPrevLinks.prev.title}</span>
              </a>
            ` : '<div></div>'}
            ${nextPrevLinks.next ? `
              <a href="#${nextPrevLinks.next.id}" class="dispatch-nav-card" style="text-align: right;">
                <span class="dispatch-nav-label">${lang === 'ta' ? 'அடுத்த பதிவு' : 'Next Dispatch'} →</span>
                <span class="dispatch-nav-title">${nextPrevLinks.next.title}</span>
              </a>
            ` : '<div></div>'}
          </nav>
        </main>
      </div>
    `;

    // Attach Poll Interaction Listeners
    if (article.poll) {
      App.attachPollEvents(articleId);
    }

    // Update Footer
    this.renderFooter(lang);
  },

  getAdjacentArticles(currentId, lang) {
    const list = [
      { id: 'article-1', title: magazineContent[lang].cards[0].title },
      { id: 'article-2', title: magazineContent[lang].cards[1].title },
      { id: 'article-3', title: magazineContent[lang].cards[2].title }
    ];
    const currentIndex = list.findIndex(item => item.id === currentId);
    return {
      prev: currentIndex > 0 ? list[currentIndex - 1] : null,
      next: currentIndex < list.length - 1 ? list[currentIndex + 1] : null
    };
  },

  renderPollHTML(articleId, poll, lang) {
    const storedVotes = App.getStoredVotes(articleId);
    const totalVotes = poll.options.reduce((sum, opt) => sum + (storedVotes[opt.id] || opt.count), 0);

    return `
      <div class="article-poll-widget" id="poll-${articleId}">
        <div class="poll-header">
          <span class="poll-tag">◈ ${lang === 'ta' ? 'சிந்தனை வினா & சமூகக் கருத்துக்கணிப்பு' : 'Live Community Inquiry & Poll'}</span>
          <h3 class="poll-question">${poll.question}</h3>
        </div>
        <div class="poll-options-list">
          ${poll.options.map(opt => {
            const count = storedVotes[opt.id] || opt.count;
            const pct = Math.round((count / totalVotes) * 100);
            const isSelected = App.hasUserVoted(articleId) === opt.id ? 'selected' : '';
            return `
              <button class="poll-option-btn ${isSelected}" data-opt-id="${opt.id}" data-article-id="${articleId}">
                <div class="poll-bar-fill" style="width: ${pct}%;"></div>
                <div class="poll-option-content">
                  <span class="poll-text">${opt.text}</span>
                  <span class="poll-pct">${pct}%</span>
                </div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="poll-footer-meta">
          ${lang === 'ta' ? `மொத்தப் பங்களிப்புகள்: ${totalVotes.toLocaleString()}` : `Total verified responses: ${totalVotes.toLocaleString()}`}
        </div>
      </div>
    `;
  },

  renderFooter(lang) {
    const footerData = magazineContent[lang].footer;
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand-title">IT 2030</div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0;">${footerData.tagline}</p>
            <div class="footer-quote">${footerData.quote}</div>
          </div>
          <div class="footer-links-col">
            <h4 class="footer-col-title">${footerData.quickLinksTitle}</h4>
            <ul class="footer-links-list">
              <li><a href="#article-1">01. Web Developers in 2030</a></li>
              <li><a href="#article-2">02. World Without Websites</a></li>
              <li><a href="#article-3">03. The IT Adaptation Solution</a></li>
            </ul>
          </div>
          <div class="footer-links-col">
            <h4 class="footer-col-title">${footerData.sourcesTitle}</h4>
            <ul class="footer-links-list">
              <li><a href="https://www.w3.org/" target="_blank" rel="noopener">W3C Architecture</a></li>
              <li><a href="https://www.weforum.org/" target="_blank" rel="noopener">World Economic Forum</a></li>
              <li><a href="https://cacm.acm.org/" target="_blank" rel="noopener">ACM Digital Library</a></li>
              <li><a href="https://octoverse.github.com/" target="_blank" rel="noopener">GitHub Octoverse</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026—2030 IT 2030 Research Publication. ${footerData.rights}</span>
          <div style="display: flex; gap: 16px; align-items: center;">
            <span class="footer-badge-pill">${footerData.bilingualBadge}</span>
            <button class="back-to-top-btn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
              ↑ ${footerData.backToTop}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
