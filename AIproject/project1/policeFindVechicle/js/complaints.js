/**
 * VehicleGuard AI - Citizen Theft Reporting & Status Tracking Module
 * Handles complaint submission, unique reference generation, and timeline tracking.
 */

// Comprehensive List of Tamil Nadu Districts for Selectors
const TN_DISTRICTS = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
];

document.addEventListener('DOMContentLoaded', () => {
    initReportForm();
    initStatusChecker();
});

/**
 * Initialize Reporting Form
 */
function initReportForm() {
    const form = document.getElementById('stolen-report-form');
    const districtSelect = document.getElementById('complaint-district');
    const photoInput = document.getElementById('complaint-vehicle-photo');
    const photoPreview = document.getElementById('complaint-photo-preview');

    // Populate districts dropdown
    if (districtSelect && districtSelect.children.length <= 1) {
        TN_DISTRICTS.forEach(dist => {
            const opt = document.createElement('option');
            opt.value = dist;
            opt.textContent = dist;
            districtSelect.appendChild(opt);
        });
    }

    // Vehicle photo preview
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    photoPreview.src = evt.target.result;
                    photoPreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (form) {
        // Set default date to today
        const dateInput = document.getElementById('complaint-date');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }

        form.addEventListener('submit', handleReportSubmit);
    }
}

/**
 * Handle Report Submission
 */
function handleReportSubmit(e) {
    e.preventDefault();

    const ownerName = document.getElementById('complaint-owner-name')?.value.trim();
    const mobile = document.getElementById('complaint-mobile')?.value.trim();
    const email = document.getElementById('complaint-email')?.value.trim();
    const vehicleNumber = normalizeVehicleNumber(document.getElementById('complaint-vehicle-number')?.value.trim());
    const vehicleType = document.getElementById('complaint-vehicle-type')?.value;
    const make = document.getElementById('complaint-make')?.value.trim();
    const model = document.getElementById('complaint-model')?.value.trim();
    const color = document.getElementById('complaint-color')?.value.trim();
    const incidentDate = document.getElementById('complaint-date')?.value;
    const incidentTime = document.getElementById('complaint-time')?.value;
    const district = document.getElementById('complaint-district')?.value;
    const policeStation = document.getElementById('complaint-station')?.value.trim();
    const location = document.getElementById('complaint-location')?.value.trim();
    const description = document.getElementById('complaint-description')?.value.trim();

    if (!ownerName || !mobile || !vehicleNumber || !vehicleType || !make || !district) {
        showToast("Please fill in all mandatory fields.", "warning");
        return;
    }

    if (!validateVehicleNumber(vehicleNumber)) {
        showToast("Invalid vehicle registration format. Example: TN09AB1234", "error");
        return;
    }

    // Generate unique complaint reference
    const refNum = generateComplaintNumber();

    const newComplaint = {
        referenceNumber: refNum,
        vehicleNumber: vehicleNumber,
        ownerName: ownerName,
        mobile: mobile,
        email: email || "N/A",
        vehicleType: vehicleType,
        make: make,
        model: model || "Standard",
        color: color || "N/A",
        incidentDate: incidentDate || new Date().toISOString().split('T')[0],
        incidentTime: incidentTime || "N/A",
        district: district,
        policeStation: policeStation || `${district} Town Police Station`,
        location: location || "Roadside area",
        description: description || "No specific marks mentioned.",
        status: "Pending Verification",
        statusCode: "PENDING",
        submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
        remarks: "New public submission received. Assigned for document verification."
    };

    // Save to LocalStorage
    const complaints = getComplaints();
    complaints.unshift(newComplaint);
    localStorage.setItem('vg_complaints', JSON.stringify(complaints));

    // Reset Form
    document.getElementById('stolen-report-form').reset();
    const photoPreview = document.getElementById('complaint-photo-preview');
    if (photoPreview) photoPreview.classList.add('hidden');

    // Show Success Modal
    showComplaintSuccessModal(newComplaint);
    showToast(`Complaint submitted successfully! Ref: ${refNum}`, "success", 5000);
}

/**
 * Generate Complaint Reference ID: SVR-2026-XXXXXX
 */
function generateComplaintNumber() {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `SVR-2026-${randomDigits}`;
}

/**
 * Display Submission Success Modal with Print Option
 */
function showComplaintSuccessModal(complaint) {
    const modal = document.createElement('div');
    modal.id = 'complaint-success-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-emerald-500/60 rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl text-slate-100 print-area">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-emerald-500/20 border border-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 text-emerald-400">
                    ✓
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-white">Complaint Request Submitted</h3>
                <p class="text-xs text-slate-400 mt-1">VehicleGuard AI Public Safety Portal (Demo)</p>
            </div>

            <div class="bg-slate-800/90 border border-slate-700 rounded-xl p-4 mb-6 text-center">
                <span class="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Your Complaint Reference Number</span>
                <div class="font-mono text-2xl md:text-3xl font-extrabold text-blue-400 select-all">${complaint.referenceNumber}</div>
                <p class="text-xs text-slate-400 mt-2">Save this reference number to track complaint processing status.</p>
            </div>

            <div class="bg-slate-800/50 rounded-xl p-4 text-xs space-y-2 mb-6 border border-slate-700/60">
                <div class="flex justify-between py-1 border-b border-slate-700/50">
                    <span class="text-slate-400">Vehicle Number:</span>
                    <span class="font-mono font-bold text-white">${complaint.vehicleNumber}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-slate-700/50">
                    <span class="text-slate-400">Owner Name:</span>
                    <span class="font-medium text-white">${complaint.ownerName}</span>
                </div>
                <div class="flex justify-between py-1 border-b border-slate-700/50">
                    <span class="text-slate-400">Jurisdiction District:</span>
                    <span class="font-medium text-white">${complaint.district} (${complaint.policeStation})</span>
                </div>
                <div class="flex justify-between py-1">
                    <span class="text-slate-400">Initial Status:</span>
                    <span class="font-bold text-amber-400">${complaint.status}</span>
                </div>
            </div>

            <div class="p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-200 text-xs mb-6 leading-relaxed">
                ⚠️ <strong>IMPORTANT NOTICE:</strong> This is a prototype submission workflow and does not constitute a legal police FIR. Please submit signed physical documents and identity proofs at your local police station for formal FIR registration.
            </div>

            <div class="flex flex-col sm:flex-row gap-3 no-print">
                <button class="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-sm transition" onclick="window.location.href='status.html?ref=${complaint.referenceNumber}'">
                    Track Complaint Status →
                </button>
                <button class="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-medium rounded-lg text-sm transition" onclick="window.print()">
                    🖨️ Print Receipt
                </button>
                <button class="py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg text-sm transition" onclick="document.getElementById('complaint-success-modal').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Initialize Status Tracking Page
 */
function initStatusChecker() {
    const checkBtn = document.getElementById('btn-track-status');
    const input = document.getElementById('status-search-input');

    if (checkBtn && input) {
        checkBtn.addEventListener('click', () => {
            performStatusSearch(input.value);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performStatusSearch(input.value);
            }
        });

        // Check if URL has ?ref= query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref');
        if (refParam) {
            input.value = refParam;
            performStatusSearch(refParam);
        }

        // Listen for storage events (e.g. if officer approves in another tab)
        window.addEventListener('storage', (e) => {
            if (e.key === 'vg_complaints' || e.key === 'vg_stolen_db') {
                const currentVal = input.value.trim();
                if (currentVal) {
                    performStatusSearch(currentVal);
                }
            }
        });
    }
}

/**
 * Perform Comprehensive Real-Time Status Lookup
 */
function performStatusSearch(query) {
    if (!query || query.trim() === '') {
        showToast("Please enter a reference number or vehicle number.", "warning");
        return;
    }

    const cleanQuery = query.trim().toUpperCase();
    const normalizedVeh = normalizeVehicleNumber(query);
    const container = document.getElementById('status-result-container');
    const emptyState = document.getElementById('status-empty-state');
    const detailsContainer = document.getElementById('status-details');

    const complaints = getComplaints();
    const stolenDb = getStolenDatabase();

    // 1. Search in complaints by reference, normalized vehicle number, or FIR number
    let match = complaints.find(c => 
        c.referenceNumber.toUpperCase() === cleanQuery || 
        normalizeVehicleNumber(c.vehicleNumber) === normalizedVeh ||
        (c.firNumber && c.firNumber.toUpperCase() === cleanQuery) ||
        (c.mobile && c.mobile.replace(/[^0-9]/g, '') === cleanQuery.replace(/[^0-9]/g, ''))
    );

    // 2. Fallback search in active stolen vehicle database
    if (!match) {
        const dbMatch = stolenDb.find(s => 
            s.complaintNumber.toUpperCase() === cleanQuery || 
            normalizeVehicleNumber(s.vehicleNumber) === normalizedVeh
        );
        if (dbMatch) {
            match = {
                referenceNumber: dbMatch.complaintNumber,
                vehicleNumber: dbMatch.vehicleNumber,
                firNumber: dbMatch.complaintNumber,
                ownerName: dbMatch.ownerName || "Confidential Complainant",
                mobile: "Verified Police Record",
                vehicleType: dbMatch.vehicleType || "Vehicle",
                make: dbMatch.make || "Standard",
                model: dbMatch.model || "Model",
                color: dbMatch.color || "Standard",
                incidentDate: dbMatch.complaintDate,
                district: dbMatch.district || "Chennai",
                policeStation: dbMatch.policeStation,
                location: dbMatch.theftLocation || "Roadway",
                status: "FIR Registered — Active Watchlist",
                statusCode: "REGISTERED",
                submissionDate: dbMatch.complaintDate,
                approvedBy: "Duty Officer / Central IT Cell",
                remarks: "Active FIR Registered. Target flagged across all zonal police checkpoints."
            };
        }
    }

    if (container) container.classList.remove('hidden');

    if (!match) {
        if (emptyState) emptyState.classList.remove('hidden');
        if (detailsContainer) detailsContainer.classList.add('hidden');
        showToast(`No record found for "${query}". Check your reference or registration number.`, "warning");
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (detailsContainer) {
        detailsContainer.classList.remove('hidden');
        renderStatusDetails(match);
        showToast(`Loaded status for ${match.vehicleNumber} (${match.status})`, "info", 2500);
    }
}

/**
 * Render Status Details, FIR Highlights and Dynamic Timeline
 */
function renderStatusDetails(record) {
    // Fill basic text elements
    const refNoEl = document.getElementById('res-ref-no');
    const vehNoEl = document.getElementById('res-veh-no');
    const ownerEl = document.getElementById('res-owner');
    const modelEl = document.getElementById('res-model');
    const stationEl = document.getElementById('res-station');
    const dateEl = document.getElementById('res-date');
    const remarksEl = document.getElementById('res-remarks');

    if (refNoEl) refNoEl.textContent = record.referenceNumber;
    if (vehNoEl) vehNoEl.textContent = record.vehicleNumber;
    if (ownerEl) ownerEl.textContent = record.ownerName;
    if (modelEl) modelEl.textContent = `${record.make} ${record.model || ''} (${record.color || 'Standard'})`;
    if (stationEl) stationEl.textContent = `${record.policeStation}, ${record.district}`;
    if (dateEl) dateEl.textContent = record.incidentDate || record.submissionDate;
    if (remarksEl) remarksEl.textContent = record.remarks || "Under routine processing.";

    // Render Status Badge
    const statusBadge = document.getElementById('res-status-badge');
    let badgeClass = "bg-amber-900/60 text-amber-300 border-amber-500/50";
    let statusIcon = "🟡";

    if (record.statusCode === 'REGISTERED') {
        badgeClass = "bg-rose-900/60 text-rose-300 border-rose-500/50 strobe-alert";
        statusIcon = "🔴";
    } else if (record.statusCode === 'UNDER_REVIEW') {
        badgeClass = "bg-blue-900/60 text-blue-300 border-blue-500/50";
        statusIcon = "🔵";
    } else if (record.statusCode === 'REJECTED') {
        badgeClass = "bg-slate-800 text-slate-400 border-slate-600";
        statusIcon = "⚪";
    }

    if (statusBadge) {
        statusBadge.className = `inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`;
        statusBadge.innerHTML = `<span>${statusIcon}</span><span>${record.status}</span>`;
    }

    // Approved FIR Banner
    const firBanner = document.getElementById('res-fir-banner');
    const firNoEl = document.getElementById('res-fir-no');
    const approvalOfficerEl = document.getElementById('res-approval-officer');

    if (firBanner) {
        if (record.statusCode === 'REGISTERED' && (record.firNumber || record.referenceNumber.startsWith('FIR-'))) {
            firBanner.classList.remove('hidden');
            if (firNoEl) firNoEl.textContent = record.firNumber || record.referenceNumber;
            if (approvalOfficerEl) approvalOfficerEl.textContent = record.approvedBy ? `Approved by ${record.approvedBy}` : "Verified by Police Station Duty Officer";
        } else {
            firBanner.classList.add('hidden');
        }
    }

    // Render Timeline Steps
    updateTimelineUI(record.statusCode || 'PENDING');
}

/**
 * Update visual progress step indicators & Progress Bar
 */
function updateTimelineUI(statusCode) {
    const isRegistered = statusCode === 'REGISTERED';
    const isUnderReview = statusCode === 'UNDER_REVIEW';
    const isPending = statusCode === 'PENDING';
    const isRejected = statusCode === 'REJECTED';

    const progressFill = document.getElementById('timeline-progress-fill');
    if (progressFill) {
        if (isRegistered) {
            progressFill.style.width = '100%';
            progressFill.className = 'absolute left-0 top-4 -translate-y-1/2 h-1.5 bg-emerald-500 transition-all duration-700 z-0';
        } else if (isUnderReview) {
            progressFill.style.width = '66%';
            progressFill.className = 'absolute left-0 top-4 -translate-y-1/2 h-1.5 bg-blue-500 transition-all duration-700 z-0';
        } else if (isRejected) {
            progressFill.style.width = '33%';
            progressFill.className = 'absolute left-0 top-4 -translate-y-1/2 h-1.5 bg-rose-500 transition-all duration-700 z-0';
        } else {
            progressFill.style.width = '25%';
            progressFill.className = 'absolute left-0 top-4 -translate-y-1/2 h-1.5 bg-amber-500 transition-all duration-700 z-0';
        }
    }

    // Step 1: Submitted
    const dot1 = document.getElementById('step-1-dot');
    const lbl1 = document.getElementById('step-1-label');
    if (dot1) {
        dot1.className = "w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-emerald-600/30";
        dot1.innerHTML = "✓";
    }
    if (lbl1) lbl1.className = "font-semibold text-white text-xs mt-2 text-center";

    // Step 2: Verification
    const dot2 = document.getElementById('step-2-dot');
    const lbl2 = document.getElementById('step-2-label');
    if (dot2) {
        if (isRegistered || isUnderReview) {
            dot2.className = "w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-emerald-600/30";
            dot2.innerHTML = "✓";
            if (lbl2) lbl2.className = "font-semibold text-white text-xs mt-2 text-center";
        } else if (isRejected) {
            dot2.className = "w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-rose-600/30";
            dot2.innerHTML = "✗";
            if (lbl2) {
                lbl2.className = "font-semibold text-rose-400 text-xs mt-2 text-center";
                lbl2.textContent = "Rejected";
            }
        } else {
            dot2.className = "w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs ring-4 ring-amber-500/20";
            dot2.innerHTML = "2";
            if (lbl2) lbl2.className = "font-semibold text-amber-300 text-xs mt-2 text-center";
        }
    }

    // Step 3: Under Review
    const dot3 = document.getElementById('step-3-dot');
    const lbl3 = document.getElementById('step-3-label');
    if (dot3) {
        if (isRegistered) {
            dot3.className = "w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-emerald-600/30";
            dot3.innerHTML = "✓";
            if (lbl3) lbl3.className = "font-semibold text-white text-xs mt-2 text-center";
        } else if (isUnderReview) {
            dot3.className = "w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs ring-4 ring-blue-500/30 shadow-lg shadow-blue-600/30";
            dot3.innerHTML = "3";
            if (lbl3) lbl3.className = "font-bold text-blue-300 text-xs mt-2 text-center";
        } else {
            dot3.className = "w-8 h-8 rounded-full bg-slate-700 text-slate-400 font-bold flex items-center justify-center text-xs border border-slate-600";
            dot3.innerHTML = "3";
            if (lbl3) lbl3.className = "text-slate-400 text-xs mt-2 text-center";
        }
    }

    // Step 4: FIR Registered & Watchlist
    const dot4 = document.getElementById('step-4-dot');
    const lbl4 = document.getElementById('step-4-label');
    if (dot4) {
        if (isRegistered) {
            dot4.className = "w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-rose-600/40 ring-4 ring-rose-500/30 animate-pulse";
            dot4.innerHTML = "🚨";
            if (lbl4) lbl4.className = "font-bold text-rose-300 text-xs mt-2 text-center";
        } else {
            dot4.className = "w-8 h-8 rounded-full bg-slate-700 text-slate-400 font-bold flex items-center justify-center text-xs border border-slate-600";
            dot4.innerHTML = "4";
            if (lbl4) lbl4.className = "text-slate-400 text-xs mt-2 text-center";
        }
    }
}
