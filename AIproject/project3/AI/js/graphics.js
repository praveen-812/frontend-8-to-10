/**
 * IT IN 2030 — Bespoke Vector Illustrations and Sector Graphics
 * Clean, lightweight, editorial SVG graphics with soft blue, slate, and teal tones.
 * Every visual communicates a concrete conceptual idea to explain adjacent text.
 */

window.GRAPHICS = {
  // --------------------------------------------------------------------------
  // ARTICLE 1 VISUALS
  // --------------------------------------------------------------------------

  // Main Banner: Human Developer Directing AI
  developerDirector: (compact = false) => `
    <svg class="graphic-svg graphic-director" viewBox="0 0 540 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Human Developer Directing AI">
      <defs>
        <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#60a5fa" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="524" height="264" rx="14" fill="url(#blueGlow)" stroke="#e2e8f0" stroke-width="1.5" />

      <!-- Left: Human Developer / Strategic Director -->
      <g transform="translate(35, 55)">
        <rect x="0" y="0" width="170" height="170" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <rect x="0" y="0" width="170" height="36" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
        <circle cx="18" cy="18" r="4.5" fill="#2563eb"/>
        <text x="30" y="22" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#1e293b" letter-spacing="0.5">HUMAN DIRECTOR</text>
        
        <g transform="translate(18, 50)">
          <circle cx="18" cy="18" r="16" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
          <circle cx="18" cy="12" r="6" fill="#2563eb"/>
          <path d="M8 28 C8 23 13 20 18 20 C23 20 28 23 28 28" fill="#2563eb"/>
          
          <text x="46" y="13" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a">Intent & Taste</text>
          <text x="46" y="27" font-family="system-ui, sans-serif" font-size="9.5" fill="#64748b">Quality Judgement</text>
          <text x="46" y="40" font-family="system-ui, sans-serif" font-size="9.5" fill="#64748b">User Empathy</text>
        </g>

        <!-- Command Pill -->
        <rect x="15" y="122" width="140" height="30" rx="6" fill="#f1f5f9" stroke="#e2e8f0"/>
        <circle cx="28" cy="137" r="3.5" fill="#10b981"/>
        <text x="38" y="141" font-family="monospace" font-size="9" fill="#334155">direct(ai_agents)</text>
      </g>

      <!-- Connecting Flow Pulses -->
      <path d="M205 100 C 235 100, 240 70, 275 70" stroke="url(#accentLine)" stroke-width="2" stroke-dasharray="4 3"/>
      <path d="M205 140 C 240 140, 240 140, 275 140" stroke="url(#accentLine)" stroke-width="2"/>
      <path d="M205 180 C 235 180, 240 210, 275 210" stroke="url(#accentLine)" stroke-width="2" stroke-dasharray="4 3"/>

      <polygon points="275,66 283,70 275,74" fill="#2563eb"/>
      <polygon points="275,136 283,140 275,144" fill="#2563eb"/>
      <polygon points="275,206 283,210 275,214" fill="#2563eb"/>

      <!-- Right: Three Specialized AI Nodes -->
      <!-- AI Synthesizer -->
      <g transform="translate(285, 45)">
        <rect width="215" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect x="12" y="13" width="24" height="24" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
        <path d="M19 21 L23 25 L19 29 M26 29 L30 29" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round"/>
        <text x="46" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e293b">AI Synthesizer</text>
        <text x="46" y="37" font-family="system-ui, sans-serif" font-size="9.5" fill="#64748b">Generates Boilerplate & Routes</text>
      </g>

      <!-- Security & Test Mesh -->
      <g transform="translate(285, 115)">
        <rect width="215" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect x="12" y="13" width="24" height="24" rx="6" fill="#f0fdf4" stroke="#bbf7d0"/>
        <path d="M24 17 L24 33 M17 25 L31 25" stroke="#16a34a" stroke-width="1.8" stroke-linecap="round"/>
        <text x="46" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e293b">Security & Test Mesh</text>
        <text x="46" y="37" font-family="system-ui, sans-serif" font-size="9.5" fill="#64748b">Audits Bugs & Dependencies</text>
      </g>

      <!-- Layout & Optimization -->
      <g transform="translate(285, 185)">
        <rect width="215" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect x="12" y="13" width="24" height="24" rx="6" fill="#faf5ff" stroke="#e9d5ff"/>
        <rect x="17" y="19" width="14" height="12" rx="2" stroke="#9333ea" stroke-width="1.5"/>
        <path d="M17 23 H31" stroke="#9333ea" stroke-width="1.2"/>
        <text x="46" y="24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e293b">Layout & Optimization</text>
        <text x="46" y="37" font-family="system-ui, sans-serif" font-size="9.5" fill="#64748b">Responsive CSS & Caching</text>
      </g>
    </svg>
  `,

  // Side Rail Visual 1: The Human Decision Loop
  humanDecisionLoop: () => `
    <svg class="graphic-svg graphic-side-loop" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Human Directing AI Decision Loop">
      <rect width="320" height="320" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      
      <!-- Top Title Tag -->
      <rect x="14" y="14" width="292" height="28" rx="6" fill="#eff6ff" stroke="#bfdbfe"/>
      <text x="160" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#2563eb" letter-spacing="0.5">THE HUMAN DIRECTING LOOP</text>

      <!-- Step 1: Human Intent -->
      <g transform="translate(20, 52)">
        <rect width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="24" cy="21" r="11" fill="#2563eb"/>
        <text x="24" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">1</text>
        <text x="46" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="750" fill="#0f172a">Human Developer</text>
        <text x="46" y="33" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">Defines goal, UX intent & taste</text>
      </g>

      <!-- Down Arrow -->
      <path d="M160 96 L160 106 M156 102 L160 106 L164 102" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>

      <!-- Step 2: AI Synthesizes -->
      <g transform="translate(20, 108)">
        <rect width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="24" cy="21" r="11" fill="#64748b"/>
        <text x="24" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">2</text>
        <text x="46" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="750" fill="#0f172a">AI Tools Generate</text>
        <text x="46" y="33" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">Produces code & initial options</text>
      </g>

      <!-- Down Arrow -->
      <path d="M160 152 L160 162 M156 158 L160 162 L164 158" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>

      <!-- Step 3: Human Review -->
      <g transform="translate(20, 164)">
        <rect width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="24" cy="21" r="11" fill="#d97706"/>
        <text x="24" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">3</text>
        <text x="46" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="750" fill="#0f172a">Review & Scrutiny</text>
        <text x="46" y="33" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">Audits security, logic & aesthetics</text>
      </g>

      <!-- Down Arrow -->
      <path d="M160 208 L160 218 M156 214 L160 218 L164 214" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>

      <!-- Step 4: Refine & Prune -->
      <g transform="translate(20, 220)">
        <rect width="280" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="24" cy="21" r="11" fill="#9333ea"/>
        <text x="24" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">4</text>
        <text x="46" y="20" font-family="system-ui, sans-serif" font-size="11" font-weight="750" fill="#0f172a">Refine & Prune</text>
        <text x="46" y="33" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">Removes bloat, adjusts tone</text>
      </g>

      <!-- Down Arrow -->
      <path d="M160 264 L160 274 M156 270 L160 274 L164 270" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>

      <!-- Step 5: Final Human Approval -->
      <g transform="translate(20, 276)">
        <rect width="280" height="34" rx="8" fill="#f0fdf4" stroke="#86efac"/>
        <circle cx="24" cy="17" r="10" fill="#16a34a"/>
        <path d="M21 17 L23 19 L27 15" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
        <text x="46" y="21" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#15803d">Final Human Decision</text>
      </g>
    </svg>
  `,

  // Side Rail Visual 1B: Taste & Intention (Medical Clinic Example)
  tasteAndIntentionComparison: () => `
    <svg class="graphic-svg graphic-side-taste" viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AI Output vs Human Taste Comparison">
      <rect width="320" height="250" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <!-- Header -->
      <rect x="12" y="12" width="296" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="160" y="29" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#334155">CASE STUDY: MEDICAL CLINIC PORTAL</text>

      <!-- Left: Raw AI Output -->
      <g transform="translate(16, 48)">
        <rect width="138" height="186" rx="8" fill="#fef2f2" stroke="#fecaca"/>
        <text x="69" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#dc2626">RAW AI CODE</text>
        <line x1="12" y1="28" x2="126" y2="28" stroke="#fca5a5" stroke-dasharray="2 2"/>
        
        <!-- Cold UI mockup -->
        <rect x="14" y="38" width="110" height="12" rx="2" fill="#94a3b8"/>
        <rect x="14" y="56" width="110" height="40" rx="3" fill="#cbd5e1"/>
        <text x="69" y="80" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" fill="#475569">Cold / Clinical</text>
        
        <!-- Warning indicator -->
        <circle cx="69" cy="120" r="14" fill="#fee2e2"/>
        <text x="69" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#dc2626">✕</text>
        
        <text x="69" y="152" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#991b1b">Lacks empathy</text>
        <text x="69" y="166" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#7f1d1d">Confusing for patients</text>
      </g>

      <!-- Right: Human Directed -->
      <g transform="translate(166, 48)">
        <rect width="138" height="186" rx="8" fill="#f0fdf4" stroke="#bbf7d0"/>
        <text x="69" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#16a34a">HUMAN DIRECTED</text>
        <line x1="12" y1="28" x2="126" y2="28" stroke="#86efac" stroke-dasharray="2 2"/>
        
        <!-- Warm UI mockup -->
        <rect x="14" y="38" width="110" height="12" rx="2" fill="#3b82f6"/>
        <rect x="14" y="56" width="110" height="40" rx="3" fill="#dbeafe"/>
        <text x="69" y="80" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="600" fill="#1e40af">Warm & Welcoming</text>

        <!-- Success indicator -->
        <circle cx="69" cy="120" r="14" fill="#dcfce7"/>
        <text x="69" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#16a34a">✓</text>
        
        <text x="69" y="152" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#166534">Clear priority UX</text>
        <text x="69" y="166" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#14532d">Emergency call on top</text>
      </g>
    </svg>
  `,

  // --------------------------------------------------------------------------
  // ARTICLE 2 VISUALS: REALISTIC SOCIETAL CONSEQUENCES
  // --------------------------------------------------------------------------

  // Main Banner: The Interconnected Web Fabric
  interconnectedWeb: (compact = false) => `
    <svg class="graphic-svg graphic-web-mesh" viewBox="0 0 540 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Interconnected Web Protocol">
      <defs>
        <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.03" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="524" height="264" rx="14" fill="url(#meshGradient)" stroke="#e2e8f0" stroke-width="1.5"/>

      <!-- Central Browser / Open Protocol Ring -->
      <g transform="translate(270, 140)">
        <circle cx="0" cy="0" r="74" fill="#ffffff" stroke="#e0e7ff" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="54" fill="#f8fafc" stroke="#c7d2fe" stroke-width="1.5" stroke-dasharray="3 3"/>
        
        <circle cx="0" cy="0" r="32" stroke="#4f46e5" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="15" ry="32" stroke="#4f46e5" stroke-width="1.5"/>
        <line x1="-32" y1="0" x2="32" y2="0" stroke="#4f46e5" stroke-width="1.5"/>
        <text x="0" y="46" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#4338ca" letter-spacing="0.5">OPEN WEB PROTOCOL</text>
      </g>

      <!-- Radiating Connecting Lines -->
      <line x1="140" y1="65" x2="215" y2="105" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="400" y1="65" x2="325" y2="105" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="85" y1="140" x2="194" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="455" y1="140" x2="346" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="140" y1="215" x2="215" y2="175" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>
      <line x1="400" y1="215" x2="325" y2="175" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>

      <!-- Surrounding Vital Nodes -->
      <g transform="translate(65, 42)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#eff6ff"/>
        <path d="M16 26 L16 19 C16 17 24 17 24 19 L24 26 M14 26 H26" stroke="#2563eb" stroke-width="1.5"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Transit</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Live Ticketing</text>
      </g>

      <g transform="translate(365, 42)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#f0fdf4"/>
        <path d="M15 25 H25 M20 17 V29" stroke="#16a34a" stroke-width="1.5"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Banking</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Transactions</text>
      </g>

      <g transform="translate(25, 117)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#fef3c7"/>
        <path d="M15 25 H25 M15 20 H25 M20 16 L25 18 L15 18 Z" stroke="#d97706" stroke-width="1.3"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Civic Aid</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Public Forms</text>
      </g>

      <g transform="translate(405, 117)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#faf5ff"/>
        <path d="M16 20 H24 L25 27 H15 Z" stroke="#9333ea" stroke-width="1.3"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Commerce</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Global Reach</text>
      </g>

      <g transform="translate(65, 192)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#fff1f2"/>
        <circle cx="20" cy="23" r="6" stroke="#e11d48" stroke-width="1.3"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Dining</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Local Orders</text>
      </g>

      <g transform="translate(365, 192)">
        <rect width="110" height="46" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="20" cy="23" r="10" fill="#f0f9ff"/>
        <rect x="16" y="19" width="8" height="8" stroke="#0284c7" stroke-width="1.3"/>
        <text x="36" y="21" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#1e293b">Logistics</text>
        <text x="36" y="32" font-family="system-ui, sans-serif" font-size="8.5" fill="#64748b">Parcel Tracking</text>
      </g>
    </svg>
  `,

  // Side Rail Visual 2A: Government Service Comparison (Physical Queue vs Online)
  govServiceComparison: () => `
    <svg class="graphic-svg graphic-side-gov" viewBox="0 0 320 230" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Government Public Services Comparison">
      <rect width="320" height="230" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <!-- Header -->
      <rect x="12" y="12" width="296" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="160" y="29" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#334155">CIVIC SERVICES: WITH VS WITHOUT WEB</text>

      <!-- Left: Physical Queue -->
      <g transform="translate(16, 48)">
        <rect width="138" height="166" rx="8" fill="#fffbeb" stroke="#fde68a"/>
        <text x="69" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#b45309">WITHOUT WEBSITES</text>
        <line x1="12" y1="28" x2="126" y2="28" stroke="#fcd34d" stroke-dasharray="2 2"/>
        
        <!-- Counter & People Queue -->
        <rect x="14" y="38" width="110" height="18" rx="2" fill="#d97706"/>
        <text x="69" y="50" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#ffffff">Town Hall Window</text>

        <!-- Queue figures -->
        <g transform="translate(24, 68)">
          <circle cx="10" cy="10" r="6" fill="#b45309"/>
          <path d="M4 24 C4 18 16 18 16 24" fill="#b45309"/>
          <circle cx="34" cy="10" r="6" fill="#b45309"/>
          <path d="M28 24 C28 18 40 18 40 24" fill="#b45309"/>
          <circle cx="58" cy="10" r="6" fill="#b45309"/>
          <path d="M52 24 C52 18 64 18 64 24" fill="#b45309"/>
          <circle cx="82" cy="10" r="6" fill="#b45309"/>
          <path d="M76 24 C76 18 88 18 88 24" fill="#b45309"/>
        </g>
        
        <rect x="18" y="112" width="102" height="42" rx="4" fill="#fef3c7"/>
        <text x="69" y="127" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#92400e">Hours in Queue</text>
        <text x="69" y="141" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#78350f">Manual paper forms</text>
      </g>

      <!-- Right: Online Portal -->
      <g transform="translate(166, 48)">
        <rect width="138" height="166" rx="8" fill="#eff6ff" stroke="#bfdbfe"/>
        <text x="69" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#1d4ed8">WITH WEBSITES</text>
        <line x1="12" y1="28" x2="126" y2="28" stroke="#93c5fd" stroke-dasharray="2 2"/>
        
        <!-- Online interface -->
        <rect x="14" y="38" width="110" height="52" rx="4" fill="#ffffff" stroke="#93c5fd"/>
        <rect x="22" y="46" width="60" height="6" rx="2" fill="#2563eb"/>
        <rect x="22" y="58" width="94" height="4" rx="2" fill="#e2e8f0"/>
        <rect x="22" y="66" width="70" height="4" rx="2" fill="#e2e8f0"/>
        <rect x="22" y="76" width="36" height="8" rx="2" fill="#16a34a"/>
        <text x="40" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="6.5" font-weight="700" fill="#ffffff">SUBMIT</text>

        <rect x="18" y="112" width="102" height="42" rx="4" fill="#dbeafe"/>
        <text x="69" y="127" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#1e40af">Instant Access</text>
        <text x="69" y="141" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#1e3a8a">From home, 24/7</text>
      </g>
    </svg>
  `,

  // Side Rail Visual 2B: Food Delivery 3-Way Connected Flow
  foodDeliveryLoop: () => `
    <svg class="graphic-svg graphic-side-food" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital Food Delivery Connection Flow">
      <rect width="320" height="220" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <!-- Header -->
      <rect x="12" y="12" width="296" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="160" y="29" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#334155">THE 3-WAY DIGITAL ECOSYSTEM</text>

      <!-- Center Node: The Web Platform -->
      <g transform="translate(110, 60)">
        <rect width="100" height="48" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
        <text x="50" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#1d4ed8">DIGITAL WEB</text>
        <text x="50" y="36" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">Live Coordination</text>
      </g>

      <!-- Left Bottom: Customer -->
      <g transform="translate(18, 140)">
        <rect width="84" height="62" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="42" cy="22" r="10" fill="#2563eb"/>
        <path d="M35 38 C35 34 49 34 49 38" fill="#2563eb"/>
        <text x="42" y="52" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1e293b">Customer</text>
      </g>

      <!-- Right Bottom: Restaurant Kitchen -->
      <g transform="translate(218, 140)">
        <rect width="84" height="62" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="42" cy="22" r="10" fill="#ea580c"/>
        <path d="M36 26 C36 21 48 21 48 26 H36 Z" stroke="#ffffff" stroke-width="1.5"/>
        <text x="42" y="52" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1e293b">Restaurant</text>
      </g>

      <!-- Middle Bottom: Delivery Partner -->
      <g transform="translate(118, 140)">
        <rect width="84" height="62" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
        <circle cx="42" cy="22" r="10" fill="#16a34a"/>
        <rect x="37" y="18" width="10" height="8" rx="2" fill="#ffffff"/>
        <text x="42" y="52" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1e293b">Rider</text>
      </g>

      <!-- Connector Arrows -->
      <path d="M60 140 L 130 108" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="3 3"/>
      <path d="M260 140 L 190 108" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="3 3"/>
      <path d="M160 108 L 160 140" stroke="#16a34a" stroke-width="2"/>
    </svg>
  `,

  // --------------------------------------------------------------------------
  // ARTICLE 3 VISUALS: THE SOLUTION (PROMINENT & ACTIONABLE)
  // --------------------------------------------------------------------------

  // Central Solution Formula
  centralSolutionFormula: () => `
    <svg class="graphic-svg graphic-solution-formula" viewBox="0 0 540 180" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The 2030 Solution Formula">
      <defs>
        <linearGradient id="solGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d9488" stop-opacity="0.10" />
          <stop offset="50%" stop-color="#2563eb" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.02" />
        </linearGradient>
      </defs>

      <rect x="6" y="6" width="528" height="168" rx="14" fill="url(#solGlow)" stroke="#0d9488" stroke-width="1.8"/>

      <!-- Title Bar -->
      <text x="270" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#0f766e" letter-spacing="1">THE COMPLETE SOLUTION FORMULA</text>

      <!-- Step 1: Human Judgment -->
      <g transform="translate(20, 48)">
        <rect width="84" height="96" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="42" cy="30" r="14" fill="#eff6ff"/>
        <text x="42" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#2563eb">👤</text>
        <text x="42" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0f172a">Human</text>
        <text x="42" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">Taste & Goal</text>
      </g>

      <text x="114" y="100" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#0d9488">+</text>

      <!-- Step 2: AI Leverage -->
      <g transform="translate(126, 48)">
        <rect width="84" height="96" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="42" cy="30" r="14" fill="#f0fdf4"/>
        <text x="42" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#16a34a">⚡</text>
        <text x="42" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0f172a">AI Speed</text>
        <text x="42" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">10x Execution</text>
      </g>

      <text x="220" y="100" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#0d9488">+</text>

      <!-- Step 3: Empathy / User Need -->
      <g transform="translate(232, 48)">
        <rect width="84" height="96" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="42" cy="30" r="14" fill="#fef3c7"/>
        <text x="42" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#d97706">❤️</text>
        <text x="42" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0f172a">Empathy</text>
        <text x="42" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">Real Needs</text>
      </g>

      <text x="326" y="100" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#0d9488">+</text>

      <!-- Step 4: Real Problem Solving -->
      <g transform="translate(338, 48)">
        <rect width="84" height="96" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <circle cx="42" cy="30" r="14" fill="#faf5ff"/>
        <text x="42" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#9333ea">🎯</text>
        <text x="42" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" fill="#0f172a">Solutions</text>
        <text x="42" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#64748b">Practical Value</text>
      </g>

      <text x="432" y="100" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#0d9488">=</text>

      <!-- Step 5: Lasting Value -->
      <g transform="translate(444, 48)">
        <rect width="80" height="96" rx="8" fill="#0d9488" stroke="#0f766e" stroke-width="1.5"/>
        <circle cx="40" cy="30" r="14" fill="#ffffff"/>
        <text x="40" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0d9488">★</text>
        <text x="40" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff">FUTURE</text>
        <text x="40" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="700" fill="#ccfbf1">VALUE</text>
      </g>
    </svg>
  `,

  // Side Rail Visual 3A: Taste Correction (Problem → Solution)
  tasteCorrectionVisual: () => `
    <svg class="graphic-svg graphic-side-correction" viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Problem to Solution Visual Workflow">
      <rect width="320" height="250" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <rect x="12" y="12" width="296" height="26" rx="6" fill="#f0fdfa" stroke="#99f6e4"/>
      <text x="160" y="29" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#0f766e">THE REALITY TEST: TASTE & DIRECTION</text>

      <!-- Problem Block -->
      <g transform="translate(16, 48)">
        <rect width="288" height="74" rx="8" fill="#fff5f5" stroke="#fed7d7"/>
        <rect x="10" y="10" width="60" height="18" rx="4" fill="#e53e3e"/>
        <text x="40" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#ffffff">PROBLEM</text>
        <text x="80" y="22" font-family="system-ui, sans-serif" font-size="10" font-weight="750" fill="#742a2a">AI generated a website blindly</text>
        <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9" fill="#9b2c2c">• Layout is generic and technically dry</text>
        <text x="12" y="60" font-family="system-ui, sans-serif" font-size="9" fill="#9b2c2c">• Does not match user emotion or client taste</text>
      </g>

      <!-- Down Transition Arrow -->
      <g transform="translate(160, 132)">
        <circle cx="0" cy="0" r="11" fill="#0d9488"/>
        <path d="M0 -5 L0 5 M-3 2 L0 5 L3 2" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
      </g>

      <!-- Solution Block -->
      <g transform="translate(16, 152)">
        <rect width="288" height="84" rx="8" fill="#f0fdf4" stroke="#c6f6d5"/>
        <rect x="10" y="10" width="60" height="18" rx="4" fill="#38a169"/>
        <text x="40" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" font-weight="800" fill="#ffffff">SOLUTION</text>
        <text x="80" y="22" font-family="system-ui, sans-serif" font-size="10" font-weight="750" fill="#22543d">Human directs & curates result</text>
        <text x="12" y="44" font-family="system-ui, sans-serif" font-size="9" fill="#276749">• Reviews design, removes clutter and filler</text>
        <text x="12" y="58" font-family="system-ui, sans-serif" font-size="9" fill="#276749">• Adjusts color palette, typography and hierarchy</text>
        <text x="12" y="72" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1e3a1e">Result: Authentic, elegant, human product</text>
      </g>
    </svg>
  `,

  // Main Banner: The Adaptive Horizon
  adaptiveHorizon: (compact = false) => `
    <svg class="graphic-svg graphic-adaptive" viewBox="0 0 540 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Adaptive Horizon Framework">
      <defs>
        <linearGradient id="tealGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d9488" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.03" />
        </linearGradient>
      </defs>

      <rect x="8" y="8" width="524" height="264" rx="14" fill="url(#tealGlow)" stroke="#0d9488" stroke-width="1.5"/>

      <!-- Stepped Pillars from Baseline to Peak Value -->
      <!-- Step 1: Syntactic Coder -->
      <g transform="translate(45, 160)">
        <rect x="0" y="0" width="95" height="80" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
        <rect x="0" y="0" width="95" height="22" rx="8" fill="#f1f5f9"/>
        <text x="47" y="15" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#475569">STAGE 1</text>
        <text x="47" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0f172a">Syntax Only</text>
        <text x="47" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" fill="#94a3b8">Commoditized</text>
      </g>

      <path d="M140 185 L 165 155" stroke="#0d9488" stroke-width="2" stroke-dasharray="3 3"/>

      <!-- Step 2: AI Leverage -->
      <g transform="translate(170, 120)">
        <rect x="0" y="0" width="100" height="120" rx="8" fill="#ffffff" stroke="#99f6e4" stroke-width="1.5"/>
        <rect x="0" y="0" width="100" height="22" rx="8" fill="#ccfbf1"/>
        <text x="50" y="15" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#0f766e">STAGE 2</text>
        <text x="50" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0f172a">AI Leverage</text>
        <text x="50" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" fill="#0d9488">10x Output Speed</text>
        <rect x="18" y="78" width="64" height="6" rx="3" fill="#e0f2fe"/>
      </g>

      <path d="M270 145 L 295 115" stroke="#0d9488" stroke-width="2" stroke-dasharray="3 3"/>

      <!-- Step 3: Product & Empathy Thinker -->
      <g transform="translate(300, 80)">
        <rect x="0" y="0" width="105" height="160" rx="8" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
        <rect x="0" y="0" width="105" height="22" rx="8" fill="#dbeafe"/>
        <text x="52" y="15" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1d4ed8">STAGE 3</text>
        <text x="52" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0f172a">UX & Problem</text>
        <text x="52" y="62" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" fill="#2563eb">Human Empathy</text>
        <rect x="18" y="80" width="68" height="6" rx="3" fill="#dbeafe"/>
        <rect x="18" y="94" width="48" height="6" rx="3" fill="#dbeafe"/>
      </g>

      <path d="M405 105 L 430 75" stroke="#0d9488" stroke-width="2.5"/>

      <!-- Step 4: Autonomous Creator / Independent Builder -->
      <g transform="translate(435, 40)">
        <rect x="0" y="0" width="70" height="200" rx="8" fill="#ffffff" stroke="#0d9488" stroke-width="2"/>
        <rect x="0" y="0" width="70" height="24" rx="8" fill="#0d9488"/>
        <text x="35" y="16" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#ffffff">VALUE</text>
        <circle cx="35" cy="46" r="14" fill="#eff6ff" stroke="#93c5fd"/>
        <path d="M35 38 L37 43 L42 43 L38 46 L40 51 L35 48 L30 51 L32 46 L28 43 L33 43 Z" fill="#0d9488"/>
        <text x="35" y="74" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#0f172a">Creator</text>
        <text x="35" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8.5" fill="#0d9488">Autonomy</text>
      </g>
    </svg>
  `,

  // Sector Icons for Article 2
  sectorIcons: {
    civic: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#eff6ff"/>
        <path d="M12 28 H28 M14 28 V20 M20 28 V20 M26 28 V20 M12 20 H28 M20 12 L29 17 H11 L20 12 Z" stroke="#2563eb" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    rail: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f0f9ff"/>
        <rect x="13" y="11" width="14" height="18" rx="3" stroke="#0284c7" stroke-width="1.7"/>
        <circle cx="16.5" cy="23" r="1.2" fill="#0284c7"/>
        <circle cx="23.5" cy="23" r="1.2" fill="#0284c7"/>
        <line x1="13" y1="18" x2="27" y2="18" stroke="#0284c7" stroke-width="1.5"/>
        <line x1="14" y1="29" x2="11" y2="32" stroke="#0284c7" stroke-width="1.7" stroke-linecap="round"/>
        <line x1="26" y1="29" x2="29" y2="32" stroke="#0284c7" stroke-width="1.7" stroke-linecap="round"/>
      </svg>
    `,
    bank: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f0fdf4"/>
        <rect x="11" y="14" width="18" height="13" rx="2" stroke="#16a34a" stroke-width="1.7"/>
        <circle cx="20" cy="20.5" r="2.5" stroke="#16a34a" stroke-width="1.5"/>
        <line x1="11" y1="18" x2="29" y2="18" stroke="#16a34a" stroke-width="1.5"/>
      </svg>
    `,
    food: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#fff7ed"/>
        <path d="M12 25 C12 18 28 18 28 25 H12 Z" stroke="#ea580c" stroke-width="1.7" stroke-linejoin="round"/>
        <line x1="10" y1="27" x2="30" y2="27" stroke="#ea580c" stroke-width="1.7" stroke-linecap="round"/>
        <circle cx="20" cy="15" r="1.5" fill="#ea580c"/>
      </svg>
    `,
    shop: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#faf5ff"/>
        <path d="M13 16 L15 28 H25 L27 16 H13 Z" stroke="#9333ea" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M17 16 V13 C17 11.5 18.5 10 20 10 C21.5 10 23 11.5 23 13 V16" stroke="#9333ea" stroke-width="1.7" stroke-linecap="round"/>
      </svg>
    `,
    hotel: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#ecfeff"/>
        <path d="M11 27 V14 M11 22 H29 M29 27 V19 C29 17.5 28 16 26.5 16 H19 V22" stroke="#0891b2" stroke-width="1.7" stroke-linecap="round"/>
        <circle cx="15" cy="18" r="2" fill="#0891b2"/>
      </svg>
    `,
    movie: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#fff1f2"/>
        <rect x="11" y="14" width="18" height="13" rx="2" stroke="#e11d48" stroke-width="1.7"/>
        <line x1="20" y1="14" x2="20" y2="27" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle cx="11" cy="20.5" r="2" fill="#ffffff" stroke="#e11d48" stroke-width="1.5"/>
        <circle cx="29" cy="20.5" r="2" fill="#ffffff" stroke="#e11d48" stroke-width="1.5"/>
      </svg>
    `,
    post: `
      <svg class="sector-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#f8fafc"/>
        <rect x="11" y="13" width="18" height="14" rx="2" stroke="#475569" stroke-width="1.7"/>
        <path d="M11 15 L20 21 L29 15" stroke="#475569" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
  }
};
