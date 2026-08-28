/**
 * VehicleGuard AI - Police Command & Intelligence Dashboard
 * Manages KPI metrics, search console, scan audit logs, active stolen database,
 * citizen complaint scrutiny & FIR promotion, and district distribution charts.
 */

let currentScanFilter = 'ALL';
let currentComplaintFilter = 'ALL';

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

window.addEventListener('languageChanged', () => {
    renderDashboardScans();
    renderDashboardStolenDB();
    renderDashboardComplaints();
    renderRecentAlertsFeed();
    renderDistrictCrimeDistribution();
    updateDashboardKPIs();
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }
});

function initDashboard() {
    updateDashboardKPIs();
    renderRecentAlertsFeed();
    renderDashboardScans();
    renderDashboardStolenDB();
    renderDashboardComplaints();
    renderDistrictCrimeDistribution();

    // Direct Search Console
    const searchBtn = document.getElementById('btn-dash-search');
    const searchInput = document.getElementById('dash-search-input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleDirectSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleDirectSearch();
        });
    }

    // Scans Filter Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-slate-800', 'text-slate-400');
            });
            e.currentTarget.classList.add('bg-blue-600', 'text-white');
            e.currentTarget.classList.remove('bg-slate-800', 'text-slate-400');

            currentScanFilter = e.currentTarget.dataset.filter;
            renderDashboardScans();
        });
    });

    // Complaint Filter Tabs
    document.querySelectorAll('.complaint-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.complaint-tab-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-slate-800', 'text-slate-400');
            });
            e.currentTarget.classList.add('bg-blue-600', 'text-white');
            e.currentTarget.classList.remove('bg-slate-800', 'text-slate-400');

            currentComplaintFilter = e.currentTarget.dataset.cfilter;
            renderDashboardComplaints();
        });
    });

    // CSV Export & Clear History
    const exportBtn = document.getElementById('btn-export-csv');
    const clearBtn = document.getElementById('btn-clear-history');
    const addStolenBtn = document.getElementById('btn-open-add-stolen');

    if (exportBtn) exportBtn.addEventListener('click', exportScansCSV);
    if (clearBtn) clearBtn.addEventListener('click', handleClearHistory);
    if (addStolenBtn) addStolenBtn.addEventListener('click', openAddStolenModal);
}

/**
 * Calculate & Update KPI Numbers
 */
function updateDashboardKPIs() {
    const stolenDB = getStolenDatabase();
    const history = getScanHistory();
    const complaints = getComplaints();

    const totalScans = 1240 + history.length;
    const stolenHits = history.filter(h => h.result === 'STOLEN').length + 15;
    const cleanScans = totalScans - stolenHits;
    const pendingVerifs = complaints.filter(c => c.statusCode === 'PENDING' || c.statusCode === 'UNDER_REVIEW').length + 24;

    const elTotal = document.getElementById('kpi-total-scans');
    const elStolen = document.getElementById('kpi-stolen-hits');
    const elClean = document.getElementById('kpi-clean-scans');
    const elPending = document.getElementById('kpi-pending');
    const elFirs = document.getElementById('kpi-active-firs');

    if (elTotal) elTotal.textContent = totalScans.toLocaleString();
    if (elStolen) elStolen.textContent = stolenHits.toLocaleString();
    if (elClean) elClean.textContent = cleanScans.toLocaleString();
    if (elPending) elPending.textContent = pendingVerifs.toLocaleString();
    if (elFirs) elFirs.textContent = stolenDB.length.toLocaleString();
}

/**
 * Render High-Priority Recent Alert Feed
 */
function renderRecentAlertsFeed() {
    const feed = document.getElementById('recent-alerts-feed');
    if (!feed) return;

    const stolenDB = getStolenDatabase();
    const recentStolen = stolenDB.slice(0, 3);

    feed.innerHTML = recentStolen.map(item => `
        <div class="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-rose-900/40 text-xs">
            <div class="flex items-center space-x-2.5">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <div>
                    <span class="font-mono font-bold text-rose-300">${item.vehicleNumber}</span>
                    <span class="text-slate-400 text-[11px] ml-1.5">• ${item.make} ${item.model}</span>
                </div>
            </div>
            <span class="font-mono text-[10px] text-slate-500">${item.district}</span>
        </div>
    `).join('');
}

/**
 * Render Scans Table with Active Filters
 */
function renderDashboardScans() {
    const tbody = document.getElementById('dash-scans-tbody');
    if (!tbody) return;

    let history = getScanHistory();

    if (currentScanFilter === 'STOLEN') {
        history = history.filter(h => h.result === 'STOLEN');
    } else if (currentScanFilter === 'CLEAN') {
        history = history.filter(h => h.result === 'CLEAN');
    }

    if (history.length === 0) {
        const noText = typeof t === 'function' ? t('no_recent_scans') : "No scan records found.";
        tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">${noText}</td></tr>`;
        return;
    }

    const stolenText = typeof t === 'function' ? t('verdict_stolen') : "🔴 STOLEN";
    const cleanText = typeof t === 'function' ? t('verdict_clean') : "🟢 NO MATCH";

    tbody.innerHTML = history.slice(0, 15).map(item => {
        const isStolen = item.result === 'STOLEN';
        const badgeClass = isStolen ? 'bg-rose-900/60 text-rose-200 border-rose-500/50' : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/50';
        const verdictLabel = isStolen ? stolenText : cleanText;

        return `
            <tr class="border-b border-slate-800/60 hover:bg-slate-800/40 transition">
                <td class="py-3 px-4 font-mono font-bold text-white">${item.vehicleNumber}</td>
                <td class="py-3 px-4 text-slate-400 font-mono text-[11px]">${item.timestamp}</td>
                <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase border ${badgeClass}">
                        ${verdictLabel}
                    </span>
                </td>
                <td class="py-3 px-4 text-slate-300 text-xs">${item.officer || 'SI K. Arumugam (DEMO001)'}</td>
                <td class="py-3 px-4 text-slate-400 text-xs">${item.details || 'Routine Check'}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Render Active Stolen Database Repository Table
 */
function renderDashboardStolenDB() {
    const tbody = document.getElementById('dash-stolendb-tbody');
    if (!tbody) return;

    const stolenDB = getStolenDatabase();
    const btnDossierTxt = typeof t === 'function' ? t('btn_dossier') : "Dossier";

    tbody.innerHTML = stolenDB.map((item, idx) => `
        <tr class="border-b border-slate-800/60 hover:bg-slate-800/40 transition">
            <td class="py-3 px-4 font-mono font-bold text-rose-300">${item.vehicleNumber}</td>
            <td class="py-3 px-4 text-white font-medium">${item.make} ${item.model}</td>
            <td class="py-3 px-4 text-slate-300">${item.vehicleType}</td>
            <td class="py-3 px-4 font-mono text-slate-300">${item.complaintNumber}</td>
            <td class="py-3 px-4 text-slate-300">${item.policeStation} (${item.district})</td>
            <td class="py-3 px-4 text-slate-400 font-mono text-[11px]">${item.complaintDate}</td>
            <td class="py-3 px-4 text-right">
                <button onclick="showDossierByIndex(${idx})" class="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded text-[11px] font-semibold border border-rose-700/50">
                    ${btnDossierTxt}
                </button>
            </td>
        </tr>
    `).join('');
}

function showDossierByIndex(index) {
    const stolenDB = getStolenDatabase();
    if (stolenDB[index] && typeof showCrimeDossierModal === 'function') {
        showCrimeDossierModal(stolenDB[index]);
    }
}

/**
 * Render Citizen Complaints & User Submissions Feed
 */
function renderDashboardComplaints() {
    const tbody = document.getElementById('dash-complaints-tbody');
    if (!tbody) return;

    let complaints = getComplaints();

    if (currentComplaintFilter !== 'ALL') {
        complaints = complaints.filter(c => c.statusCode === currentComplaintFilter);
    }

    if (complaints.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-500">No complaints matching filter.</td></tr>`;
        return;
    }

    const btnScrutinyTxt = typeof t === 'function' ? t('btn_scrutiny_approval') : "Scrutiny & Approval";

    tbody.innerHTML = complaints.map(c => {
        let badgeStyle = "bg-slate-800 text-slate-300 border-slate-700";
        let statusLabel = c.status;
        let i18nKey = "";
        if (c.statusCode === 'PENDING') {
            badgeStyle = "bg-amber-950/60 text-amber-300 border-amber-500/50";
            statusLabel = typeof t === 'function' ? t('filter_pending_approval') : c.status;
            i18nKey = 'filter_pending_approval';
        } else if (c.statusCode === 'UNDER_REVIEW') {
            badgeStyle = "bg-blue-950/60 text-blue-300 border-blue-500/50";
            statusLabel = typeof t === 'function' ? t('filter_under_review') : c.status;
            i18nKey = 'filter_under_review';
        } else if (c.statusCode === 'REGISTERED') {
            badgeStyle = "bg-rose-950/60 text-rose-300 border-rose-500/50";
            statusLabel = typeof t === 'function' ? t('status_badge_registered') : c.status;
            i18nKey = 'status_badge_registered';
        } else if (c.statusCode === 'REJECTED') {
            badgeStyle = "bg-slate-800 text-slate-400 border-slate-700";
            statusLabel = typeof t === 'function' ? t('filter_rejected') : c.status;
            i18nKey = 'filter_rejected';
        }

        return `
            <tr class="border-b border-slate-800/60 hover:bg-slate-800/40 transition">
                <td class="py-3 px-4 font-mono font-bold text-blue-400">${c.referenceNumber}</td>
                <td class="py-3 px-4 font-mono font-bold text-white">${c.vehicleNumber}</td>
                <td class="py-3 px-4 text-slate-200 font-medium">${c.ownerName}</td>
                <td class="py-3 px-4 text-slate-300">${c.district}</td>
                <td class="py-3 px-4 text-slate-400 font-mono text-[11px]">${c.submissionDate.substring(0, 16)}</td>
                <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStyle}" ${i18nKey ? `data-i18n="${i18nKey}"` : ''}>
                        ${statusLabel}
                    </span>
                </td>
                <td class="py-3 px-4 text-right">
                    <button onclick="openComplaintScrutinyModal('${c.referenceNumber}')" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold shadow">
                        ${btnScrutinyTxt}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Complaint Scrutiny, Document Verification & FIR Promotion Modal
 */
function openComplaintScrutinyModal(refNumber) {
    const complaints = getComplaints();
    const complaint = complaints.find(c => c.referenceNumber === refNumber);
    if (!complaint) return;

    const existing = document.getElementById('scrutiny-modal');
    if (existing) existing.remove();

    const officer = getLoggedInOfficer() || { name: "SI K. Arumugam", id: "DEMO001", station: "T. Nagar Police Station (E-1)" };

    const modal = document.createElement('div');
    modal.id = 'scrutiny-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-blue-500 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl">⚖️</span>
                    <div>
                        <h3 class="font-bold text-white text-base uppercase">Citizen Theft Submission Scrutiny</h3>
                        <p class="text-xs text-blue-400 font-mono">${complaint.referenceNumber} • Vehicle: ${complaint.vehicleNumber}</p>
                    </div>
                </div>
                <button onclick="document.getElementById('scrutiny-modal').remove()" class="text-slate-400 hover:text-white text-2xl font-bold p-1 leading-none">&times;</button>
            </div>

            <!-- Duty Officer Banner -->
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                    <span class="text-slate-400 block">Duty Scrutiny Officer</span>
                    <strong class="text-white">${officer.name} (${officer.id})</strong>
                </div>
                <div class="text-right">
                    <span class="text-slate-400 block">Station:</span>
                    <span class="text-blue-300 font-mono">${complaint.policeStation || officer.station}</span>
                </div>
            </div>

            <!-- Complaint Details Grid -->
            <div class="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div><span class="text-slate-400">Complainant:</span> <strong class="text-white">${complaint.ownerName}</strong> (${complaint.mobile})</div>
                    <div><span class="text-slate-400">Vehicle:</span> <strong class="text-rose-300 font-mono">${complaint.vehicleNumber}</strong> (${complaint.make} ${complaint.model || ''})</div>
                    <div><span class="text-slate-400">Category:</span> <span class="text-slate-200">${complaint.vehicleType}</span></div>
                    <div><span class="text-slate-400">Color:</span> <span class="text-slate-200">${complaint.color || 'N/A'}</span></div>
                    <div><span class="text-slate-400">Incident Date/Time:</span> <span class="text-slate-200">${complaint.incidentDate} ${complaint.incidentTime || ''}</span></div>
                    <div><span class="text-slate-400">District:</span> <span class="text-slate-200">${complaint.district}</span></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">Location:</span> <span class="text-slate-200">${complaint.location}</span></div>
                    <div class="sm:col-span-2"><span class="text-slate-400">Description:</span> <p class="text-slate-300 italic mt-0.5">${complaint.description || 'Routine stolen vehicle report submitted via citizen portal.'}</p></div>
                </div>
            </div>

            <!-- Current Scrutiny State -->
            <div class="p-3 bg-slate-800/60 rounded-xl text-xs space-y-1">
                <div class="flex justify-between items-center">
                    <span class="text-slate-400">Current Scrutiny Verdict:</span>
                    <span class="font-bold text-amber-300 uppercase">${complaint.status}</span>
                </div>
                <div>
                    <label class="block text-slate-300 font-semibold mt-2 mb-1">Officer Scrutiny Assessment & Action Remarks:</label>
                    <textarea id="officer-scrutiny-remarks" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white" placeholder="Document verified. Recommend issuing formal FIR and syncing into ANPR checkpoint registry.">${complaint.remarks || ''}</textarea>
                </div>
            </div>

            <!-- Officer Action Decisions -->
            <div class="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button onclick="updateComplaintStatus('${complaint.referenceNumber}', 'REJECTED')" class="px-3.5 py-2 bg-slate-800 hover:bg-rose-950 text-rose-300 hover:text-rose-200 rounded-lg text-xs font-semibold border border-slate-700 transition">
                    ❌ Reject
                </button>
                <button onclick="updateComplaintStatus('${complaint.referenceNumber}', 'UNDER_REVIEW')" class="px-3.5 py-2 bg-blue-900/60 hover:bg-blue-800 text-blue-200 rounded-lg text-xs font-semibold border border-blue-700/50 transition">
                    🔍 Mark Under Review
                </button>
                <button onclick="promoteToOfficialFIR('${complaint.referenceNumber}')" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-rose-600/30 transition">
                    🔴 Approve & Issue Formal FIR
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Promote Citizen Complaint to Official FIR & Central Stolen Watchlist
 */
function promoteToOfficialFIR(refNumber) {
    const complaints = getComplaints();
    const complaintIndex = complaints.findIndex(c => c.referenceNumber === refNumber);
    if (complaintIndex === -1) return;

    const complaint = complaints[complaintIndex];
    const remarks = document.getElementById('officer-scrutiny-remarks')?.value || "Approved by Sub-Inspector of Police. Formal FIR generated and synced into ANPR watchlist.";

    const firNo = "FIR-2026-" + (complaint.district.substring(0, 3).toUpperCase()) + "-" + Math.floor(10000 + Math.random() * 90000);

    // Update Complaint Record
    complaints[complaintIndex].status = "FIR Registered — Demo Status";
    complaints[complaintIndex].statusCode = "REGISTERED";
    complaints[complaintIndex].remarks = remarks;
    complaints[complaintIndex].firNumber = firNo;
    localStorage.setItem('vg_complaints', JSON.stringify(complaints));

    // Inject into Central Stolen DB Watchlist
    const stolenDB = getStolenDatabase();
    const alreadyExists = stolenDB.some(s => normalizeVehicleNumber(s.vehicleNumber) === normalizeVehicleNumber(complaint.vehicleNumber));

    if (!alreadyExists) {
        stolenDB.unshift({
            vehicleNumber: normalizeVehicleNumber(complaint.vehicleNumber),
            vehicleType: complaint.vehicleType,
            make: complaint.make,
            model: complaint.model || "Standard Model",
            color: complaint.color || "Black",
            complaintNumber: firNo,
            policeStation: complaint.policeStation || "Jurisdiction Police Station",
            district: complaint.district,
            complaintDate: complaint.incidentDate || new Date().toISOString().substring(0, 10),
            theftLocation: complaint.location,
            ownerName: complaint.ownerName,
            engineHash: "CHAS" + Math.floor(1000000 + Math.random() * 9000000),
            status: "STOLEN",
            severity: "HIGH_PRIORITY",
            notes: `Promoted from citizen complaint ${complaint.referenceNumber}. Flagged for instant intercept.`
        });
        localStorage.setItem('vg_stolen_db', JSON.stringify(stolenDB));
    }

    document.getElementById('scrutiny-modal')?.remove();
    showToast(`✅ Formal FIR ${firNo} Issued! Added to Live ANPR Watchlist.`, "success", 5000);

    // Refresh UI
    updateDashboardKPIs();
    renderDashboardComplaints();
    renderDashboardStolenDB();
    renderRecentAlertsFeed();
}

/**
 * Update General Complaint Status
 */
function updateComplaintStatus(refNumber, newStatusCode) {
    const complaints = getComplaints();
    const idx = complaints.findIndex(c => c.referenceNumber === refNumber);
    if (idx === -1) return;

    const remarks = document.getElementById('officer-scrutiny-remarks')?.value || "";

    if (newStatusCode === 'UNDER_REVIEW') {
        complaints[idx].status = "Under Police Review";
        complaints[idx].statusCode = "UNDER_REVIEW";
        complaints[idx].remarks = remarks || "RC verification and jurisdictional scrutiny in progress.";
    } else if (newStatusCode === 'REJECTED') {
        complaints[idx].status = "Submission Rejected";
        complaints[idx].statusCode = "REJECTED";
        complaints[idx].remarks = remarks || "Insufficient ownership documentation provided.";
    }

    localStorage.setItem('vg_complaints', JSON.stringify(complaints));
    document.getElementById('scrutiny-modal')?.remove();
    showToast("Complaint status updated to " + complaints[idx].status, "info");

    updateDashboardKPIs();
    renderDashboardComplaints();
}

/**
 * Direct Stolen Vehicle Lookup from Dashboard Search Console
 */
function handleDirectSearch() {
    const input = document.getElementById('dash-search-input');
    const val = normalizeVehicleNumber(input ? input.value : '');

    if (!val) {
        showToast("Please enter a vehicle registration number.", "warning");
        return;
    }

    const stolenDB = getStolenDatabase();
    const record = stolenDB.find(v => normalizeVehicleNumber(v.vehicleNumber) === val);

    if (record) {
        playAlertSound('stolen');
        showToast("🔴 STOLEN MATCH FOUND: " + record.vehicleNumber, "stolen");
        if (typeof showCrimeDossierModal === 'function') {
            showCrimeDossierModal(record);
        }
    } else {
        playAlertSound('clean');
        showToast("🟢 No active stolen report found for " + val, "success");
    }
}

/**
 * Add Stolen Vehicle Watchlist Modal Dialog
 */
function openAddStolenModal() {
    const existing = document.getElementById('add-stolen-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'add-stolen-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-rose-600 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <div class="flex items-center space-x-2">
                    <span class="text-xl">➕</span>
                    <h3 class="font-bold text-white text-base">Add Stolen Vehicle to Central Watchlist</h3>
                </div>
                <button onclick="document.getElementById('add-stolen-modal').remove()" class="text-slate-400 hover:text-white text-2xl font-bold p-1 leading-none">&times;</button>
            </div>

            <form id="add-stolen-form" class="space-y-3 text-xs">
                <div>
                    <label class="block text-slate-300 font-semibold mb-1">Vehicle Registration Number *</label>
                    <input type="text" id="add-veh-num" required placeholder="e.g. TN02XY9988" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm font-mono uppercase text-white">
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Make / Brand *</label>
                        <input type="text" id="add-make" required placeholder="e.g. Hyundai" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Model Name</label>
                        <input type="text" id="add-model" placeholder="e.g. Creta SX" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Vehicle Type</label>
                        <select id="add-veh-type" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Car / Sedan">Car / Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Commercial / Auto">Commercial / Auto</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Primary Color</label>
                        <input type="text" id="add-color" placeholder="e.g. White" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">FIR / Crime Number *</label>
                        <input type="text" id="add-fir" required placeholder="FIR-2026-CHN-00999" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 font-mono text-white">
                    </div>
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Police Station</label>
                        <input type="text" id="add-station" placeholder="e.g. Anna Nagar Station" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">District</label>
                        <input type="text" id="add-district" placeholder="e.g. Chennai" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                    <div>
                        <label class="block text-slate-300 font-semibold mb-1">Complaint Date</label>
                        <input type="date" id="add-date" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
                    </div>
                </div>

                <div class="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                    <button type="button" onclick="document.getElementById('add-stolen-modal').remove()" class="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow">Save to Watchlist</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('add-stolen-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newRecord = {
            vehicleNumber: normalizeVehicleNumber(document.getElementById('add-veh-num').value),
            make: document.getElementById('add-make').value.trim(),
            model: document.getElementById('add-model').value.trim() || "Standard",
            vehicleType: document.getElementById('add-veh-type').value,
            color: document.getElementById('add-color').value.trim() || "Black",
            complaintNumber: document.getElementById('add-fir').value.trim(),
            policeStation: document.getElementById('add-station').value.trim() || "Local Police Station",
            district: document.getElementById('add-district').value.trim() || "Chennai",
            complaintDate: document.getElementById('add-date').value || new Date().toISOString().substring(0, 10),
            theftLocation: "Reported in Zone",
            ownerName: "Verified Owner",
            engineHash: "CHAS" + Math.floor(1000000 + Math.random() * 9000000),
            status: "STOLEN",
            severity: "HIGH_PRIORITY",
            notes: "Added by Command Officer via Central Dashboard."
        };

        const stolenDB = getStolenDatabase();
        stolenDB.unshift(newRecord);
        localStorage.setItem('vg_stolen_db', JSON.stringify(stolenDB));

        document.getElementById('add-stolen-modal').remove();
        showToast("✅ Vehicle " + newRecord.vehicleNumber + " added to live ANPR watchlist.", "success");

        updateDashboardKPIs();
        renderDashboardStolenDB();
        renderRecentAlertsFeed();
    });
}

/**
 * Render Tamil Nadu District Crime Distribution Bars
 */
function renderDistrictCrimeDistribution() {
    const container = document.getElementById('district-analytics-bars');
    if (!container) return;

    const districts = [
        { name: "Chennai City", stolen: 42, recovered: 36, rate: "85%" },
        { name: "Coimbatore", stolen: 28, recovered: 22, rate: "78%" },
        { name: "Madurai", stolen: 24, recovered: 19, rate: "79%" },
        { name: "Tiruchirappalli", stolen: 18, recovered: 14, rate: "77%" },
        { name: "Salem", stolen: 15, recovered: 11, rate: "73%" },
        { name: "Tirunelveli", stolen: 12, recovered: 9, rate: "75%" }
    ];

    container.innerHTML = districts.map(d => `
        <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-white">${d.name}</span>
                <span class="text-emerald-400 font-mono text-[11px] font-bold">Recovery: ${d.rate}</span>
            </div>
            <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div class="bg-rose-500 h-full" style="width: 45%;"></div>
                <div class="bg-emerald-500 h-full" style="width: 55%;"></div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Stolen Logs: ${d.stolen}</span>
                <span>Recovered: ${d.recovered}</span>
            </div>
        </div>
    `).join('');
}

/**
 * CSV Export
 */
function exportScansCSV() {
    const history = getScanHistory();
    let csv = "Scan_ID,Vehicle_Number,Timestamp,Verdict,Officer,Details\n";
    history.forEach(h => {
        csv += `"${h.id || ''}","${h.vehicleNumber || ''}","${h.timestamp || ''}","${h.result || ''}","${h.officer || ''}","${(h.details || '').replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VehicleGuard_Scans_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    showToast("CSV file exported successfully.", "success");
}

/**
 * Clear Local History
 */
function handleClearHistory() {
    if (confirm("Are you sure you want to clear the local field scan history?")) {
        localStorage.setItem('vg_scan_history', JSON.stringify([]));
        updateDashboardKPIs();
        renderDashboardScans();
        showToast("Local scan logs cleared.", "info");
    }
}
