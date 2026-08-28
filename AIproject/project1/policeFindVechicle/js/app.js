/**
 * VehicleGuard AI - Main Application Core Script
 * Handles LocalStorage state, mock database, sound alerts, theme toggle,
 * single-button dynamic Police Login/Logout state management, plate normalization & validation.
 */

// Initial Seed Stolen Vehicle Database (Tamil Nadu Jurisdiction inspired demo data)
const INITIAL_STOLEN_VEHICLES = [
    {
        vehicleNumber: "TN09AB1234",
        vehicleType: "Motorcycle",
        make: "Royal Enfield",
        model: "Classic 350 (2023)",
        color: "Stealth Black",
        complaintNumber: "FIR-2026-CHN-00412",
        policeStation: "T. Nagar Police Station (E-1)",
        district: "Chennai",
        complaintDate: "2026-08-18",
        theftLocation: "Pondy Bazaar Near Silk House",
        ownerName: "K. R. Vignesh",
        engineHash: "RE350U89281X",
        status: "STOLEN",
        severity: "HIGH_PRIORITY",
        notes: "Vehicle stolen from roadside parking at 20:30 hrs. CCTV captured 2 suspects heading towards Kodambakkam."
    },
    {
        vehicleNumber: "TN01CD5678",
        vehicleType: "Scooter",
        make: "Honda",
        model: "Activa 6G (2024)",
        color: "Imperial Red",
        complaintNumber: "FIR-2026-CHN-00388",
        policeStation: "Mylapore Police Station (E-4)",
        district: "Chennai",
        complaintDate: "2026-08-19",
        theftLocation: "Luz Church Road Junction",
        ownerName: "S. Meenakshi",
        engineHash: "HA6G441908K",
        status: "STOLEN",
        severity: "ACTIVE",
        notes: "Reported missing within 45 minutes of theft outside supermarket."
    },
    {
        vehicleNumber: "TN38BZ4590",
        vehicleType: "Car / Sedan",
        make: "Hyundai",
        model: "Verna SX (2022)",
        color: "Polar White",
        complaintNumber: "FIR-2026-CBE-00192",
        policeStation: "RS Puram Police Station (B-2)",
        district: "Coimbatore",
        complaintDate: "2026-08-15",
        theftLocation: "DB Road Commercial Complex",
        ownerName: "P. Anand Kumar",
        engineHash: "HY15V991244",
        status: "STOLEN",
        severity: "HIGH_PRIORITY",
        notes: "Suspected interstate syndicate movement towards Kerala border (Walayar Checkpost)."
    },
    {
        vehicleNumber: "TN59AQ7812",
        vehicleType: "Motorcycle",
        make: "Yamaha",
        model: "MT-15 V2 (2023)",
        color: "Cyan Metallic",
        complaintNumber: "FIR-2026-MDU-00501",
        policeStation: "Anna Nagar Police Station",
        district: "Madurai",
        complaintDate: "2026-08-21",
        theftLocation: "Mattuthavani Bus Stand Parking",
        ownerName: "M. Dinesh Raj",
        engineHash: "YM155X77123",
        status: "STOLEN",
        severity: "ACTIVE",
        notes: "Left mirror missing; distinctive neon rim decals."
    },
    {
        vehicleNumber: "TN27CK3301",
        vehicleType: "Commercial / Auto",
        make: "Bajaj",
        model: "Compact 4S Auto (2021)",
        color: "Yellow & Black",
        complaintNumber: "FIR-2026-SLM-00084",
        policeStation: "Hasthampatti Police Station",
        district: "Salem",
        complaintDate: "2026-08-12",
        theftLocation: "Salem Old Bus Stand Auto Stand",
        ownerName: "T. Selvam",
        engineHash: "BJ4S100982",
        status: "STOLEN",
        severity: "ACTIVE",
        notes: "Used for local passenger runs; reported missing overnight."
    },
    {
        vehicleNumber: "TN45DE6729",
        vehicleType: "SUV",
        make: "Mahindra",
        model: "Thar 4x4 (2023)",
        color: "Rocky Beige",
        complaintNumber: "FIR-2026-TRY-00219",
        policeStation: "Thillai Nagar Police Station",
        district: "Tiruchirappalli",
        complaintDate: "2026-08-20",
        theftLocation: "Salai Road Dining Arcade",
        ownerName: "R. Balachandar",
        engineHash: "MH20D99812A",
        status: "STOLEN",
        severity: "HIGH_PRIORITY",
        notes: "High value target; GPS tracker was deactivated 10 km north of Trichy toll plaza."
    },
    {
        vehicleNumber: "TN72AA1122",
        vehicleType: "Motorcycle",
        make: "TVS",
        model: "Apache RTR 160 4V",
        color: "Racing Blue",
        complaintNumber: "FIR-2026-TNV-00109",
        policeStation: "Palayamkottai Police Station",
        district: "Tirunelveli",
        complaintDate: "2026-08-22",
        theftLocation: "Vannarpettai High Road",
        ownerName: "G. Murugesan",
        engineHash: "TVS160R5521",
        status: "STOLEN",
        severity: "ACTIVE",
        notes: "Stolen during evening festival crowd."
    }
];

// Initial Seed Scan History
const INITIAL_SCAN_HISTORY = [
    {
        id: "SCN-10921",
        vehicleNumber: "TN09AB1234",
        timestamp: "2026-08-24 19:42:10",
        result: "STOLEN",
        location: "Koyambedu Checkpost #4",
        officer: "SI K. Arumugam (DEMO001)",
        details: "Royal Enfield Classic 350 - Stolen from T. Nagar"
    },
    {
        id: "SCN-10920",
        vehicleNumber: "TN07BK9988",
        timestamp: "2026-08-24 19:35:18",
        result: "CLEAN",
        location: "Koyambedu Checkpost #4",
        officer: "SI K. Arumugam (DEMO001)",
        details: "No active theft complaints found"
    },
    {
        id: "SCN-10919",
        vehicleNumber: "TN01CD5678",
        timestamp: "2026-08-24 19:20:05",
        result: "STOLEN",
        location: "Guindy Kathipara Junction",
        officer: "HC M. Ramanathan (DEMO002)",
        details: "Honda Activa 6G - Stolen from Mylapore"
    },
    {
        id: "SCN-10918",
        vehicleNumber: "TN22EF4321",
        timestamp: "2026-08-24 19:12:44",
        result: "CLEAN",
        location: "Tambaram Sanatorium Flyover",
        officer: "SI K. Arumugam (DEMO001)",
        details: "No active theft complaints found"
    }
];

// Initial Seed Citizen Complaints
const INITIAL_COMPLAINTS = [
    {
        referenceNumber: "SVR-2026-482731",
        vehicleNumber: "TN09AB1234",
        ownerName: "K. R. Vignesh",
        mobile: "98401XXXXX",
        vehicleType: "Motorcycle",
        make: "Royal Enfield",
        model: "Classic 350",
        color: "Stealth Black",
        incidentDate: "2026-08-18",
        incidentTime: "20:30",
        district: "Chennai",
        policeStation: "T. Nagar Police Station (E-1)",
        location: "Pondy Bazaar Near Silk House",
        status: "FIR Registered — Demo Status",
        statusCode: "REGISTERED",
        submissionDate: "2026-08-18 21:15:00",
        remarks: "FIR registered under section 379 IPC. Added to central ANPR tracking watchlist."
    },
    {
        referenceNumber: "SVR-2026-192844",
        vehicleNumber: "TN33KL9012",
        ownerName: "V. Parthiban",
        mobile: "94432XXXXX",
        vehicleType: "Scooter",
        make: "TVS",
        model: "Jupiter",
        color: "Titanium Grey",
        incidentDate: "2026-08-23",
        incidentTime: "14:00",
        district: "Erode",
        policeStation: "Erode Town Police Station",
        location: "Brough Road Shopping Complex",
        status: "Under Police Review",
        statusCode: "UNDER_REVIEW",
        submissionDate: "2026-08-23 15:40:12",
        remarks: "Verification of RC copy in progress with local sub-division."
    },
    {
        referenceNumber: "SVR-2026-773120",
        vehicleNumber: "TN67CD2209",
        ownerName: "A. Mohamed Farooq",
        mobile: "97890XXXXX",
        vehicleType: "Car",
        make: "Maruti Suzuki",
        model: "Swift VXi",
        color: "Silky Silver",
        incidentDate: "2026-08-24",
        incidentTime: "11:20",
        district: "Virudhunagar",
        policeStation: "Sivakasi Town Station",
        location: "Near Post Office Bazaar",
        status: "Pending Verification",
        statusCode: "PENDING",
        submissionDate: "2026-08-24 12:05:30",
        remarks: "Citizen submission received. Assigned to Sub-Inspector for document scrutiny."
    }
];

// Initialize Storage
function initDatabase() {
    if (!localStorage.getItem('vg_stolen_db')) {
        localStorage.setItem('vg_stolen_db', JSON.stringify(INITIAL_STOLEN_VEHICLES));
    }
    if (!localStorage.getItem('vg_scan_history')) {
        localStorage.setItem('vg_scan_history', JSON.stringify(INITIAL_SCAN_HISTORY));
    }
    if (!localStorage.getItem('vg_complaints')) {
        localStorage.setItem('vg_complaints', JSON.stringify(INITIAL_COMPLAINTS));
    }
    if (!localStorage.getItem('vg_theme')) {
        localStorage.setItem('vg_theme', 'dark');
    }
}

// Get Stolen Database
function getStolenDatabase() {
    try {
        const data = localStorage.getItem('vg_stolen_db');
        return data ? JSON.parse(data) : INITIAL_STOLEN_VEHICLES;
    } catch (e) {
        return INITIAL_STOLEN_VEHICLES;
    }
}

// Get Scan History
function getScanHistory() {
    try {
        const data = localStorage.getItem('vg_scan_history');
        return data ? JSON.parse(data) : INITIAL_SCAN_HISTORY;
    } catch (e) {
        return INITIAL_SCAN_HISTORY;
    }
}

// Add to Scan History
function addScanHistory(scanRecord) {
    const history = getScanHistory();
    history.unshift({
        id: "SCN-" + Math.floor(10000 + Math.random() * 90000),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        officer: getLoggedInOfficer() ? `${getLoggedInOfficer().name} (${getLoggedInOfficer().id})` : "Checkpoint Field Officer (DEMO)",
        ...scanRecord
    });
    if (history.length > 100) history.pop();
    localStorage.setItem('vg_scan_history', JSON.stringify(history));
}

// Get Complaints
function getComplaints() {
    try {
        const data = localStorage.getItem('vg_complaints');
        return data ? JSON.parse(data) : INITIAL_COMPLAINTS;
    } catch (e) {
        return INITIAL_COMPLAINTS;
    }
}

/**
 * Normalize Vehicle Number
 */
function normalizeVehicleNumber(input) {
    if (!input) return "";
    return input
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .trim();
}

/**
 * Validate Common Indian Vehicle Registration Formats
 */
function validateVehicleNumber(normalizedNumber) {
    if (!normalizedNumber) return false;
    const standardRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,3}[0-9]{4}$/;
    const bhRegex = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
    const generalValidRegex = /^[A-Z0-9]{6,12}$/;
    return standardRegex.test(normalizedNumber) || bhRegex.test(normalizedNumber) || generalValidRegex.test(normalizedNumber);
}

/**
 * Sound Alert Generator via Web Audio API
 */
function playAlertSound(type = 'stolen') {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        if (type === 'stolen') {
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(880, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
            gain1.gain.setValueAtTime(0.3, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start();
            osc1.stop(ctx.currentTime + 0.16);

            setTimeout(() => {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sawtooth';
                osc2.frequency.setValueAtTime(980, ctx.currentTime);
                osc2.frequency.exponentialRampToValueAtTime(490, ctx.currentTime + 0.2);
                gain2.gain.setValueAtTime(0.4, ctx.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start();
                osc2.stop(ctx.currentTime + 0.21);
            }, 180);
        } else if (type === 'clean') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'beep') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        }
    } catch (e) {
        console.warn("Audio Context unavailable or user interaction needed.", e);
    }
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-4 opacity-0 ${
        type === 'success' ? 'bg-emerald-900/95 border-emerald-500 text-emerald-100' :
        type === 'error' || type === 'stolen' ? 'bg-rose-900/95 border-rose-500 text-rose-100 strobe-alert' :
        type === 'warning' ? 'bg-amber-900/95 border-amber-500 text-amber-100' :
        'bg-slate-800/95 border-slate-600 text-slate-100'
    }`;

    const icon = type === 'success' ? '✅' :
                 type === 'error' || type === 'stolen' ? '🚨' :
                 type === 'warning' ? '⚠️' : 'ℹ️';

    toast.innerHTML = `
        <span class="text-xl mr-3 flex-shrink-0">${icon}</span>
        <div class="flex-1 text-xs sm:text-sm font-semibold leading-snug">${message}</div>
        <button class="ml-2 text-slate-400 hover:text-white text-lg font-bold p-1 leading-none" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-4');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Theme Toggle Handler
 */
function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
    }
    localStorage.setItem('vg_theme', theme);
    
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        const iconSpan = btn.querySelector('.theme-icon');
        const textSpan = btn.querySelector('.theme-text');
        if (theme === 'light') {
            if (iconSpan) iconSpan.textContent = '☀️';
            if (textSpan) textSpan.textContent = typeof t === 'function' ? t('theme_light') : 'Light Mode';
        } else {
            if (iconSpan) iconSpan.textContent = '🌙';
            if (textSpan) textSpan.textContent = typeof t === 'function' ? t('theme_dark') : 'Dark Mode';
        }
    });
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('vg_theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    const msg = typeof t === 'function' 
        ? (newTheme === 'dark' ? t('theme_dark') : t('theme_light'))
        : `Switched to ${newTheme.toUpperCase()} mode`;
    showToast(msg, 'info', 1800);
}

/**
 * Get current logged in officer from LocalStorage
 */
function getLoggedInOfficer() {
    try {
        const auth = localStorage.getItem('vg_auth');
        return auth ? JSON.parse(auth) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Universal Dynamic Logout Handler
 * Updates button state in-place without page reload on public pages!
 */
function handleLogout(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    localStorage.removeItem('vg_auth');
    sessionStorage.removeItem('vg_auth');

    // Dynamically update nav buttons immediately in-place
    updateNavAuthBadge();
    
    // Apply translations to ensure freshly toggled button has correct language
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }

    showToast(typeof t === 'function' ? t('toast_logged_out') : 'Logged out successfully.', 'info', 2500);

    // If on protected dashboard, redirect to login.html; otherwise stay on current page!
    if (window.location.pathname.includes('dashboard.html')) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 600);
    }
}

/**
 * Update and dynamically render auth state in navbar (Desktop & Mobile)
 * Single button in the exact same location that toggles between "Login" and "Logout".
 */
function updateNavAuthBadge() {
    const officer = getLoggedInOfficer();
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('vg_language') || 'en');
    const isTamil = lang === 'ta';
    const loginText = isTamil ? (typeof translations !== 'undefined' && translations.ta ? translations.ta.nav_login : "உள்நுழைவு") : (typeof translations !== 'undefined' && translations.en ? translations.en.nav_login : "Login");
    const logoutText = isTamil ? (typeof translations !== 'undefined' && translations.ta ? translations.ta.nav_logout : "வெளியேறு") : (typeof translations !== 'undefined' && translations.en ? translations.en.nav_logout : "Logout");

    // Target all single-button auth containers (desktop and mobile)
    document.querySelectorAll('.btn-auth-toggle').forEach(btn => {
        const iconSpan = btn.querySelector('.auth-btn-icon');
        const textSpan = btn.querySelector('.auth-btn-text');

        if (officer) {
            // Logged In State: Button shows "Logout" / "வெளியேறு"
            btn.setAttribute('data-auth-state', 'logged-in');
            btn.setAttribute('title', `Logged in as ${officer.name || officer.id} (${officer.id}) - Click to Logout`);
            if (iconSpan) iconSpan.textContent = '🚪';
            if (textSpan) {
                textSpan.setAttribute('data-i18n', 'nav_logout');
                textSpan.textContent = logoutText;
            }
            // Style as active logout button
            btn.classList.remove('text-slate-200', 'bg-slate-800/80', 'border-slate-700/80', 'hover:bg-slate-700/90', 'hover:border-blue-500/60');
            btn.classList.add('text-rose-100', 'bg-rose-600/90', 'hover:bg-rose-500', 'border-rose-500/80', 'shadow-md');
        } else {
            // Logged Out State: Button shows "Login" / "உள்நுழைவு"
            btn.setAttribute('data-auth-state', 'logged-out');
            btn.setAttribute('title', 'Police Officer Login');
            if (iconSpan) iconSpan.textContent = '👮';
            if (textSpan) {
                textSpan.setAttribute('data-i18n', 'nav_login');
                textSpan.textContent = loginText;
            }
            // Style as standard login button
            btn.classList.remove('text-rose-100', 'bg-rose-600/90', 'hover:bg-rose-500', 'border-rose-500/80', 'shadow-md');
            btn.classList.add('text-slate-200', 'bg-slate-800/80', 'border-slate-700/80', 'hover:bg-slate-700/90', 'hover:border-blue-500/60');
        }
    });
}

/**
 * Handle Auth Button Click (Delegated)
 */
function handleAuthButtonClick(e) {
    const btn = e.target.closest('.btn-auth-toggle');
    if (!btn) return;

    const authState = btn.getAttribute('data-auth-state');
    if (authState === 'logged-in') {
        e.preventDefault();
        e.stopPropagation();
        handleLogout(e);
    } else {
        // Logged out -> Navigate to login.html
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-auth-toggle')) {
        handleAuthButtonClick(e);
    }
});

/**
 * Global Nav & Header Renderer / Initializer
 */
function initHeaderAndNav() {
    const savedTheme = localStorage.getItem('vg_theme') || 'dark';
    applyTheme(savedTheme);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Language buttons in header
    document.querySelectorAll('.btn-switch-lang').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            if (lang && typeof setLanguage === 'function') {
                setLanguage(lang);
                showToast(lang === 'ta' ? t('toast_lang_ta') : t('toast_lang_en'), 'success', 2000);
            }
        });
    });

    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Dynamic Police Login/Logout state in same button area
    updateNavAuthBadge();
}

// Sync across multiple browser tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'vg_auth') {
        updateNavAuthBadge();
    }
});

// Auto Boot
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    initHeaderAndNav();
});

// Listen to language change to update header auth labels
window.addEventListener('languageChanged', () => {
    updateNavAuthBadge();
});

/**
 * Universal Crime Dossier Modal Dialog (Shared across Scanner and Dashboard)
 */
function showCrimeDossierModal(record) {
    if (!record) return;
    const existing = document.getElementById('crime-dossier-modal');
    if (existing) existing.remove();

    const closeTxt = typeof t === 'function' ? t('btn_close_dossier') : "Close Dossier";
    const printTxt = typeof t === 'function' ? t('btn_print_dossier') : "🖨️ Print Dossier";
    const regLabel = typeof t === 'function' ? t('lbl_reg_no') : "Registration No:";
    const makeLabel = typeof t === 'function' ? t('lbl_make_model') : "Make & Model:";
    const typeLabel = typeof t === 'function' ? t('lbl_veh_type') : "Vehicle Type:";
    const colorLabel = typeof t === 'function' ? t('lbl_color') : "Color:";
    const firLabel = typeof t === 'function' ? t('lbl_fir_complaint') : "FIR / Complaint Ref:";
    const stationLabel = typeof t === 'function' ? t('lbl_police_station') : "Police Station:";
    const dateLabel = typeof t === 'function' ? t('lbl_theft_date') : "Complaint Date:";
    const distLabel = typeof t === 'function' ? t('lbl_district') : "District / City:";
    const locLabel = typeof t === 'function' ? t('lbl_theft_location') : "Theft Location:";
    const ownerLabel = typeof t === 'function' ? t('lbl_owner') : "Complainant Name:";
    const engLabel = typeof t === 'function' ? t('lbl_engine_no') : "Engine / Chassis Hash:";

    const modal = document.createElement('div');
    modal.id = 'crime-dossier-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-rose-600 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">🚨</span>
                    <div>
                        <h3 class="font-black text-white text-base sm:text-lg uppercase">Official Stolen Crime Dossier</h3>
                        <p class="text-xs text-rose-400 font-mono">${record.complaintNumber}</p>
                    </div>
                </div>
                <button onclick="document.getElementById('crime-dossier-modal').remove()" class="text-slate-400 hover:text-white text-2xl font-bold p-1 leading-none">&times;</button>
            </div>

            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div><span class="text-slate-400">${regLabel}</span> <strong class="text-rose-300 font-mono">${record.vehicleNumber}</strong></div>
                    <div><span class="text-slate-400">${makeLabel}</span> <strong class="text-white">${record.make} ${record.model}</strong></div>
                    <div><span class="text-slate-400">${typeLabel}</span> <span class="text-slate-200">${record.vehicleType}</span></div>
                    <div><span class="text-slate-400">${colorLabel}</span> <span class="text-slate-200">${record.color}</span></div>
                    <div><span class="text-slate-400">${dateLabel}</span> <span class="text-slate-200">${record.complaintDate}</span></div>
                    <div><span class="text-slate-400">${distLabel}</span> <span class="text-slate-200">${record.district}</span></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">${stationLabel}</span> <span class="text-slate-200">${record.policeStation}</span></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">${locLabel}</span> <span class="text-slate-200">${record.theftLocation}</span></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">${ownerLabel}</span> <strong class="text-slate-200">${record.ownerName}</strong></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">${engLabel}</span> <span class="text-slate-300 font-mono">${record.engineHash || 'N/A'}</span></div>
                </div>
            </div>

            <div class="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-rose-200 leading-relaxed">
                <strong>Officer Action Directives:</strong>
                <ol class="list-decimal list-inside space-y-1 mt-1 text-slate-300">
                    <li>Tactfully detain vehicle and request driver's license and registration certificate.</li>
                    <li>Match chassis number with local engine hash: <code class="text-rose-300 font-mono">${record.engineHash || 'RE350U89281X'}</code>.</li>
                    <li>Notify Division Control Room and initiate formal vehicle seizure protocol.</li>
                </ol>
            </div>

            <div class="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button onclick="window.print()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">${printTxt}</button>
                <button onclick="document.getElementById('crime-dossier-modal').remove()" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold">${closeTxt}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Universal Control Room Dispatch Modal
 */
function showDispatchNotifyModal(record) {
    if (!record) return;
    const existing = document.getElementById('dispatch-modal');
    if (existing) existing.remove();

    const officer = getLoggedInOfficer() || { name: "SI K. Arumugam", id: "DEMO001", station: "T. Nagar E-1" };
    const modal = document.createElement('div');
    modal.id = 'dispatch-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-blue-500 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">📡</span>
                    <h3 class="font-bold text-white text-base">Control Room Alert Broadcast</h3>
                </div>
                <button onclick="document.getElementById('dispatch-modal').remove()" class="text-slate-400 hover:text-white text-2xl font-bold p-1 leading-none">&times;</button>
            </div>

            <div class="space-y-3 text-xs">
                <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div><span class="text-slate-400">Target Vehicle:</span> <strong class="text-rose-400 font-mono">${record.vehicleNumber}</strong> (${record.make} ${record.model})</div>
                    <div><span class="text-slate-400">Reporting Officer:</span> <span class="text-white">${officer.name} (${officer.id})</span></div>
                    <div><span class="text-slate-400">Station / Checkpoint:</span> <span class="text-white">${officer.station || 'Koyambedu Checkpost'}</span></div>
                    <div><span class="text-slate-400">Timestamp:</span> <span class="text-slate-300 font-mono">${new Date().toISOString().replace('T', ' ').substring(0, 19)}</span></div>
                </div>

                <div>
                    <label class="block text-slate-300 font-semibold mb-1">Tactical Intercept Notes:</label>
                    <textarea id="dispatch-notes-input" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white" rows="2" placeholder="Vehicle heading northbound towards Poonamallee High Road. Driver requested to pull over."></textarea>
                </div>
            </div>

            <div class="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button onclick="document.getElementById('dispatch-modal').remove()" class="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs">Cancel</button>
                <button onclick="sendDispatchNotification('${record.vehicleNumber}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold">Transmit Alert (Demo)</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function sendDispatchNotification(vehicleNum) {
    const modal = document.getElementById('dispatch-modal');
    if (modal) modal.remove();
    showToast("📡 Control Room & Nearby Patrol Units Dispatched for " + vehicleNum, "success", 4500);
}
