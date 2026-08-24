/**
 * VehicleGuard AI - Police Portal Authentication & Session Handler
 * Manages demo officer login, auto-fill, and session state.
 */

document.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
});

function initAuthUI() {
    const loginForm = document.getElementById('police-login-form');
    const autoFillBtn = document.getElementById('btn-autofill-demo');
    const logoutBtn = document.getElementById('btn-nav-logout');

    if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
            const officerIdInput = document.getElementById('login-officer-id');
            const passwordInput = document.getElementById('login-password');
            if (officerIdInput) officerIdInput.value = "DEMO001";
            if (passwordInput) passwordInput.value = "Demo@123";
            showToast("Demo credentials filled: DEMO001 / Demo@123", "info");
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

/**
 * Handle Login Submission
 */
function handleLoginSubmit(e) {
    e.preventDefault();

    const officerId = document.getElementById('login-officer-id')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    // Check credentials (DEMO001 / Demo@123 or any valid test ID)
    if (officerId === "DEMO001" && password === "Demo@123") {
        const session = {
            id: "DEMO001",
            name: "Sub-Inspector K. Arumugam",
            rank: "Sub-Inspector of Police",
            station: "T. Nagar Police Station (E-1)",
            district: "Chennai City Police",
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('vg_auth', JSON.stringify(session));
        showToast("Login Successful! Redirecting to Police Command Dashboard...", "success");

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 800);
    } else {
        showToast("Invalid credentials. Please use Officer ID: DEMO001 and Password: Demo@123", "error", 4500);
    }
}

/**
 * Handle Logout
 */
function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('vg_auth');
    showToast("Logged out successfully.", "info");
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

/**
 * Auth Guard for Protected Pages (Dashboard)
 */
function requireOfficerAuth() {
    const session = localStorage.getItem('vg_auth');
    if (!session) {
        // Allow browsing with banner, or redirect
        const notice = document.getElementById('auth-guard-notice');
        if (notice) notice.classList.remove('hidden');
    }
}
