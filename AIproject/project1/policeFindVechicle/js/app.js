/**
 * VehicleGuard AI - Main Application Core Script
 * Handles LocalStorage state, mock database, sound alerts, theme toggle, plate normalization & validation.
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
        // Default to Dark Mode as requested for tactical police IT look
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
    // Keep last 100 scans
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
 * e.g., 'tn 09 ab 1234' -> 'TN09AB1234'
 * 'TN-09-AB-1234' -> 'TN09AB1234'
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
 * Standard: 2 Letters (State) + 1-2 Digits (RTO) + 0-3 Letters (Series) + 4 Digits (Number)
 * e.g. TN09AB1234, TN01A1234, DL3CAA1111, KL071234
 * BH series: 2 Digits (Year) + BH + 4 Digits + 1-2 Letters (e.g. 22BH1234AB)
 */
function validateVehicleNumber(normalizedNumber) {
    if (!normalizedNumber) return false;
    
    // Standard format regex
    const standardRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,3}[0-9]{4}$/;
    
    // Bharat (BH) Series format regex
    const bhRegex = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;
    
    // Diplomatic & Special Formats (e.g., DL01CD1234, ARMY)
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
            // High-priority urgent double-pulse alert
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
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
            // Calm positive 2-tone chime
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else if (type === 'beep') {
            // Simple camera shutter/capture click beep
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
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center p-4 rounded-lg shadow-2xl border transition-all duration-300 transform translate-y-4 opacity-0 ${
        type === 'success' ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' :
        type === 'error' || type === 'stolen' ? 'bg-rose-900/95 border-rose-500 text-rose-100 strobe-alert' :
        type === 'warning' ? 'bg-amber-900/90 border-amber-500 text-amber-100' :
        'bg-slate-800/95 border-slate-600 text-slate-100'
    }`;

    const icon = type === 'success' ? '✅' :
                 type === 'error' || type === 'stolen' ? '🚨' :
                 type === 'warning' ? '⚠️' : 'ℹ️';

    toast.innerHTML = `
        <span class="text-xl mr-3">${icon}</span>
        <div class="flex-1 text-sm font-medium leading-snug">${message}</div>
        <button class="ml-2 text-slate-400 hover:text-white text-lg font-bold" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-4');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Theme Toggle Handler (Dark Black/Navy vs Clean White Slate)
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
    
    // Update theme icons in all toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        const iconSpan = btn.querySelector('.theme-icon');
        const textSpan = btn.querySelector('.theme-text');
        if (theme === 'light') {
            if (iconSpan) iconSpan.textContent = '☀️';
            if (textSpan) textSpan.textContent = 'Light Mode';
        } else {
            if (iconSpan) iconSpan.textContent = '🌙';
            if (textSpan) textSpan.textContent = 'Dark Mode';
        }
    });
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('vg_theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info', 2000);
}

/**
 * Global Nav & Header Renderer / Initializer
 */
function initHeaderAndNav() {
    // Current theme setup
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

    // Language buttons
    document.querySelectorAll('.btn-switch-lang').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            if (lang) {
                setLanguage(lang);
                showToast(lang === 'ta' ? 'தமிழ் மொழி தேர்வு செய்யப்பட்டது' : 'Switched to English', 'success', 2000);
            }
        });
    });

    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Auth status badge in nav
    updateNavAuthBadge();

    // Universal Logout Button Binding
    document.querySelectorAll('#btn-nav-logout, .btn-logout, #btn-mobile-logout').forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
}

/**
 * Universal Logout Handler
 */
function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('vg_auth');
    updateNavAuthBadge();
    showToast(getCurrentLanguage() === 'ta' ? 'வெற்றிகரமாக வெளியேறியது.' : 'Logged out successfully.', 'info', 2000);
    
    // If currently on dashboard, redirect to login page or home
    if (window.location.pathname.includes('dashboard.html')) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 600);
    } else {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}

/**
 * Check and render auth state in navbar (Desktop & Mobile)
 */
function getLoggedInOfficer() {
    try {
        const auth = localStorage.getItem('vg_auth');
        return auth ? JSON.parse(auth) : null;
    } catch (e) {
        return null;
    }
}

function updateNavAuthBadge() {
    const officer = getLoggedInOfficer();
    
    // Desktop Nav Elements
    const navLoginLink = document.getElementById('nav-login-link');
    const navUserBadge = document.getElementById('nav-user-badge');
    const navOfficerName = document.getElementById('nav-officer-name');

    // Mobile Menu Elements
    const mobileLoginLink = document.getElementById('mobile-login-link');
    const mobileUserBadge = document.getElementById('mobile-user-badge');
    const mobileOfficerName = document.getElementById('mobile-officer-name');

    if (officer) {
        if (navLoginLink) navLoginLink.classList.add('hidden');
        if (navUserBadge) {
            navUserBadge.classList.remove('hidden');
            navUserBadge.classList.add('flex');
            if (navOfficerName) navOfficerName.textContent = `${officer.id} (${officer.rank || 'Officer'})`;
        }

        if (mobileLoginLink) mobileLoginLink.classList.add('hidden');
        if (mobileUserBadge) {
            mobileUserBadge.classList.remove('hidden');
            mobileUserBadge.classList.add('flex');
            if (mobileOfficerName) mobileOfficerName.textContent = `${officer.name || officer.id} (${officer.id})`;
        }
    } else {
        if (navLoginLink) navLoginLink.classList.remove('hidden');
        if (navUserBadge) {
            navUserBadge.classList.add('hidden');
            navUserBadge.classList.remove('flex');
        }

        if (mobileLoginLink) mobileLoginLink.classList.remove('hidden');
        if (mobileUserBadge) {
            mobileUserBadge.classList.add('hidden');
            mobileUserBadge.classList.remove('flex');
        }
    }
}

// Auto Boot
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    initHeaderAndNav();
    if (typeof setLanguage === 'function') {
        const lang = localStorage.getItem('vg_language') || 'en';
        setLanguage(lang);
    }
});
