/**
 * VehicleGuard AI - Citizen Theft Complaint Registration & Status Tracker
 * Manages public complaint intake, reference generator, and timeline tracking.
 */

const TN_DISTRICTS = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli",
    "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
    "Vellore", "Viluppuram", "Virudhunagar"
];

document.addEventListener('DOMContentLoaded', () => {
    initComplaintsUI();
});

window.addEventListener('languageChanged', () => {
    populateDistrictDropdown();
    const searchInput = document.getElementById('status-search-input');
    if (searchInput && searchInput.value) {
        handleStatusSearch();
    }
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
});

function initComplaintsUI() {
    populateDistrictDropdown();

    // Citizen Complaint Form Submission
    const complaintForm = document.getElementById('stolen-report-form');
    if (complaintForm) {
        complaintForm.addEventListener('submit', handleComplaintSubmit);
    }

    // Status Tracking Search
    const trackBtn = document.getElementById('btn-track-status');
    const statusInput = document.getElementById('status-search-input');
    if (trackBtn && statusInput) {
        trackBtn.addEventListener('click', handleStatusSearch);
        statusInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleStatusSearch();
        });

        // If URL has ref query parameter (e.g. ?ref=SVR-2026-482731)
        const params = new URLSearchParams(window.location.search);
        const refParam = params.get('ref') || params.get('veh');
        if (refParam) {
            statusInput.value = refParam;
            handleStatusSearch();
        }
    }

    // Vehicle Photo Preview
    const photoUpload = document.getElementById('complaint-vehicle-photo');
    const photoPreview = document.getElementById('complaint-photo-preview');
    if (photoUpload && photoPreview) {
        photoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    photoPreview.src = ev.target.result;
                    photoPreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

/**
 * Populate District Dropdown with Tamil Nadu Districts
 */
function populateDistrictDropdown() {
    const dropdown = document.getElementById('complaint-district');
    if (!dropdown) return;

    const currentVal = dropdown.value;
    const defaultText = typeof t === 'function' ? t('opt_select_district') : "-- Select District --";
    dropdown.innerHTML = `<option value="">${defaultText}</option>`;

    TN_DISTRICTS.forEach(dist => {
        const opt = document.createElement('option');
        opt.value = dist;
        opt.textContent = dist;
        if (dist === currentVal) opt.selected = true;
        dropdown.appendChild(opt);
    });
}

/**
 * Handle Citizen Complaint Submission
 */
function handleComplaintSubmit(e) {
    e.preventDefault();

    const ownerName = document.getElementById('complaint-owner-name')?.value.trim();
    const mobile = document.getElementById('complaint-mobile')?.value.trim();
    const vehicleNum = normalizeVehicleNumber(document.getElementById('complaint-vehicle-number')?.value);
    const vehicleType = document.getElementById('complaint-vehicle-type')?.value;
    const make = document.getElementById('complaint-make')?.value.trim();
    const model = document.getElementById('complaint-model')?.value.trim();
    const color = document.getElementById('complaint-color')?.value.trim();
    const incidentDate = document.getElementById('complaint-date')?.value;
    const incidentTime = document.getElementById('complaint-time')?.value;
    const district = document.getElementById('complaint-district')?.value;
    const station = document.getElementById('complaint-station')?.value.trim() || `${district} Central Police Station`;
    const location = document.getElementById('complaint-location')?.value.trim();
    const description = document.getElementById('complaint-description')?.value.trim();

    if (!ownerName || !mobile || !vehicleNum || !incidentDate || !district || !location) {
        showToast(typeof t === 'function' ? t('toast_fill_all') : "Please fill in all mandatory fields.", "warning");
        return;
    }

    if (!validateVehicleNumber(vehicleNum)) {
        showToast(typeof t === 'function' ? t('toast_invalid_veh') : "Invalid vehicle registration format. Example: TN09AB1234", "warning");
        return;
    }

    // Generate Unique Public Reference Number
    const randomRef = "SVR-2026-" + Math.floor(100000 + Math.random() * 900000);

    const newComplaint = {
        referenceNumber: randomRef,
        vehicleNumber: vehicleNum,
        ownerName: ownerName,
        mobile: mobile,
        vehicleType: vehicleType,
        make: make,
        model: model,
        color: color,
        incidentDate: incidentDate,
        incidentTime: incidentTime,
        district: district,
        policeStation: station,
        location: location,
        description: description,
        status: "Pending Verification",
        statusCode: "PENDING",
        submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
        remarks: "Citizen submission received. Assigned to Sub-Inspector for document scrutiny."
    };

    const complaints = getComplaints();
    complaints.unshift(newComplaint);
    localStorage.setItem('vg_complaints', JSON.stringify(complaints));

    playAlertSound('clean');
    showSubmissionSuccessModal(newComplaint);
}

/**
 * Citizen Complaint Submission Success Modal / Receipt
 */
function showSubmissionSuccessModal(complaint) {
    const existing = document.getElementById('complaint-receipt-modal');
    if (existing) existing.remove();

    const titleTxt = typeof t === 'function' ? t('receipt_title') : "Complaint Request Submitted";
    const refLbl = typeof t === 'function' ? t('receipt_ref_label') : "Your Complaint Reference Number";
    const refHint = typeof t === 'function' ? t('receipt_ref_hint') : "Save this reference number to track complaint processing status.";
    const noticeTxt = typeof t === 'function' ? t('receipt_notice') : "⚠️ IMPORTANT NOTICE: This is a prototype submission workflow and does not constitute a legal police FIR. Please submit signed physical documents and identity proofs at your local police station for formal FIR registration.";
    const trackTxt = typeof t === 'function' ? t('btn_track_status_receipt') : "Track Complaint Status →";
    const printTxt = typeof t === 'function' ? t('btn_print_receipt') : "🖨️ Print Receipt";

    const modal = document.createElement('div');
    modal.id = 'complaint-receipt-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-emerald-500 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 print-area">
            <div class="text-center space-y-2">
                <div class="w-12 h-12 rounded-full bg-emerald-900/60 border border-emerald-500 flex items-center justify-center mx-auto text-2xl">
                    ✅
                </div>
                <h3 class="text-lg font-black text-white">${titleTxt}</h3>
                <p class="text-xs text-slate-400 font-mono">${complaint.submissionDate}</p>
            </div>

            <!-- Reference Number Highlight Box -->
            <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
                <span class="text-xs text-slate-400 uppercase tracking-wider block font-semibold">${refLbl}</span>
                <div class="text-2xl sm:text-3xl font-mono font-black text-emerald-400 tracking-wider">
                    ${complaint.referenceNumber}
                </div>
                <p class="text-[11px] text-slate-400">${refHint}</p>
            </div>

            <!-- Complaint Details Summary -->
            <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div class="flex justify-between"><span class="text-slate-400">Vehicle Number:</span> <strong class="font-mono text-white">${complaint.vehicleNumber}</strong></div>
                <div class="flex justify-between"><span class="text-slate-400">Complainant:</span> <span class="text-white">${complaint.ownerName}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">District / Station:</span> <span class="text-white">${complaint.district} (${complaint.policeStation})</span></div>
            </div>

            <!-- Disclaimer Notice -->
            <div class="p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl text-[11px] text-amber-200 leading-relaxed">
                ${noticeTxt}
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-800 no-print">
                <button onclick="window.print()" class="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold">
                    ${printTxt}
                </button>
                <a href="status.html?ref=${complaint.referenceNumber}" class="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold text-center">
                    ${trackTxt}
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

/**
 * Handle Status Lookup on status.html
 */
function handleStatusSearch() {
    const input = document.getElementById('status-search-input');
    const query = input ? input.value.trim().toUpperCase() : "";

    if (!query) {
        showToast("Please enter a reference number or vehicle number.", "warning");
        return;
    }

    const container = document.getElementById('status-result-container');
    const emptyState = document.getElementById('status-empty-state');
    const detailsCard = document.getElementById('status-details');

    if (!container) return;
    container.classList.remove('hidden');

    const complaints = getComplaints();
    const normalizedQuery = normalizeVehicleNumber(query);

    // Search by Reference No or Vehicle Registration No
    const match = complaints.find(c => 
        c.referenceNumber.toUpperCase() === query || 
        normalizeVehicleNumber(c.vehicleNumber) === normalizedQuery
    );

    if (match) {
        if (emptyState) emptyState.classList.add('hidden');
        if (detailsCard) detailsCard.classList.remove('hidden');

        // Populate Details
        document.getElementById('res-ref-no').textContent = match.referenceNumber;
        document.getElementById('res-veh-no').textContent = match.vehicleNumber;
        document.getElementById('res-owner').textContent = match.ownerName;
        document.getElementById('res-date').textContent = match.incidentDate;
        document.getElementById('res-model').textContent = `${match.make} ${match.model || ''} (${match.color || 'N/A'})`;
        document.getElementById('res-station').textContent = `${match.policeStation}, ${match.district}`;
        document.getElementById('res-remarks').textContent = match.remarks || "Processing with jurisdiction police.";

        // Status Badge Style & Translation
        const badge = document.getElementById('res-status-badge');
        if (match.statusCode === 'REGISTERED') {
            badge.setAttribute('data-i18n', 'status_badge_registered');
            badge.textContent = typeof t === 'function' ? t('status_badge_registered') : match.status;
            badge.className = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-rose-900/60 text-rose-300 border-rose-500/50";
        } else if (match.statusCode === 'UNDER_REVIEW') {
            badge.setAttribute('data-i18n', 'filter_under_review');
            badge.textContent = typeof t === 'function' ? t('filter_under_review') : match.status;
            badge.className = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-blue-900/60 text-blue-300 border-blue-500/50";
        } else {
            badge.setAttribute('data-i18n', 'filter_pending_approval');
            badge.textContent = typeof t === 'function' ? t('filter_pending_approval') : match.status;
            badge.className = "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-amber-900/60 text-amber-300 border-amber-500/50";
        }

        // FIR Banner Container
        const firBanner = document.getElementById('res-fir-banner');
        if (firBanner) {
            if (match.statusCode === 'REGISTERED') {
                firBanner.classList.remove('hidden');
                const firNoEl = document.getElementById('res-fir-no');
                if (firNoEl) firNoEl.textContent = match.firNumber || "FIR-2026-CHN-00412";
            } else {
                firBanner.classList.add('hidden');
            }
        }

        // Update Timeline Steps
        updateTimelineUI(match.statusCode);
        playAlertSound('clean');

    } else {
        if (emptyState) emptyState.classList.remove('hidden');
        if (detailsCard) detailsCard.classList.add('hidden');
        playAlertSound('beep');
    }
}

/**
 * Update 4-Step Timeline Progress Bar
 */
function updateTimelineUI(statusCode) {
    const progressFill = document.getElementById('timeline-progress-fill');
    const dot1 = document.getElementById('step-1-dot');
    const dot2 = document.getElementById('step-2-dot');
    const dot3 = document.getElementById('step-3-dot');
    const dot4 = document.getElementById('step-4-dot');

    const lbl1 = document.getElementById('step-1-label');
    const lbl2 = document.getElementById('step-2-label');
    const lbl3 = document.getElementById('step-3-label');
    const lbl4 = document.getElementById('step-4-label');

    // Reset styles
    [dot1, dot2, dot3, dot4].forEach((d, i) => {
        if (d) {
            d.className = "w-8 h-8 rounded-full bg-slate-700 text-slate-400 font-bold flex items-center justify-center text-xs";
            d.textContent = (i + 1).toString();
        }
    });

    [lbl1, lbl2, lbl3, lbl4].forEach(l => {
        if (l) l.className = "text-slate-400 text-xs mt-2 text-center";
    });

    if (statusCode === 'PENDING') {
        if (progressFill) progressFill.style.width = "25%";
        setStepActive(dot1, lbl1);
    } else if (statusCode === 'UNDER_REVIEW') {
        if (progressFill) progressFill.style.width = "65%";
        setStepCompleted(dot1, lbl1);
        setStepCompleted(dot2, lbl2);
        setStepActive(dot3, lbl3);
    } else if (statusCode === 'REGISTERED') {
        if (progressFill) progressFill.style.width = "100%";
        setStepCompleted(dot1, lbl1);
        setStepCompleted(dot2, lbl2);
        setStepCompleted(dot3, lbl3);
        setStepCompleted(dot4, lbl4, true);
    }
}

function setStepActive(dot, label) {
    if (dot) {
        dot.className = "w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-lg animate-pulse";
    }
    if (label) {
        label.className = "font-bold text-amber-400 text-xs mt-2 text-center";
    }
}

function setStepCompleted(dot, label, isFinal = false) {
    if (dot) {
        dot.className = `w-8 h-8 rounded-full ${isFinal ? 'bg-rose-600' : 'bg-emerald-600'} text-white font-bold flex items-center justify-center text-xs shadow-lg`;
        dot.textContent = "✓";
    }
    if (label) {
        label.className = `font-bold ${isFinal ? 'text-rose-400' : 'text-white'} text-xs mt-2 text-center`;
    }
}
