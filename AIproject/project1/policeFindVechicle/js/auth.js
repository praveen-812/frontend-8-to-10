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

    if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
            const officerIdInput = document.getElementById('login-officer-id');
            const passwordInput = document.getElementById('login-password');
            if (officerIdInput) officerIdInput.value = "DEMO001";
            if (passwordInput) passwordInput.value = "Demo@123";
            const msg = typeof t === 'function' ? t('demo_creds_filled') : "Demo credentials filled: DEMO001 / Demo@123";
            showToast(msg, "info");
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

/**
 * Handle Login Submission
 */
function handleLoginSubmit(e) {
    e.preventDefault();

    const officerId = document.getElementById('login-officer-id')?.value.trim().toUpperCase();
    const password = document.getElementById('login-password')?.value.trim();

    // Check credentials (DEMO001 / Demo@123 or valid test ID)
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
        
        // Dynamically update navbar auth state
        if (typeof updateNavAuthBadge === 'function') {
            updateNavAuthBadge();
        }

        const successMsg = typeof t === 'function' ? t('toast_login_success') : "Login Successful! Redirecting to Police Command Dashboard...";
        showToast(successMsg, "success");

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 700);
    } else {
        const errMsg = typeof t === 'function' ? t('demo_invalid_creds') : "Invalid credentials. Please use Officer ID: DEMO001 and Password: Demo@123";
        showToast(errMsg, "error", 4500);
    }
}
