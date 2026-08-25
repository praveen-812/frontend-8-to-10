/**
 * VehicleGuard AI - Police Command & Intelligence Dashboard
 * Handles dynamic KPI computation, live plate search, filterable tables, 
 * CSV exports, Stolen Database management, and Citizen Submission Approval / FIR Promotion workflow.
 */

let activeComplaintFilter = 'ALL';

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    renderKPIs();
    renderRecentAlertsFeed();
    renderScansTable('ALL');
    renderStolenDbTable();
    renderComplaintsTable('ALL');
    renderDistrictAnalytics();
    initDashboardSearch();
    initFilterTabs();
    initComplaintFilterTabs();
    initAddStolenModal();

    // Export and Clear buttons
    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) exportBtn.addEventListener('click', exportScansToCSV);

    const clearBtn = document.getElementById('btn-clear-history');
    if (clearBtn) clearBtn.addEventListener('click', handleClearHistory);
}

/**
 * Render KPI Statistic Counters
 */
function renderKPIs() {
    const scanHistory = getScanHistory();
    const stolenDb = getStolenDatabase();
    const complaints = getComplaints();

    const totalScans = scanHistory.length;
    const stolenHits = scanHistory.filter(s => s.result === 'STOLEN').length;
    const cleanScans = scanHistory.filter(s => s.result === 'CLEAN').length;
    const pendingVerifications = complaints.filter(c => c.statusCode === 'PENDING').length;
    const activeFIRs = stolenDb.length;

    const elTotal = document.getElementById('kpi-total-scans');
    const elStolen = document.getElementById('kpi-stolen-hits');
    const elClean = document.getElementById('kpi-clean-scans');
    const elPending = document.getElementById('kpi-pending');
    const elFIRs = document.getElementById('kpi-active-firs');

    if (elTotal) elTotal.textContent = (1240 + totalScans).toLocaleString();
    if (elStolen) elStolen.textContent = (15 + stolenHits).toLocaleString();
    if (elClean) elClean.textContent = (1199 + cleanScans).toLocaleString();
    if (elPending) elPending.textContent = pendingVerifications.toLocaleString();
    if (elFIRs) elFIRs.textContent = activeFIRs.toLocaleString();
}

/**
 * Render Recent High Priority Alerts
 */
function renderRecentAlertsFeed() {
    const container = document.getElementById('recent-alerts-feed');
    if (!container) return;

    const stolenScans = getScanHistory().filter(s => s.result === 'STOLEN').slice(0, 4);
    if (stolenScans.length === 0) {
        container.innerHTML = `<div class="p-4 text-center text-slate-500 text-xs">No recent stolen vehicle alerts logged.</div>`;
        return;
    }

    container.innerHTML = stolenScans.map(item => `
        <div class="p-3 bg-rose-950/30 border border-rose-600/40 rounded-lg flex items-center justify-between hover:bg-rose-950/50 transition">
            <div class="flex items-center space-x-3">
                <span class="text-xl">🚨</span>
                <div>
                    <div class="font-mono font-bold text-rose-300 text-sm">${item.vehicleNumber}</div>
                    <div class="text-xs text-slate-400">${item.details || 'Stolen Vehicle Match'} • ${item.location || 'Checkpoint'}</div>
                </div>
            </div>
            <div class="text-right">
                <span class="text-xs font-mono text-slate-400 block">${(item.timestamp || '').split(' ')[1] || item.timestamp}</span>
                <span class="text-[10px] uppercase font-bold text-rose-400 bg-rose-900/60 px-2 py-0.5 rounded">ALERT</span>
            </div>
        </div>
    `).join('');
}

/**
 * Initialize Live Search on Dashboard
 */
function initDashboardSearch() {
    const input = document.getElementById('dash-search-input');
    const btn = document.getElementById('btn-dash-search');

    if (btn && input) {
        btn.addEventListener('click', () => {
            handleDashSearch(input.value);
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleDashSearch(input.value);
            }
        });
    }
}

function handleDashSearch(query) {
    if (!query || query.trim() === '') {
        showToast("Please enter a registration number to search.", "warning");
        return;
    }
    const normalized = normalizeVehicleNumber(query);
    const stolenDb = getStolenDatabase();
    const match = stolenDb.find(s => normalizeVehicleNumber(s.vehicleNumber) === normalized);

    if (match) {
        openDossierModal(match);
        showToast(`Match Found: ${match.vehicleNumber} is reported STOLEN`, 'stolen');
    } else {
        showToast(`No Stolen Vehicle Record found for ${normalized}`, 'success');
    }
}

/**
 * Filter Tabs in Dashboard Scans Table
 */
function initFilterTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-slate-800', 'text-slate-400');
            });
            e.currentTarget.classList.remove('bg-slate-800', 'text-slate-400');
            e.currentTarget.classList.add('bg-blue-600', 'text-white');

            const filter = e.currentTarget.dataset.filter || 'ALL';
            renderScansTable(filter);
        });
    });
}

/**
 * Complaint Filter Tabs
 */
function initComplaintFilterTabs() {
    document.querySelectorAll('.complaint-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.complaint-tab-btn').forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-slate-800', 'text-slate-400');
            });
            e.currentTarget.classList.remove('bg-slate-800', 'text-slate-400');
            e.currentTarget.classList.add('bg-blue-600', 'text-white');

            activeComplaintFilter = e.currentTarget.dataset.cfilter || 'ALL';
            renderComplaintsTable(activeComplaintFilter);
        });
    });
}

/**
 * Render Scans Table with Filters
 */
function renderScansTable(filter = 'ALL') {
    const tbody = document.getElementById('dash-scans-tbody');
    if (!tbody) return;

    let history = getScanHistory();
    if (filter === 'STOLEN') {
        history = history.filter(h => h.result === 'STOLEN');
    } else if (filter === 'CLEAN') {
        history = history.filter(h => h.result === 'CLEAN');
    }

    if (history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-500 text-sm">No records match the selected filter.</td></tr>`;
        return;
    }

    tbody.innerHTML = history.map(item => {
        const isStolen = item.result === 'STOLEN';
        return `
            <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
                <td class="py-3 px-4 font-mono font-bold ${isStolen ? 'text-rose-400' : 'text-emerald-400'}">
                    ${item.vehicleNumber}
                </td>
                <td class="py-3 px-4 text-xs text-slate-400">${item.timestamp}</td>
                <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        isStolen ? 'bg-rose-900/60 text-rose-300 border border-rose-500/50' : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50'
                    }">
                        ${isStolen ? '🔴 STOLEN' : '🟢 NO MATCH'}
                    </span>
                </td>
                <td class="py-3 px-4 text-xs text-slate-300">${item.officer || 'Officer DEMO001'}</td>
                <td class="py-3 px-4 text-xs text-slate-400">${item.details || '-'}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Render Stolen Vehicles Database Table
 */
function renderStolenDbTable() {
    const tbody = document.getElementById('dash-stolendb-tbody');
    if (!tbody) return;

    const db = getStolenDatabase();
    if (db.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-500 text-sm">No active stolen records in database.</td></tr>`;
        return;
    }

    tbody.innerHTML = db.map((item, index) => `
        <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
            <td class="py-3 px-4 font-mono font-bold text-rose-400">${item.vehicleNumber}</td>
            <td class="py-3 px-4 text-xs text-slate-200">${item.make} ${item.model || ''}</td>
            <td class="py-3 px-4 text-xs text-slate-400">${item.vehicleType}</td>
            <td class="py-3 px-4 font-mono text-xs text-slate-300">${item.complaintNumber}</td>
            <td class="py-3 px-4 text-xs text-slate-300">${item.policeStation} (${item.district || 'Chennai'})</td>
            <td class="py-3 px-4 text-xs text-slate-400">${item.complaintDate}</td>
            <td class="py-3 px-4 text-right">
                <button class="px-2.5 py-1 bg-blue-900/40 hover:bg-blue-800/60 border border-blue-600/50 text-blue-300 rounded text-xs transition" onclick='openDossierModalByIndex(${index})'>
                    Dossier
                </button>
            </td>
        </tr>
    `).join('');
}

window.openDossierModalByIndex = function(index) {
    const db = getStolenDatabase();
    if (db[index]) {
        openDossierModal(db[index]);
    }
};

/**
 * Open Crime Dossier Modal for Stolen Record
 */
function openDossierModal(record) {
    const existing = document.getElementById('fir-dossier-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'fir-dossier-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 print-area space-y-6">
            <div class="flex justify-between items-start border-b border-slate-700 pb-4">
                <div class="flex items-center space-x-3">
                    <img src="images/tn_police_emblem.svg" alt="TN Police" class="w-12 h-12 object-contain">
                    <div>
                        <span class="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">CCTNS CRIME DOSSIER • TN POLICE</span>
                        <h3 class="text-xl sm:text-2xl font-black text-white font-mono">${record.complaintNumber}</h3>
                    </div>
                </div>
                <button class="text-slate-400 hover:text-white text-2xl font-bold p-1 no-print" onclick="document.getElementById('fir-dossier-modal').remove()">&times;</button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                    <span class="text-slate-400 block mb-0.5">Vehicle Number</span>
                    <span class="font-mono font-bold text-rose-400 text-sm">${record.vehicleNumber}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Make & Model</span>
                    <span class="font-semibold text-white">${record.make} ${record.model || ''}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Category / Type</span>
                    <span class="font-semibold text-white">${record.vehicleType}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Primary Color</span>
                    <span class="font-semibold text-white">${record.color || 'Standard'}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Jurisdiction District</span>
                    <span class="font-semibold text-white">${record.district}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Reporting Police Station</span>
                    <span class="font-semibold text-white">${record.policeStation}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Theft Date</span>
                    <span class="font-semibold text-white">${record.complaintDate}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Complainant / Owner</span>
                    <span class="font-semibold text-white">${record.ownerName || 'Verified Complainant'}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Engine / Chassis Hash</span>
                    <span class="font-mono text-slate-300">${record.engineHash || 'TN-HASH-VERIFIED'}</span>
                </div>
            </div>

            <div class="bg-rose-950/30 border border-rose-600/40 rounded-xl p-4 text-xs space-y-1">
                <span class="font-bold text-rose-300 uppercase tracking-wider block mb-1">Incident Report Notes & Investigation Brief</span>
                <p class="text-slate-300 leading-relaxed">${record.notes || 'Vehicle reported stolen. High-priority intercept order active at all regional checkpoints.'}</p>
            </div>

            <div class="flex justify-between items-center pt-2 no-print border-t border-slate-800">
                <button type="button" class="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-semibold text-slate-200 transition flex items-center space-x-1.5" onclick="window.print()">
                    <span>🖨️ Print Crime Dossier</span>
                </button>
                <button type="button" class="py-2.5 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-white transition" onclick="document.getElementById('fir-dossier-modal').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Render Citizen Complaints & User Submissions Table with Scrutiny & Approval Action
 */
function renderComplaintsTable(filter = 'ALL') {
    const tbody = document.getElementById('dash-complaints-tbody');
    if (!tbody) return;

    let complaints = getComplaints();
    if (filter === 'PENDING') {
        complaints = complaints.filter(c => c.statusCode === 'PENDING');
    } else if (filter === 'UNDER_REVIEW') {
        complaints = complaints.filter(c => c.statusCode === 'UNDER_REVIEW');
    } else if (filter === 'REGISTERED') {
        complaints = complaints.filter(c => c.statusCode === 'REGISTERED');
    } else if (filter === 'REJECTED') {
        complaints = complaints.filter(c => c.statusCode === 'REJECTED');
    }

    if (complaints.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-slate-500 text-sm">No complaints found matching filter "${filter}".</td></tr>`;
        return;
    }

    tbody.innerHTML = complaints.map((item, index) => {
        let badgeClass = "bg-amber-900/60 text-amber-300 border-amber-500/50";
        let statusDot = "🟡";
        if (item.statusCode === 'REGISTERED') {
            badgeClass = "bg-rose-900/60 text-rose-300 border-rose-500/50";
            statusDot = "🔴";
        } else if (item.statusCode === 'UNDER_REVIEW') {
            badgeClass = "bg-blue-900/60 text-blue-300 border-blue-500/50";
            statusDot = "🔵";
        } else if (item.statusCode === 'REJECTED') {
            badgeClass = "bg-slate-800 text-slate-400 border-slate-600";
            statusDot = "⚪";
        }

        return `
            <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
                <td class="py-3 px-4 font-mono font-bold text-blue-400">${item.referenceNumber}</td>
                <td class="py-3 px-4 font-mono font-semibold text-slate-100">${item.vehicleNumber}</td>
                <td class="py-3 px-4 text-xs">
                    <span class="font-medium text-slate-200 block">${item.ownerName}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${item.mobile || ''}</span>
                </td>
                <td class="py-3 px-4 text-xs text-slate-300">${item.district}</td>
                <td class="py-3 px-4 text-xs text-slate-400">${(item.submissionDate || item.incidentDate || '').split(' ')[0]}</td>
                <td class="py-3 px-4">
                    <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${badgeClass}">
                        <span>${statusDot}</span>
                        <span>${item.status}</span>
                    </span>
                </td>
                <td class="py-3 px-4 text-right">
                    <button class="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-md shadow-blue-600/20 flex items-center space-x-1 ml-auto" onclick='openComplaintApprovalModal("${item.referenceNumber}")'>
                        <span>🔍</span>
                        <span>Scrutiny & Approval</span>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Interactive Citizen Complaint Scrutiny & Approval Dossier Modal
 * Allows logged-in police personnel to review user details, approve FIR, mark under review, or reject.
 */
window.openComplaintApprovalModal = function(referenceNumber) {
    const complaints = getComplaints();
    const record = complaints.find(c => c.referenceNumber === referenceNumber);
    if (!record) {
        showToast("Complaint record not found.", "error");
        return;
    }

    const officer = getLoggedInOfficer() || {
        id: "DEMO001",
        name: "Sub-Inspector K. Arumugam",
        rank: "Sub-Inspector of Police",
        station: "T. Nagar Police Station (E-1)",
        district: "Chennai City Police"
    };

    const existing = document.getElementById('complaint-approval-modal');
    if (existing) existing.remove();

    const isAlreadyApproved = record.statusCode === 'REGISTERED';
    const isRejected = record.statusCode === 'REJECTED';

    const modal = document.createElement('div');
    modal.id = 'complaint-approval-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto';
    modal.innerHTML = `
        <div class="bg-slate-900 border-2 border-blue-500/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
            
            <!-- Modal Header -->
            <div class="flex justify-between items-start border-b border-slate-700 pb-4">
                <div class="flex items-center space-x-3">
                    <img src="images/tn_state_emblem.svg" alt="Tamil Nadu State Symbol" class="w-12 h-12 object-contain">
                    <div>
                        <span class="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">CITIZEN THEFT SUBMISSION SCRUTINY</span>
                        <h3 class="text-xl font-bold text-white flex items-center space-x-2">
                            <span>Reference:</span>
                            <span class="font-mono text-blue-300">${record.referenceNumber}</span>
                        </h3>
                    </div>
                </div>
                <button class="text-slate-400 hover:text-white text-2xl font-bold p-1" onclick="document.getElementById('complaint-approval-modal').remove()">&times;</button>
            </div>

            <!-- Officer In-Charge Banner -->
            <div class="bg-blue-950/40 border border-blue-600/40 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div class="flex items-center space-x-2.5">
                    <span class="text-xl">👮</span>
                    <div>
                        <span class="text-slate-400 block text-[10px] uppercase">Duty Scrutiny Officer</span>
                        <span class="font-bold text-blue-200">${officer.name} (${officer.rank})</span>
                    </div>
                </div>
                <div class="text-right font-mono text-[11px] text-slate-400">
                    Station: ${officer.station}
                </div>
            </div>

            <!-- Citizen & Vehicle Details Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                    <span class="text-slate-400 block text-[11px]">Vehicle Registration</span>
                    <span class="font-mono font-extrabold text-blue-300 text-sm">${record.vehicleNumber}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Vehicle Category</span>
                    <span class="font-semibold text-white">${record.vehicleType}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Make & Model</span>
                    <span class="font-semibold text-white">${record.make} ${record.model || ''}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Color</span>
                    <span class="font-semibold text-white">${record.color || 'Standard'}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Complainant Full Name</span>
                    <span class="font-semibold text-white">${record.ownerName}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Complainant Mobile</span>
                    <span class="font-mono text-white">${record.mobile}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Incident Date & Time</span>
                    <span class="font-medium text-white">${record.incidentDate} (${record.incidentTime || 'N/A'})</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Incident District</span>
                    <span class="font-medium text-white">${record.district}</span>
                </div>
                <div>
                    <span class="text-slate-400 block text-[11px]">Jurisdiction Police Station</span>
                    <span class="font-medium text-white">${record.policeStation}</span>
                </div>
                <div class="col-span-2 sm:col-span-3 pt-2 border-t border-slate-800">
                    <span class="text-slate-400 block text-[11px]">Theft Location / Landmark:</span>
                    <span class="text-slate-200">${record.location || 'Roadside area'}</span>
                </div>
                <div class="col-span-2 sm:col-span-3">
                    <span class="text-slate-400 block text-[11px]">Citizen Description & Identification Marks:</span>
                    <span class="text-slate-300 italic">${record.description || 'No special marks recorded.'}</span>
                </div>
            </div>

            <!-- Current Status Box -->
            <div class="p-3 rounded-xl border flex items-center justify-between text-xs ${
                isAlreadyApproved ? 'bg-rose-950/40 border-rose-600/50 text-rose-200' :
                isRejected ? 'bg-slate-800/80 border-slate-600 text-slate-300' :
                record.statusCode === 'UNDER_REVIEW' ? 'bg-blue-950/40 border-blue-600/50 text-blue-200' :
                'bg-amber-950/40 border-amber-600/50 text-amber-200'
            }">
                <div>
                    <span class="text-[10px] uppercase font-bold block opacity-80">Current Scrutiny Verdict</span>
                    <span class="font-extrabold text-sm">${record.status}</span>
                </div>
                <span class="text-xs font-mono text-slate-400">Submission: ${record.submissionDate}</span>
            </div>

            <!-- Officer Review Remarks Form -->
            <div class="space-y-2">
                <label for="officer-scrutiny-remarks" class="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Officer Scrutiny Assessment & Action Remarks:
                </label>
                <textarea id="officer-scrutiny-remarks" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500" placeholder="Enter scrutiny findings, RC verification remarks, or FIR assignment details...">${record.remarks || ''}</textarea>
            </div>

            <!-- Action Buttons Grid -->
            <div class="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-800">
                <!-- Approve & Register FIR Button -->
                <button type="button" id="btn-modal-approve-fir" class="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/30 transition flex items-center justify-center space-x-1.5">
                    <span>✅</span>
                    <span>Approve & Issue Formal FIR</span>
                </button>

                <!-- Mark Under Review Button -->
                <button type="button" id="btn-modal-under-review" class="py-3 px-4 bg-blue-800 hover:bg-blue-700 text-blue-100 font-semibold rounded-xl text-xs border border-blue-600/50 transition">
                    <span>🔍 Mark Under Review</span>
                </button>

                <!-- Reject Complaint Button -->
                <button type="button" id="btn-modal-reject" class="py-3 px-3.5 bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 border border-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition">
                    <span>❌ Reject</span>
                </button>

                <!-- Close Button -->
                <button type="button" class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs border border-slate-700 transition" onclick="document.getElementById('complaint-approval-modal').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Event Handlers for Modal Buttons
    const btnApprove = document.getElementById('btn-modal-approve-fir');
    const btnReview = document.getElementById('btn-modal-under-review');
    const btnReject = document.getElementById('btn-modal-reject');
    const remarksInput = document.getElementById('officer-scrutiny-remarks');

    if (btnApprove) {
        btnApprove.addEventListener('click', () => {
            const remarks = remarksInput.value.trim() || "Documents and identity verified by duty officer. FIR generated and added to CCTNS ANPR tracking watchlist.";
            handleApproveComplaint(record.referenceNumber, remarks, officer);
        });
    }

    if (btnReview) {
        btnReview.addEventListener('click', () => {
            const remarks = remarksInput.value.trim() || "RC copy verification under inquiry with local jurisdictional station.";
            handleUpdateComplaintStatus(record.referenceNumber, "Under Police Review", "UNDER_REVIEW", remarks);
        });
    }

    if (btnReject) {
        btnReject.addEventListener('click', () => {
            const remarks = remarksInput.value.trim() || "Submission rejected due to invalid vehicle registration or lack of physical documentation.";
            handleUpdateComplaintStatus(record.referenceNumber, "Rejected — Incomplete Details", "REJECTED", remarks);
        });
    }
};

/**
 * Approve Complaint & Promote to Active Stolen Watchlist (vg_stolen_db)
 */
function handleApproveComplaint(refNumber, remarks, officer) {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.referenceNumber === refNumber);
    if (index === -1) return;

    const comp = complaints[index];

    // Generate district code based FIR Number: e.g. FIR-2026-CHN-00812
    const distCode = (comp.district || 'CHN').substring(0, 3).toUpperCase();
    const randomFirDigits = Math.floor(10000 + Math.random() * 90000);
    const firNumber = `FIR-2026-${distCode}-${randomFirDigits}`;

    // Update complaint record
    comp.status = "FIR Registered — Approved";
    comp.statusCode = "REGISTERED";
    comp.firNumber = firNumber;
    comp.approvedBy = `${officer.name} (${officer.id})`;
    comp.approvalDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    comp.remarks = remarks;

    // Save complaints
    localStorage.setItem('vg_complaints', JSON.stringify(complaints));

    // Promote to Active Stolen Watchlist (vg_stolen_db)
    const stolenDb = getStolenDatabase();
    const normalizedVeh = normalizeVehicleNumber(comp.vehicleNumber);
    
    // Check if not already in stolen db
    const existingStolen = stolenDb.find(s => normalizeVehicleNumber(s.vehicleNumber) === normalizedVeh);
    if (!existingStolen) {
        stolenDb.unshift({
            vehicleNumber: normalizedVeh,
            vehicleType: comp.vehicleType,
            make: comp.make,
            model: comp.model || "Standard",
            color: comp.color || "Standard",
            complaintNumber: firNumber,
            policeStation: comp.policeStation || `${comp.district} Police Station`,
            district: comp.district,
            complaintDate: comp.incidentDate || new Date().toISOString().split('T')[0],
            theftLocation: comp.location || "Public area",
            ownerName: comp.ownerName,
            engineHash: `TN${distCode}${Math.floor(100000 + Math.random() * 900000)}X`,
            status: "STOLEN",
            severity: "HIGH_PRIORITY",
            notes: `FIR approved from citizen submission (${refNumber}). Verified by ${officer.name} (${officer.id}). ${remarks}`
        });
        localStorage.setItem('vg_stolen_db', JSON.stringify(stolenDb));
    }

    // Close modal
    const modal = document.getElementById('complaint-approval-modal');
    if (modal) modal.remove();

    // Re-render UI
    renderKPIs();
    renderComplaintsTable(activeComplaintFilter);
    renderStolenDbTable();

    playAlertSound('stolen');
    showToast(`✅ Complaint Approved! FIR Registered: ${firNumber} & Added to Watchlist`, "success", 5000);
}

/**
 * Update Complaint Status (Under Review / Rejected)
 */
function handleUpdateComplaintStatus(refNumber, newStatusText, newStatusCode, remarks) {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.referenceNumber === refNumber);
    if (index === -1) return;

    complaints[index].status = newStatusText;
    complaints[index].statusCode = newStatusCode;
    complaints[index].remarks = remarks;

    localStorage.setItem('vg_complaints', JSON.stringify(complaints));

    const modal = document.getElementById('complaint-approval-modal');
    if (modal) modal.remove();

    renderKPIs();
    renderComplaintsTable(activeComplaintFilter);

    showToast(`Status updated: ${newStatusText}`, "info", 3500);
}

/**
 * Render Tamil Nadu District Activity Chart Breakdown
 */
function renderDistrictAnalytics() {
    const container = document.getElementById('district-analytics-bars');
    if (!container) return;

    const districtStats = [
        { name: "Chennai Zone", count: 48, percentage: 85, color: "bg-rose-500" },
        { name: "Coimbatore Zone", count: 32, percentage: 65, color: "bg-blue-500" },
        { name: "Madurai City", count: 26, percentage: 55, color: "bg-amber-500" },
        { name: "Salem Sub-Division", count: 18, percentage: 40, color: "bg-cyan-500" },
        { name: "Trichy Zone", count: 15, percentage: 35, color: "bg-emerald-500" },
        { name: "Tirunelveli Zone", count: 11, percentage: 28, color: "bg-purple-500" }
    ];

    container.innerHTML = districtStats.map(d => `
        <div class="space-y-1.5">
            <div class="flex justify-between text-xs">
                <span class="font-medium text-slate-300">${d.name}</span>
                <span class="font-mono text-slate-400">${d.count} Alerts</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div class="${d.color} h-2 rounded-full transition-all duration-500" style="width: ${d.percentage}%"></div>
            </div>
        </div>
    `).join('');
}

/**
 * Modal to Add New Stolen Vehicle Record to Demo Database
 */
function initAddStolenModal() {
    const addBtn = document.getElementById('btn-open-add-stolen');
    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.id = 'add-stolen-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm';
        modal.innerHTML = `
            <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-100">
                <div class="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
                    <h3 class="font-bold text-lg text-white">Add Stolen Vehicle to Central Watchlist</h3>
                    <button class="text-slate-400 hover:text-white text-xl" onclick="document.getElementById('add-stolen-modal').remove()">&times;</button>
                </div>
                <form id="add-stolen-form" class="space-y-3 text-xs">
                    <div>
                        <label class="block text-slate-400 mb-1">Registration Number *</label>
                        <input type="text" id="add-veh-num" required placeholder="e.g. TN02XX9999" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono uppercase focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-slate-400 mb-1">Vehicle Type *</label>
                            <select id="add-veh-type" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white">
                                <option>Motorcycle</option>
                                <option>Scooter</option>
                                <option>Car / Sedan</option>
                                <option>SUV</option>
                                <option>Commercial / Auto</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">Make & Model *</label>
                            <input type="text" id="add-veh-make" required placeholder="e.g. Bajaj Pulsar 150" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-slate-400 mb-1">Color *</label>
                            <input type="text" id="add-veh-color" required placeholder="e.g. Crimson Red" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white">
                        </div>
                        <div>
                            <label class="block text-slate-400 mb-1">District *</label>
                            <select id="add-veh-district" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white">
                                <option>Chennai</option>
                                <option>Coimbatore</option>
                                <option>Madurai</option>
                                <option>Salem</option>
                                <option>Tiruchirappalli</option>
                                <option>Tirunelveli</option>
                                <option>Erode</option>
                                <option>Vellore</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-slate-400 mb-1">Police Station & FIR *</label>
                        <input type="text" id="add-veh-fir" required placeholder="e.g. FIR-2026-CHN-00998 (Anna Salai PS)" class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white">
                    </div>
                    <div class="flex justify-end space-x-3 pt-3">
                        <button type="button" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200" onclick="document.getElementById('add-stolen-modal').remove()">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-semibold">Save to Watchlist</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('add-stolen-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const num = normalizeVehicleNumber(document.getElementById('add-veh-num').value);
            const type = document.getElementById('add-veh-type').value;
            const make = document.getElementById('add-veh-make').value;
            const color = document.getElementById('add-veh-color').value;
            const district = document.getElementById('add-veh-district').value;
            const fir = document.getElementById('add-veh-fir').value;

            if (!validateVehicleNumber(num)) {
                showToast("Invalid registration format. Please enter a valid vehicle number.", "error");
                return;
            }

            const db = getStolenDatabase();
            db.unshift({
                vehicleNumber: num,
                vehicleType: type,
                make: make,
                model: "Model Spec",
                color: color,
                complaintNumber: fir,
                policeStation: `${district} Central Station`,
                district: district,
                complaintDate: new Date().toISOString().split('T')[0],
                status: "STOLEN",
                severity: "ACTIVE"
            });
            localStorage.setItem('vg_stolen_db', JSON.stringify(db));

            modal.remove();
            renderKPIs();
            renderStolenDbTable();
            showToast(`Vehicle ${num} added to Stolen Vehicle Watchlist!`, "success");
        });
    });
}

/**
 * Export Scans to CSV file
 */
function exportScansToCSV() {
    const history = getScanHistory();
    if (history.length === 0) {
        showToast("No scan records available to export.", "warning");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Scan ID,Vehicle Number,Timestamp,Result,Officer,Location,Details\n";

    history.forEach(row => {
        const line = `"${row.id}","${row.vehicleNumber}","${row.timestamp}","${row.result}","${row.officer || ''}","${row.location || ''}","${row.details || ''}"`;
        csvContent += line + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VehicleGuard_Scan_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Scan logs exported to CSV successfully.", "success");
}

/**
 * Clear Local History
 */
function handleClearHistory() {
    if (confirm("Are you sure you want to reset demo scan logs to initial defaults?")) {
        localStorage.setItem('vg_scan_history', JSON.stringify(INITIAL_SCAN_HISTORY));
        renderKPIs();
        renderScansTable('ALL');
        renderRecentAlertsFeed();
        showToast("Demo scan history has been reset.", "info");
    }
}
