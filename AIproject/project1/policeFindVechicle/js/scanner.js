/**
 * VehicleGuard AI - Optical Vehicle Scanner & ANPR Engine
 * Handles Camera feed, image upload, OCR normalization, database search, result cards, and alert sounds.
 */

let videoStream = null;
let currentCapturedImage = null;

// Sample database test quick presets
const SAMPLE_PLATES = {
    stolen1: { number: "TN09AB1234", name: "Royal Enfield Classic (Chennai)" },
    stolen2: { number: "TN01CD5678", name: "Honda Activa (Mylapore)" },
    stolen3: { number: "TN45DE6729", name: "Mahindra Thar (Trichy)" },
    clean1: { number: "TN07BK9988", name: "Clean Hero Splendor" },
    clean2: { number: "TN22EF4321", name: "Clean Honda City" },
    unreadable: { number: "TN??--XXXX", name: "Unreadable Plate" }
};

document.addEventListener('DOMContentLoaded', () => {
    initScannerUI();
    renderRecentScansTable();
});

function initScannerUI() {
    const startCamBtn = document.getElementById('btn-start-camera');
    const stopCamBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const imageUploadInput = document.getElementById('plate-image-upload');
    const checkBtn = document.getElementById('btn-check-vehicle');
    const manualInput = document.getElementById('detected-plate-input');
    const dropZone = document.getElementById('upload-dropzone');

    if (startCamBtn) startCamBtn.addEventListener('click', startCamera);
    if (stopCamBtn) stopCamBtn.addEventListener('click', stopCamera);
    if (captureBtn) captureBtn.addEventListener('click', captureFrame);

    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', handleImageUpload);
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-500/10');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-blue-500', 'bg-blue-500/10');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-500/10');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processUploadedFile(e.dataTransfer.files[0]);
            }
        });
    }

    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            const rawVal = manualInput ? manualInput.value : '';
            executeVehicleCheck(rawVal);
        });
    }

    if (manualInput) {
        // Auto uppercase and format as officer types
        manualInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        manualInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeVehicleCheck(e.target.value);
            }
        });
    }

    // Bind Quick Test Sample Buttons
    document.querySelectorAll('.btn-sample-plate').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sampleKey = e.currentTarget.dataset.sample;
            loadSamplePlate(sampleKey);
        });
    });
}

/**
 * Start Live Web Camera Feed
 */
async function startCamera() {
    const video = document.getElementById('camera-video');
    const cameraPlaceholder = document.getElementById('camera-placeholder');
    const startCamBtn = document.getElementById('btn-start-camera');
    const stopCamBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const laser = document.getElementById('scanner-laser-line');

    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showToast("Camera API is not supported in this browser. Please use the Upload Image option.", "warning", 5000);
            return;
        }

        // Request HD Environment (Rear) camera if mobile, default camera if desktop
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });

        videoStream = stream;
        if (video) {
            video.srcObject = stream;
            video.classList.remove('hidden');
            video.play();
        }
        if (cameraPlaceholder) cameraPlaceholder.classList.add('hidden');
        if (startCamBtn) startCamBtn.classList.add('hidden');
        if (stopCamBtn) stopCamBtn.classList.remove('hidden');
        if (captureBtn) {
            captureBtn.classList.remove('hidden');
            captureBtn.disabled = false;
        }
        if (laser) laser.classList.remove('hidden');

        showToast("ANPR Camera initialized. Align vehicle number plate within HUD frame.", "success");
    } catch (err) {
        console.error("Camera access error:", err);
        let errorMsg = "Unable to access camera. Please allow camera permissions or upload an image.";
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            errorMsg = "Camera permission denied. Please grant permission in your browser address bar.";
        } else if (err.name === 'NotFoundError') {
            errorMsg = "No camera hardware found on this device. Please use the image upload option.";
        }
        showToast(errorMsg, "error", 5000);
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
    const cameraPlaceholder = document.getElementById('camera-placeholder');
    const startCamBtn = document.getElementById('btn-start-camera');
    const stopCamBtn = document.getElementById('btn-stop-camera');
    const captureBtn = document.getElementById('btn-capture-image');
    const laser = document.getElementById('scanner-laser-line');

    if (video) {
        video.pause();
        video.srcObject = null;
        video.classList.add('hidden');
    }
    if (cameraPlaceholder) cameraPlaceholder.classList.remove('hidden');
    if (startCamBtn) startCamBtn.classList.remove('hidden');
    if (stopCamBtn) stopCamBtn.classList.add('hidden');
    if (captureBtn) captureBtn.classList.add('hidden');
    if (laser) laser.classList.add('hidden');

    showToast("Camera feed terminated.", "info");
}

/**
 * Capture Frame from Video
 */
function captureFrame() {
    const video = document.getElementById('camera-video');
    if (!video || !videoStream) {
        showToast("Camera is not active.", "warning");
        return;
    }

    playAlertSound('beep');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    displayCapturedImage(dataUrl);

    // Simulate OCR plate detection from camera
    simulateOCRRecognition("TN09AB1234");
    showToast("Image captured! Processing optical character recognition...", "info");
}

/**
 * Handle File Upload
 */
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        processUploadedFile(file);
    }
}

function processUploadedFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast("Please upload a valid image file (JPEG, PNG, WEBP).", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(evt) {
        displayCapturedImage(evt.target.result);
        
        // Smart plate extraction heuristic based on filename or default sample
        let simulatedPlate = "TN01CD5678";
        const fname = file.name.toUpperCase();
        if (fname.includes("09") || fname.includes("TN09")) {
            simulatedPlate = "TN09AB1234";
        } else if (fname.includes("38") || fname.includes("TN38")) {
            simulatedPlate = "TN38BZ4590";
        } else if (fname.includes("CLEAN") || fname.includes("07")) {
            simulatedPlate = "TN07BK9988";
        } else if (fname.includes("22") || fname.includes("CITY")) {
            simulatedPlate = "TN22EF4321";
        }

        simulateOCRRecognition(simulatedPlate);
        showToast("Image uploaded successfully. ANPR OCR engine triggered.", "success");
    };
    reader.readAsDataURL(file);
}

/**
 * Display image in preview container with bounding box
 */
function displayCapturedImage(dataUrl) {
    currentCapturedImage = dataUrl;
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('captured-preview-img');
    const ocrBox = document.getElementById('ocr-bounding-box');

    if (previewImg) {
        previewImg.src = dataUrl;
    }
    if (previewContainer) {
        previewContainer.classList.remove('hidden');
    }
    if (ocrBox) {
        ocrBox.classList.remove('hidden');
    }
}

/**
 * Load Quick Demo Sample Plate
 */
function loadSamplePlate(sampleKey) {
    const input = document.getElementById('detected-plate-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('captured-preview-img');

    let plateNum = "TN09AB1234";
    let imgSvg = createDummyPlateSvg("TN 09 AB 1234");

    if (sampleKey === 'stolen1') {
        plateNum = "TN09AB1234";
        imgSvg = createDummyPlateSvg("TN 09 AB 1234");
    } else if (sampleKey === 'stolen2') {
        plateNum = "TN01CD5678";
        imgSvg = createDummyPlateSvg("TN 01 CD 5678");
    } else if (sampleKey === 'stolen3') {
        plateNum = "TN45DE6729";
        imgSvg = createDummyPlateSvg("TN 45 DE 6729");
    } else if (sampleKey === 'clean1') {
        plateNum = "TN07BK9988";
        imgSvg = createDummyPlateSvg("TN 07 BK 9988");
    } else if (sampleKey === 'clean2') {
        plateNum = "TN22EF4321";
        imgSvg = createDummyPlateSvg("TN 22 EF 4321");
    } else if (sampleKey === 'unreadable') {
        plateNum = "TN??--XXXX";
        imgSvg = createDummyPlateSvg("TN ?? -- ????");
    }

    if (previewImg) previewImg.src = imgSvg;
    if (previewContainer) previewContainer.classList.remove('hidden');
    if (input) input.value = plateNum;

    showToast(`Loaded sample: ${plateNum}`, "info");
    
    // Auto trigger check if requested
    simulateOCRRecognition(plateNum);
}

/**
 * Helper to generate an SVG plate image for demo previews
 */
function createDummyPlateSvg(text) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200" viewBox="0 0 600 200">
            <rect width="100%" height="100%" fill="#0a0f1d"/>
            <rect x="30" y="30" width="540" height="140" rx="10" fill="#ffffff" stroke="#000000" stroke-width="8"/>
            <rect x="40" y="40" width="45" height="120" rx="4" fill="#1e3a8a"/>
            <circle cx="62" cy="70" r="10" fill="#f59e0b"/>
            <text x="62" y="130" font-family="Arial" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle">IND</text>
            <text x="320" y="125" font-family="'JetBrains Mono', monospace, Arial" font-weight="900" font-size="52" fill="#000000" letter-spacing="4" text-anchor="middle">${text}</text>
        </svg>
    `;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/**
 * Simulate OCR recognition with animation
 */
function simulateOCRRecognition(detectedText) {
    const input = document.getElementById('detected-plate-input');
    const confidenceBadge = document.getElementById('ocr-confidence-badge');
    
    if (confidenceBadge) {
        confidenceBadge.classList.remove('hidden');
        confidenceBadge.textContent = "OCR Confidence: 98.6% (ANPR-Model-v4)";
    }
    
    if (input) {
        input.value = detectedText;
        input.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => input.classList.remove('ring-2', 'ring-blue-500'), 1200);
    }
}

/**
 * Core Search & Verification Execution
 */
function executeVehicleCheck(rawInput) {
    const normalized = normalizeVehicleNumber(rawInput);
    const resultsContainer = document.getElementById('scan-results-container');
    const loadingCard = document.getElementById('scan-loading-card');

    if (!rawInput || rawInput.trim() === '') {
        showToast("Please enter or scan a vehicle registration number.", "warning");
        return;
    }

    // Handle Unreadable / Blur test
    if (rawInput.includes('?') || rawInput.includes('X') || normalized.length < 5) {
        renderUnreadableResult();
        return;
    }

    // Validate Indian vehicle registration plate format
    const isValidFormat = validateVehicleNumber(normalized);
    if (!isValidFormat) {
        renderInvalidFormatResult(normalized);
        return;
    }

    // Show loading state with animated progress
    if (resultsContainer) resultsContainer.classList.remove('hidden');
    if (loadingCard) loadingCard.classList.remove('hidden');
    hideAllResultCards();

    // Scroll to results on mobile
    if (window.innerWidth < 768 && resultsContainer) {
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Simulate realistic database query delay (600ms)
    setTimeout(() => {
        if (loadingCard) loadingCard.classList.add('hidden');
        
        const database = getStolenDatabase();
        const match = database.find(item => normalizeVehicleNumber(item.vehicleNumber) === normalized);

        if (match) {
            renderStolenResult(match);
            playAlertSound('stolen');
            addScanHistory({
                vehicleNumber: match.vehicleNumber,
                result: "STOLEN",
                location: "Patrol Checkpost (Demo)",
                details: `${match.make} ${match.model} - FIR: ${match.complaintNumber}`
            });
            showToast(`🚨 STOLEN VEHICLE ALERT: ${match.vehicleNumber}`, "stolen", 6000);
        } else {
            renderCleanResult(normalized);
            playAlertSound('clean');
            addScanHistory({
                vehicleNumber: normalized,
                result: "CLEAN",
                location: "Patrol Checkpost (Demo)",
                details: "No stolen vehicle record found"
            });
            showToast(`✅ No stolen vehicle record found for ${normalized}`, "success");
        }

        renderRecentScansTable();
    }, 650);
}

function hideAllResultCards() {
    const stolenCard = document.getElementById('card-result-stolen');
    const cleanCard = document.getElementById('card-result-clean');
    const verifyCard = document.getElementById('card-result-verify');
    if (stolenCard) stolenCard.classList.add('hidden');
    if (cleanCard) cleanCard.classList.add('hidden');
    if (verifyCard) verifyCard.classList.add('hidden');
}

/**
 * Render 🔴 STOLEN MATCH Result Card
 */
function renderStolenResult(record) {
    const card = document.getElementById('card-result-stolen');
    if (!card) return;

    // Populate all dossier fields
    document.getElementById('stolen-veh-num').textContent = record.vehicleNumber;
    document.getElementById('stolen-veh-type').textContent = record.vehicleType || "Motorcycle";
    document.getElementById('stolen-make-model').textContent = `${record.make} ${record.model}`;
    document.getElementById('stolen-color').textContent = record.color;
    document.getElementById('stolen-fir-num').textContent = record.complaintNumber;
    document.getElementById('stolen-station').textContent = record.policeStation;
    document.getElementById('stolen-district').textContent = record.district || "Chennai";
    document.getElementById('stolen-date').textContent = record.complaintDate;
    document.getElementById('stolen-location').textContent = record.theftLocation || "Roadside Parking";
    document.getElementById('stolen-owner').textContent = record.ownerName || "Confidential Complainant";
    document.getElementById('stolen-engine').textContent = record.engineHash || "Verified Hash";
    document.getElementById('stolen-notes').textContent = record.notes || "High priority alert issued to all zonal checkposts.";

    card.classList.remove('hidden');

    // Attach actions
    const btnNotify = document.getElementById('btn-notify-supervisor');
    if (btnNotify) {
        btnNotify.onclick = () => {
            simulateSupervisorDispatch(record);
        };
    }

    const btnViewDossier = document.getElementById('btn-view-dossier');
    if (btnViewDossier) {
        btnViewDossier.onclick = () => {
            openDossierModal(record);
        };
    }

    const btnPrint = document.getElementById('btn-print-verification');
    if (btnPrint) {
        btnPrint.onclick = () => {
            window.print();
        };
    }
}

/**
 * Render 🟢 NO MATCH CLEAN Result Card
 */
function renderCleanResult(vehicleNumber) {
    const card = document.getElementById('card-result-clean');
    if (!card) return;

    const numSpan = document.getElementById('clean-veh-num');
    if (numSpan) numSpan.textContent = vehicleNumber;
    const timeSpan = document.getElementById('clean-timestamp');
    if (timeSpan) timeSpan.textContent = new Date().toLocaleString();

    card.classList.remove('hidden');
}

/**
 * Render 🟡 UNREADABLE / VERIFICATION REQUIRED Card
 */
function renderUnreadableResult() {
    hideAllResultCards();
    const card = document.getElementById('card-result-verify');
    if (card) {
        card.classList.remove('hidden');
    }
    const resultsContainer = document.getElementById('scan-results-container');
    if (resultsContainer) resultsContainer.classList.remove('hidden');
    
    showToast("⚠️ Number plate unreadable or obscured. Manual verification required.", "warning");
}

function renderInvalidFormatResult(number) {
    hideAllResultCards();
    const card = document.getElementById('card-result-verify');
    if (card) {
        card.classList.remove('hidden');
        const desc = card.querySelector('.verify-desc');
        if (desc) {
            desc.textContent = `Invalid vehicle number format: "${number}". Please check the registration plate and try again.`;
        }
    }
    const resultsContainer = document.getElementById('scan-results-container');
    if (resultsContainer) resultsContainer.classList.remove('hidden');
}

/**
 * Supervisor Dispatch Notification Simulation
 */
function simulateSupervisorDispatch(record) {
    const modal = document.createElement('div');
    modal.id = 'dispatch-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-slate-900 border border-blue-500/40 rounded-xl max-w-lg w-full p-6 shadow-2xl text-slate-100 animate-in fade-in">
            <div class="flex items-center space-x-3 text-blue-400 border-b border-slate-700/60 pb-3 mb-4">
                <span class="text-2xl">📡</span>
                <div>
                    <h3 class="font-bold text-lg text-white">POLICE CONTROL ROOM DISPATCH</h3>
                    <p class="text-xs text-blue-300">Automated Tactical Alert Transmission</p>
                </div>
            </div>
            <div class="space-y-3 text-sm text-slate-300 mb-6">
                <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <p class="text-xs text-slate-400">Target Vehicle:</p>
                    <p class="font-mono text-base font-bold text-rose-400">${record.vehicleNumber} (${record.make} ${record.model})</p>
                </div>
                <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <p class="text-xs text-slate-400">FIR Ref & Station:</p>
                    <p class="font-medium text-white">${record.complaintNumber} — ${record.policeStation}</p>
                </div>
                <div class="p-3 bg-blue-950/60 border border-blue-700/60 rounded-lg text-blue-200 text-xs">
                    ⚡ <strong>Status:</strong> Alert transmitted to Divisional Duty Officer & Central Modern Control Room. Stand by for backup unit coordination if needed.
                </div>
            </div>
            <div class="flex justify-end space-x-3">
                <button class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition" onclick="document.getElementById('dispatch-modal').remove()">
                    Acknowledge & Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Complete Crime Dossier Modal
 */
function openDossierModal(record) {
    const modal = document.createElement('div');
    modal.id = 'dossier-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-rose-600/70 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl text-slate-100 print-area">
            <div class="flex justify-between items-start border-b border-slate-700 pb-4 mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500 flex items-center justify-center text-xl text-rose-500">🚨</div>
                    <div>
                        <span class="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">TAMIL NADU POLICE DEMO IT RECORD</span>
                        <h2 class="text-xl font-bold text-white">Stolen Vehicle Case Dossier</h2>
                    </div>
                </div>
                <button class="text-slate-400 hover:text-white text-2xl font-bold no-print" onclick="document.getElementById('dossier-modal').remove()">&times;</button>
            </div>

            <div class="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div>
                    <span class="text-xs text-rose-300 font-medium">VEHICLE REGISTRATION</span>
                    <div class="font-mono text-2xl font-black text-rose-200 tracking-wider">${record.vehicleNumber}</div>
                </div>
                <span class="px-3 py-1 bg-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-full">ACTIVE THEFT CASE</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Crime / FIR Reference</span>
                    <span class="font-mono font-bold text-white">${record.complaintNumber}</span>
                </div>
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Reporting Police Station</span>
                    <span class="font-semibold text-white">${record.policeStation} (${record.district})</span>
                </div>
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Vehicle Make & Model</span>
                    <span class="font-semibold text-white">${record.make} ${record.model} (${record.color})</span>
                </div>
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Date of Occurrence</span>
                    <span class="font-semibold text-white">${record.complaintDate}</span>
                </div>
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Incident Landmark</span>
                    <span class="font-semibold text-white">${record.theftLocation || "Public Roadside"}</span>
                </div>
                <div class="p-3 bg-slate-800/60 rounded-lg">
                    <span class="text-xs text-slate-400 block">Registered Owner</span>
                    <span class="font-semibold text-white">${record.ownerName || "Protected Complainant"}</span>
                </div>
            </div>

            <div class="p-4 bg-slate-800/80 rounded-xl mb-6 text-xs text-slate-300 space-y-2 border border-slate-700">
                <h4 class="font-bold text-slate-200 uppercase tracking-wider">Field Investigation Notes:</h4>
                <p>${record.notes || "Vehicle reported missing. Flagged for instant intercept at all regional toll booths and divisional checkpoints."}</p>
            </div>

            <div class="p-3 bg-amber-950/50 border border-amber-600/50 rounded-lg text-amber-200 text-xs mb-6">
                ⚠️ <strong>OFFICER DIRECTIVE:</strong> Cross-check physical Chassis/Engine number with vehicle documents. Do not rely solely on demo system. Initiate standard Tamil Nadu Police checkpoint protocols.
            </div>

            <div class="flex justify-between items-center no-print">
                <button class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg text-sm transition" onclick="document.getElementById('dossier-modal').remove()">
                    Close Dossier
                </button>
                <div class="space-x-3">
                    <button class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium rounded-lg text-sm transition" onclick="window.print()">
                        🖨️ Print Dossier
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Render Recent Scans Table in Scanner UI
 */
function renderRecentScansTable() {
    const tableBody = document.getElementById('recent-scans-tbody');
    if (!tableBody) return;

    const history = getScanHistory().slice(0, 6);
    if (history.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500 text-sm">No recent scans recorded.</td></tr>`;
        return;
    }

    tableBody.innerHTML = history.map(item => {
        const isStolen = item.result === 'STOLEN';
        return `
            <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
                <td class="py-3 px-4 font-mono font-bold ${isStolen ? 'text-rose-400' : 'text-emerald-400'}">
                    ${item.vehicleNumber}
                </td>
                <td class="py-3 px-4 text-xs text-slate-400">${item.timestamp}</td>
                <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        isStolen ? 'bg-rose-900/60 text-rose-300 border border-rose-500/50' : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50'
                    }">
                        ${isStolen ? '🔴 STOLEN' : '🟢 NO MATCH'}
                    </span>
                </td>
                <td class="py-3 px-4 text-xs text-slate-300 hidden md:table-cell">${item.location || 'Patrol Checkpoint'}</td>
                <td class="py-3 px-4 text-xs text-slate-400 truncate max-w-xs">${item.details || '-'}</td>
            </tr>
        `;
    }).join('');
}
