/**
 * VehicleGuard AI - Police Command & Intelligence Dashboard
 * Handles dynamic KPI computation, live plate search, database filterable tables, and CSV exports.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

function initDashboard() {
    renderKPIs();
    renderRecentAlertsFeed();
    renderScansTable('ALL');
    renderStolenDbTable();
    renderComplaintsTable();
    renderDistrictAnalytics();
    initDashboardSearch();
    initFilterTabs();
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
    if (elPending) elPending.textContent = (24 + pendingVerifications).toLocaleString();
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
                <span class="text-xs font-mono text-slate-400 block">${item.timestamp.split(' ')[1] || item.timestamp}</span>
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
 * Filter Tabs in Dashboard
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
    tbody.innerHTML = db.map(item => `
        <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
            <td class="py-3 px-4 font-mono font-bold text-rose-400">${item.vehicleNumber}</td>
            <td class="py-3 px-4 text-xs text-slate-200">${item.make} ${item.model}</td>
            <td class="py-3 px-4 text-xs text-slate-400">${item.vehicleType}</td>
            <td class="py-3 px-4 font-mono text-xs text-slate-300">${item.complaintNumber}</td>
            <td class="py-3 px-4 text-xs text-slate-300">${item.policeStation} (${item.district || 'Chennai'})</td>
            <td class="py-3 px-4 text-xs text-slate-400">${item.complaintDate}</td>
            <td class="py-3 px-4 text-right">
                <button class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-xs text-slate-200" onclick='openDossierModal(${JSON.stringify(item)})'>
                    Dossier
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Render Complaints Table
 */
function renderComplaintsTable() {
    const tbody = document.getElementById('dash-complaints-tbody');
    if (!tbody) return;

    const complaints = getComplaints();
    tbody.innerHTML = complaints.map(item => `
        <tr class="border-b border-slate-700/40 hover:bg-slate-800/40 transition">
            <td class="py-3 px-4 font-mono font-bold text-blue-400">${item.referenceNumber}</td>
            <td class="py-3 px-4 font-mono font-semibold text-slate-200">${item.vehicleNumber}</td>
            <td class="py-3 px-4 text-xs text-slate-300">${item.ownerName}</td>
            <td class="py-3 px-4 text-xs text-slate-300">${item.district}</td>
            <td class="py-3 px-4 text-xs text-slate-400">${item.submissionDate || item.incidentDate}</td>
            <td class="py-3 px-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                    item.statusCode === 'REGISTERED' ? 'bg-rose-900/60 text-rose-300 border border-rose-500/50' : 'bg-amber-900/60 text-amber-300 border border-amber-500/50'
                }">
                    ${item.status}
                </span>
            </td>
        </tr>
    `).join('');
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
