/**
 * VehicleGuard AI - Optical ANPR Scanner & Real-Time Query Engine
 * Handles Camera stream, photo uploads, plate OCR normalization,
 * database lookup, dynamic audio alerts, and audit trail rendering.
 */

let videoStream = null;
let currentScannedRecord = null;

document.addEventListener('DOMContentLoaded', () => {
    initScannerUI();
    renderRecentScansTable();
});

// Re-render dynamic elements whenever language is toggled
window.addEventListener('languageChanged', () => {
    renderRecentScansTable();
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
});

function initScannerUI() {
    const startCameraBtn = document.getElementById('btn-start-camera');
    const stopCameraBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const imageUpload = document.getElementById('plate-image-upload');
    const checkVehicleBtn = document.getElementById('btn-check-vehicle');
    const plateInput = document.getElementById('detected-plate-input');

    if (startCameraBtn) startCameraBtn.addEventListener('click', startCamera);
    if (stopCameraBtn) stopCameraBtn.addEventListener('click', stopCamera);
    if (captureBtn) captureBtn.addEventListener('click', captureFrame);

    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }

    if (checkVehicleBtn) {
        checkVehicleBtn.addEventListener('click', () => {
            const rawVal = plateInput ? plateInput.value : '';
            const normalized = normalizeVehicleNumber(rawVal);
            if (!normalized) {
                showToast(typeof t === 'function' ? t('toast_invalid_veh') : "Please enter a valid vehicle number.", "warning");
                if (plateInput) plateInput.focus();
                return;
            }
            performVehicleStatusLookup(normalized);
        });
    }

    // Auto-normalize input field on keystrokes
    if (plateInput) {
        plateInput.addEventListener('input', (e) => {
            const cursor = e.target.selectionStart;
            e.target.value = normalizeVehicleNumber(e.target.value);
            e.target.setSelectionRange(cursor, cursor);
        });

        plateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkVehicleBtn.click();
            }
        });
    }

    // Bind Sample Plate Shortcut Buttons
    document.querySelectorAll('.btn-sample-plate').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sampleType = e.currentTarget.dataset.sample;
            loadSamplePlate(sampleType);
        });
    });

    // Stolen Dossier & Notify Supervisor Buttons
    const viewDossierBtn = document.getElementById('btn-view-dossier');
    const notifySupervisorBtn = document.getElementById('btn-notify-supervisor');
    const printVerifBtn = document.getElementById('btn-print-verification');

    if (viewDossierBtn) {
        viewDossierBtn.addEventListener('click', () => {
            if (currentScannedRecord) {
                showCrimeDossierModal(currentScannedRecord);
            }
        });
    }

    if (notifySupervisorBtn) {
        notifySupervisorBtn.addEventListener('click', () => {
            if (currentScannedRecord) {
                showDispatchNotifyModal(currentScannedRecord);
            }
        });
    }

    if (printVerifBtn) {
        printVerifBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/**
 * 1-Click Quick Demo Presets
 */
function loadSamplePlate(type) {
    const plateInput = document.getElementById('detected-plate-input');
    let targetNum = "";
    if (type === 'stolen1') targetNum = "TN09AB1234";
    else if (type === 'stolen2') targetNum = "TN01CD5678";
    else if (type === 'clean1') targetNum = "TN07BK9988";
    else if (type === 'clean2') targetNum = "TN22EF4321";

    if (plateInput) {
        plateInput.value = targetNum;
    }

    // Visual feedback & auto-trigger lookup
    playAlertSound('beep');
    performVehicleStatusLookup(targetNum);
}

/**
 * Start Live Web Camera Stream
 */
async function startCamera() {
    const video = document.getElementById('camera-video');
    const placeholder = document.getElementById('camera-placeholder');
    const startBtn = document.getElementById('btn-start-camera');
    const stopBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const laser = document.getElementById('scanner-laser-line');
    const confidenceBadge = document.getElementById('ocr-confidence-badge');

    try {
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        if (video) {
            video.srcObject = videoStream;
            video.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
            if (startBtn) startBtn.classList.add('hidden');
            if (stopBtn) stopBtn.classList.remove('hidden');
            if (captureBtn) captureBtn.classList.remove('hidden');
            if (laser) laser.classList.remove('hidden');
            if (confidenceBadge) confidenceBadge.classList.remove('hidden');
            
            showToast("Camera optical stream connected.", "info");
        }
    } catch (err) {
        console.warn("Camera access denied or unavailable:", err);
        showToast("Camera access unavailable. Using simulated optical preview.", "warning");
        simulateCameraPreview();
    }
}

/**
 * Stop Camera Stream
 */
function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }

    const video = document.getElementById('camera-video');
    const placeholder = document.getElementById('camera-placeholder');
    const startBtn = document.getElementById('btn-start-camera');
    const stopBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const laser = document.getElementById('scanner-laser-line');
    const confidenceBadge = document.getElementById('ocr-confidence-badge');

    if (video) video.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
    if (startBtn) startBtn.classList.remove('hidden');
    if (stopBtn) stopBtn.classList.add('hidden');
    if (captureBtn) captureBtn.classList.add('hidden');
    if (laser) laser.classList.add('hidden');
    if (confidenceBadge) confidenceBadge.classList.add('hidden');
}

/**
 * Fallback Camera Simulation for Devices without Webcams
 */
function simulateCameraPreview() {
    const placeholder = document.getElementById('camera-placeholder');
    const startBtn = document.getElementById('btn-start-camera');
    const stopBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const laser = document.getElementById('scanner-laser-line');

    if (placeholder) {
        placeholder.innerHTML = `
            <div class="text-center space-y-2">
                <span class="text-3xl animate-pulse">📷</span>
                <p class="text-xs font-bold text-amber-300">OPTICAL HUD SIMULATION ACTIVE</p>
                <p class="text-[10px] text-slate-400">Positioning target plate in optical reticle...</p>
            </div>
        `;
    }
    if (startBtn) startBtn.classList.add('hidden');
    if (stopBtn) stopBtn.classList.remove('hidden');
    if (captureBtn) captureBtn.classList.remove('hidden');
    if (laser) laser.classList.remove('hidden');
}

/**
 * Capture Frame & Extract Plate OCR
 */
function captureFrame() {
    playAlertSound('beep');
    showToast("Processing optical plate OCR...", "info", 1200);

    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('captured-preview-img');
    const plateInput = document.getElementById('detected-plate-input');

    // Pick random demo plate for simulation if camera is live
    const demoCandidates = ["TN09AB1234", "TN01CD5678", "TN07BK9988", "TN22EF4321", "TN38BZ4590"];
    const detected = demoCandidates[Math.floor(Math.random() * demoCandidates.length)];

    if (previewImg) {
        // High contrast canvas simulation preview
        previewImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120' style='background:%23fef08a;border:4px solid %23000;'><text x='20' y='75' font-family='monospace' font-size='44' font-weight='900' fill='%23000'>IND " + detected + "</text></svg>";
    }
    if (previewContainer) previewContainer.classList.remove('hidden');

    if (plateInput) {
        plateInput.value = detected;
    }

    setTimeout(() => {
        performVehicleStatusLookup(detected);
    }, 400);
}

/**
 * Handle Image Upload from File/Gallery
 */
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    playAlertSound('beep');
    const reader = new FileReader();
    reader.onload = function(event) {
        const previewContainer = document.getElementById('preview-container');
        const previewImg = document.getElementById('captured-preview-img');
        const plateInput = document.getElementById('detected-plate-input');

        if (previewImg) previewImg.src = event.target.result;
        if (previewContainer) previewContainer.classList.remove('hidden');

        // Extract plate simulation
        const demoPlates = ["TN09AB1234", "TN07BK9988", "TN01CD5678"];
        const recognized = demoPlates[Math.floor(Math.random() * demoPlates.length)];

        if (plateInput) plateInput.value = recognized;
        showToast("ANPR OCR extracted plate: " + recognized, "success");
        
        setTimeout(() => {
            performVehicleStatusLookup(recognized);
        }, 500);
    };
    reader.readAsDataURL(file);
}

/**
 * Core Logic: Instant Cross-Reference Against Stolen Vehicle Database
 */
function performVehicleStatusLookup(normalizedNumber) {
    const resultsContainer = document.getElementById('scan-results-container');
    const loadingCard = document.getElementById('scan-loading-card');
    const stolenCard = document.getElementById('card-result-stolen');
    const cleanCard = document.getElementById('card-result-clean');
    const verifyCard = document.getElementById('card-result-verify');

    if (!resultsContainer) return;

    resultsContainer.classList.remove('hidden');
    if (loadingCard) loadingCard.classList.remove('hidden');
    if (stolenCard) stolenCard.classList.add('hidden');
    if (cleanCard) cleanCard.classList.add('hidden');
    if (verifyCard) verifyCard.classList.add('hidden');

    // Simulate fast sub-second CCTNS/FIR repository query
    setTimeout(() => {
        if (loadingCard) loadingCard.classList.add('hidden');

        const stolenDB = getStolenDatabase();
        const match = stolenDB.find(v => normalizeVehicleNumber(v.vehicleNumber) === normalizedNumber);

        if (match) {
            // 🔴 STOLEN HIT FOUND
            currentScannedRecord = match;
            playAlertSound('stolen');

            // Populate Dossier
            document.getElementById('stolen-veh-num').textContent = match.vehicleNumber;
            document.getElementById('stolen-make-model').textContent = `${match.make} ${match.model}`;
            document.getElementById('stolen-veh-type').textContent = match.vehicleType;
            document.getElementById('stolen-color').textContent = match.color;
            document.getElementById('stolen-fir-num').textContent = match.complaintNumber;
            document.getElementById('stolen-station').textContent = match.policeStation;
            document.getElementById('stolen-date').textContent = match.complaintDate;
            document.getElementById('stolen-district').textContent = match.district;
            
            const stolenLoc = document.getElementById('stolen-location');
            if (stolenLoc) stolenLoc.textContent = match.theftLocation;
            
            const stolenOwner = document.getElementById('stolen-owner');
            if (stolenOwner) stolenOwner.textContent = match.ownerName;

            const stolenEngine = document.getElementById('stolen-engine');
            if (stolenEngine) stolenEngine.textContent = match.engineHash || "RE350U89281X";

            const stolenNotes = document.getElementById('stolen-notes');
            if (stolenNotes) stolenNotes.textContent = match.notes || "Vehicle flagged in regional theft database.";

            if (stolenCard) stolenCard.classList.remove('hidden');

            // Add to scan audit log
            addScanHistory({
                vehicleNumber: match.vehicleNumber,
                result: "STOLEN",
                location: "Koyambedu Checkpost #4",
                details: `${match.make} ${match.model} - ${match.complaintNumber}`
            });

            showToast("🚨 ALERT: Stolen Vehicle Match Found! " + match.vehicleNumber, "stolen", 6000);

        } else if (validateVehicleNumber(normalizedNumber)) {
            // 🟢 CLEAN VEHICLE RECORD
            currentScannedRecord = null;
            playAlertSound('clean');

            document.getElementById('clean-veh-num').textContent = normalizedNumber;
            document.getElementById('clean-timestamp').textContent = new Date().toISOString().replace('T', ' ').substring(0, 16);

            if (cleanCard) cleanCard.classList.remove('hidden');

            // Add to scan audit log
            addScanHistory({
                vehicleNumber: normalizedNumber,
                result: "CLEAN",
                location: "Koyambedu Checkpost #4",
                details: "No active theft records found"
            });

            showToast("Clearance: No stolen records found for " + normalizedNumber, "success", 3000);

        } else {
            // 🟡 VERIFICATION REQUIRED
            currentScannedRecord = null;
            playAlertSound('beep');
            if (verifyCard) verifyCard.classList.remove('hidden');
            showToast("Invalid number plate format. Please re-enter.", "warning");
        }

        renderRecentScansTable();

        // Refresh i18n text on newly injected results
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }

    }, 380);
}

/**
 * Render Recent Terminal Scans Table
 */
function renderRecentScansTable() {
    const tbody = document.getElementById('recent-scans-tbody');
    if (!tbody) return;

    const history = getScanHistory().slice(0, 8);
    if (history.length === 0) {
        const noText = typeof t === 'function' ? t('no_recent_scans') : "No recent scans recorded.";
        tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-500">${noText}</td></tr>`;
        return;
    }

    const stolenText = typeof t === 'function' ? t('verdict_stolen') : "🔴 STOLEN";
    const cleanText = typeof t === 'function' ? t('verdict_clean') : "🟢 NO MATCH";

    tbody.innerHTML = history.map(item => {
        const isStolen = item.result === 'STOLEN';
        const badgeClass = isStolen 
            ? 'bg-rose-900/70 text-rose-200 border-rose-600/50' 
            : 'bg-emerald-900/70 text-emerald-200 border-emerald-600/50';
        const verdictLabel = isStolen ? stolenText : cleanText;

        return `
            <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 transition">
                <td class="py-3 px-3 sm:px-4 font-mono font-bold text-white text-xs sm:text-sm">${item.vehicleNumber}</td>
                <td class="py-3 px-3 sm:px-4 text-slate-400 font-mono text-[11px]">${item.timestamp}</td>
                <td class="py-3 px-3 sm:px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase border ${badgeClass}">
                        ${verdictLabel}
                    </span>
                </td>
                <td class="py-3 px-3 sm:px-4 text-slate-300 hidden md:table-cell text-xs">${item.location || 'Patrol Checkpost'}</td>
                <td class="py-3 px-3 sm:px-4 text-slate-400 text-xs">${item.details || 'Routine Check'}</td>
            </tr>
        `;
    }).join('');
}

