/**
 * VehicleGuard AI - Comprehensive Bilingual Translation Module (English / தமிழ்)
 * Handles instant dynamic language switching between English and Tamil.
 * Preserves 100% of page structure, design, components, and layout.
 */

const translations = {
    en: {
        // Top Banner & Disclaimers
        demo_banner: "DEMO PROTOTYPE — NOT CONNECTED TO LIVE GOVERNMENT DATABASES (FOR DEMO & EVALUATION ONLY)",
        demo_sub_banner: "Simulated public safety environment prototype inspired by routine vehicle inspection protocols.",
        demo_warning_action: "⚠️ VERIFY WITH OFFICIAL POLICE RECORDS BEFORE TAKING ACTION",
        demo_footer_disclaimer: "DEMO PROTOTYPE — NOT CONNECTED TO LIVE GOVERNMENT SYSTEMS",
        demo_footer_sub: "This frontend prototype is created for technical demonstration and portfolio evaluation purposes only.",
        demo_copyright: "© 2026 VehicleGuard AI Prototype • Law Enforcement Tech Demo. All Rights Reserved.",
        demo_build: "Tactical Build: v2.5-TN-ANPR",
        demo_disclaimer_tag: "PUBLIC SAFETY COMPLAINT INTAKE",
        demo_intake_title: "DEMO INTAKE DISCLAIMER",
        demo_intake_desc: "This is a prototype request workflow and is not an official police complaint/FIR registration. Please follow official police procedures.",
        demo_creds_filled: "Demo credentials filled: DEMO001 / Demo@123",
        demo_invalid_creds: "Invalid credentials. Please use Officer ID: DEMO001 and Password: Demo@123",

        // Navigation & Brand
        brand_name: "VehicleGuard AI",
        brand_badge: "POLICE IT",
        brand_subtitle: "Stolen Vehicle Detection & ANPR Verification System",
        brand_subtitle_portal: "Stolen Vehicle Detection & ANPR Verification Portal",
        nav_home: "Home",
        nav_scan: "Vehicle Scan",
        nav_report: "Report Vehicle",
        nav_status: "Check Status",
        nav_dashboard: "Police Dashboard",
        nav_help: "Help & FAQ",
        nav_login: "Login",
        nav_logout: "Logout",
        btn_quick_scan: "⚡ QUICK SCAN",
        btn_scan_nav: "⚡ SCAN VEHICLE",
        lang_label: "Language / மொழி:",
        on_duty_badge: "ON DUTY",
        logout_from_portal: "Logout from Portal",

        // Hero & Scanner Primary Action (Index & Scan)
        scanner_action_tag: "PRIMARY ACTION • OPTICAL NUMBER PLATE VERIFICATION",
        scanner_title: "Instant Vehicle Scan & Stolen Status Check",
        scanner_subtitle: "Point camera at the number plate, upload a photo, or enter registration number to verify immediately against stolen records.",
        scanner_camera_title: "ANPR Optical Camera Feed",
        scanner_camera_subtitle: "Live Camera or Image Ingestion Scanner",
        ocr_confidence: "OCR Confidence: 98.6% (ANPR-Model-v4)",
        anpr_engine_online: "ANPR ENGINE: ONLINE (TN-ZONE)",
        camera_inactive_title: "Live Optical Scanner Inactive",
        camera_inactive_desc: "Click \"Start Camera\" to initialize live ANPR detection or upload a photo below.",
        btn_start_camera: "Start Camera",
        btn_stop_camera: "Stop Camera",
        btn_capture: "Capture Plate",
        btn_capture_full: "Capture Plate Image",
        drop_image_hint: "Drag & drop plate image here, or click to browse",
        drop_image_sub: "Supports JPEG, PNG, WEBP from mobile camera or gallery",
        anpr_preview_title: "ANPR Ingestion Preview",
        plate_extracted: "PLATE EXTRACTED",
        sample_plates_title: "Quick Demo Test Presets (Click to Test):",
        sample_shortcuts: "DEMO SHORTCUTS",
        sample_stolen_bike: "🔴 STOLEN BIKE",
        sample_stolen_scooter: "🔴 STOLEN SCOOTER",
        sample_clean: "🟢 CLEAN",
        sample_bike_desc: "Royal Enfield Classic — Chennai",
        sample_scooter_desc: "Honda Activa 6G — Mylapore",
        sample_clean1_desc: "Hero Splendor — Zero Active FIRs",
        sample_clean2_desc: "Honda City — Zero Active FIRs",

        // Manual OCR Input Console
        detected_plate_label: "Vehicle Registration Number",
        detected_plate_alt: "Demo OCR Input / Detected Registration Number",
        anpr_ready: "ANPR READY",
        normalized_tag: "NORMALIZED",
        plate_placeholder: "e.g. TN 09 AB 1234",
        scanner_helper: "Supports all standard Indian formats (e.g. TN09AB1234, TN01CD5678, TN22EF4321, BH series). Auto uppercase & spacing normalization applied.",
        btn_confirm_check: "CHECK VEHICLE STATUS",

        // Dynamic Scan Results
        searching_db_title: "Searching Stolen Vehicle Database...",
        searching_db_desc: "Querying simulated police FIR repository hash & active alerts.",
        immediate_action_req: "IMMEDIATE POLICE ACTION REQUIRED",
        result_stolen_title: "🔴 YES — STOLEN VEHICLE REPORT FOUND",
        result_stolen_subtitle: "ACTIVE THEFT COMPLAINT ON FILE",
        checkpoint_clearance: "CHECKPOINT CLEARANCE",
        result_clean_title: "🟢 NO — NO STOLEN REPORT FOUND",
        result_clean_subtitle: "ZERO ACTIVE THEFT RECORDS IN REPOSITORY",
        result_clean_desc: "No matching stolen-vehicle record was found in the connected demo database. This query does not guarantee ownership or insurance validity. Continue standard physical documentation checks.",
        clean_sop_reminder: "⚠️ Standard SOP Reminder: This verification indicates no theft report is filed. Perform standard physical documentation checks as mandated.",
        recheck_needed: "RE-CHECK NEEDED",
        result_verify_title: "🟡 VERIFICATION REQUIRED",
        result_verify_subtitle: "UNREADABLE OR INCOMPLETE NUMBER PLATE",
        result_verify_desc: "Unable to read the number plate clearly due to blur, angle, or occlusion. Please capture another image or enter the registration number manually.",
        
        // Dossier Field Labels
        lbl_reg_no: "Registration No:",
        lbl_make_model: "Make & Model:",
        lbl_veh_type: "Vehicle Type:",
        lbl_color: "Color:",
        lbl_fir_complaint: "FIR / Complaint Ref:",
        lbl_police_station: "Police Station:",
        lbl_theft_date: "Complaint Date:",
        lbl_district: "District / City:",
        lbl_theft_location: "Theft Location:",
        lbl_owner: "Complainant Name:",
        lbl_engine_no: "Engine / Chassis Hash:",
        lbl_dispatch_note: "Control Room Dispatch Note:",
        lbl_scanned_reg: "Scanned Registration:",
        lbl_verification_ts: "Verification Timestamp:",
        lbl_watchlist_status: "Watchlist Status:",
        lbl_clean_status: "Clean (No Active Complaints)",

        // Result Action Buttons
        btn_view_fir: "View FIR Dossier",
        btn_notify_sup: "Notify Control Room",
        btn_notify_supervisor_alt: "Notify Supervisor",
        btn_print_report: "Print Verification",
        btn_new_scan: "⚡ New Scan",
        btn_scan_another: "Scan Another Vehicle",
        btn_try_again: "🔄 Try Again",
        btn_enter_manual: "⌨️ Enter Manually",
        btn_close: "Close",
        btn_close_dossier: "Close Dossier",
        btn_print_dossier: "🖨️ Print Dossier",

        // Recent Terminal Scans Audit Trail
        tab_recent_scans: "Recent Terminal Field Scans",
        recent_scans_sub: "Local audit log of license plates verified at this terminal",
        btn_refresh_log: "🔄 Refresh Log",
        btn_refresh: "🔄 Refresh",
        th_veh_num: "Vehicle Number",
        th_veh_reg: "Vehicle Registration",
        th_timestamp: "Timestamp",
        th_verdict: "Verdict",
        th_result_verdict: "Result Verdict",
        th_checkpoint_loc: "Checkpoint Location",
        th_details: "Details",
        th_duty_officer: "Duty Officer",
        th_details_fir: "Details / FIR Reference",
        verdict_stolen: "🔴 STOLEN",
        verdict_clean: "🟢 NO MATCH",
        no_recent_scans: "No recent scans recorded.",

        // SOP Workflow Section (Index)
        sop_badge: "STANDARD OPERATING PROCEDURE",
        workflow_title: "Checkpoint Verification Workflow",
        workflow_sub: "Field protocol for police officers during routine checkpoint inspections.",
        step_1_title: "1. Vehicle Checkpoint",
        step_1_desc: "Target incoming vehicle at routine junction or patrol checkpost.",
        step_2_title: "2. Camera ANPR Scan",
        step_2_desc: "Capture plate image via terminal camera or enter number directly.",
        step_3_title: "3. Stolen DB Hash Query",
        step_3_desc: "Instant search against stolen vehicle FIRs and missing registries.",
        step_4_title: "4. Immediate Verdict",
        step_4_desc: "Instant RED (Stolen Alert) or GREEN (Clear) response with SOP directives.",

        // Quick Access Cards
        card_report_title: "Report Stolen Vehicle",
        card_report_desc: "Citizens can submit stolen vehicle reports for police verification.",
        card_track_title: "Track Complaint Status",
        card_track_desc: "Check real-time status of your submitted stolen vehicle reference.",
        card_dash_title: "Police Intelligence Dashboard",
        card_dash_desc: "District analytics, FIR repository management, and scan logs.",

        // Report Stolen Vehicle Page
        report_title: "Report a Missing or Stolen Vehicle",
        report_subtitle: "Public safety citizen submission portal for lost, snatched, or stolen vehicles.",
        sec_1_title: "1. Complainant & Contact Information",
        sec_2_title: "2. Vehicle Identification & Specifications",
        sec_3_title: "3. Incident Location & Timing",
        sec_4_title: "4. Supporting Documents & Photos",
        form_owner_name: "Owner / Complainant Full Name *",
        form_mobile: "Contact Mobile Number *",
        form_email: "Email Address (Optional)",
        form_reg_number: "Vehicle Registration Number *",
        form_veh_type: "Vehicle Category *",
        form_make: "Vehicle Make / Brand *",
        form_model: "Model Name / Year",
        form_color: "Primary Color",
        form_incident_date: "Date of Incident *",
        form_incident_time: "Approximate Time",
        form_district: "District (Tamil Nadu) *",
        form_police_station: "Jurisdiction Police Station",
        form_location: "Incident Location / Landmark *",
        form_description: "Incident Description & Special Identification Marks",
        form_upload_rc: "Upload RC / Insurance Copy (PDF/JPG)",
        form_upload_vehicle_photo: "Upload Vehicle Photo (Optional)",
        btn_submit_complaint: "Submit Complaint Request",
        opt_select_district: "-- Select District --",
        opt_motorcycle: "Motorcycle / Two Wheeler",
        opt_scooter: "Scooter (e.g. Activa / Jupiter)",
        opt_car: "Car / Sedan / Hatchback",
        opt_suv: "SUV / MUV / Jeep",
        opt_commercial: "Auto Rickshaw / Commercial",
        opt_heavy: "Truck / Bus / Heavy",

        // Report Receipt Modal
        receipt_title: "Complaint Request Submitted",
        receipt_ref_label: "Your Complaint Reference Number",
        receipt_ref_hint: "Save this reference number to track complaint processing status.",
        receipt_notice: "⚠️ IMPORTANT NOTICE: This is a prototype submission workflow and does not constitute a legal police FIR. Please submit signed physical documents and identity proofs at your local police station for formal FIR registration.",
        btn_track_status_receipt: "Track Complaint Status →",
        btn_print_receipt: "🖨️ Print Receipt",

        // Status Check Page
        status_tag: "PUBLIC REFERENCE TRACKING",
        status_title: "Check Stolen Vehicle Complaint Status",
        status_subtitle: "Enter your reference number or vehicle registration number to track complaint processing.",
        status_input_label: "Reference Number / Vehicle Number",
        btn_check_status: "Check Status",
        status_samples_label: "Quick Demo Samples (Click to Search):",
        status_no_record_title: "No Record Found",
        status_no_record: "No matching record found. Please verify your reference number or register a new complaint.",
        btn_submit_new_complaint: "Submit New Complaint Request →",
        complaint_reference_tag: "COMPLAINT REFERENCE",
        status_badge_registered: "Registered — Demo Status",
        fir_registered_tag: "OFFICIAL POLICE FIR REGISTERED",
        fir_cctns_tag: "CCTNS LOGGED",
        fir_approved_by_si: "Approved by Sub-Inspector of Police",
        fir_active_on_checkpoints: "Active on All Regional ANPR Checkpoints",
        step_submitted: "Submitted",
        step_verification: "Verification",
        step_under_review: "Under Review",
        step_fir_watchlist: "FIR / Watchlist",
        lbl_incident_log_date: "Incident / Log Date",
        lbl_veh_specification: "Vehicle Specification",
        lbl_jurisdiction_station: "Jurisdiction Police Station",
        lbl_officer_remarks: "Officer Case Remarks & Status Summary",
        citizen_advisory_text: "⚡ Citizen Advisory: For formal FIR certified copies or insurance claims endorsement, please present your original RC book and ID at your assigned jurisdiction police station.",
        btn_print_status: "🖨️ Print Status Record",
        btn_open_scanner: "Open Scanner →",

        // Police Dashboard Page
        dash_title: "Police Command & Intelligence Dashboard",
        dash_subtitle: "Real-time ANPR scan metrics, stolen vehicle hits, and citizen submission scrutiny.",
        btn_add_stolen: "+ Add Stolen Vehicle Record",
        btn_launch_scanner: "⚡ Launch Field Scanner",
        kpi_total_scans: "Total Field Scans",
        kpi_stolen_hits: "Stolen Matches",
        kpi_clean_scans: "Clean Scans",
        kpi_pending: "Pending Verification",
        kpi_firs: "Active Stolen Database",
        kpi_live_synced: "LIVE SYNCED",
        kpi_high_priority: "HIGH PRIORITY",
        kpi_verified_clear: "VERIFIED CLEAR",
        kpi_in_scrutiny: "IN SCRUTINY",
        kpi_tn_zonal: "TN ZONAL REGISTRY",
        dash_direct_lookup: "Direct Stolen Vehicle Lookup",
        dash_instant_match: "INSTANT MATCH",
        dash_search_placeholder: "Enter Registration (e.g. TN09AB1234)",
        btn_search: "Search",
        dash_lookup_desc: "Instant lookup opens full FIR crime dossier, owner contact, and reporting station records.",
        dash_recent_alerts: "Recent Stolen Hits (Field Checkpoints)",
        dash_auto_logged: "AUTO-LOGGED",
        tab_all_scans: "All Scans",
        tab_stolen_hits: "🔴 Stolen Hits",
        tab_clean_scans: "🟢 Clean Scans",
        btn_export_csv: "Export CSV",
        btn_clear_history: "Clear Logs",
        tab_stolen_db: "Active Stolen Vehicle Watchlist (Demo Database)",
        cctns_registry_hash: "CCTNS CENTRAL REGISTRY HASH",
        th_type: "Type",
        th_fir_no: "FIR Number",
        th_ps_district: "Police Station (District)",
        th_theft_date: "Theft Date",
        th_action: "Action",
        btn_dossier: "Dossier",
        tab_complaints: "Citizen Complaints & User Submissions Feed",
        complaints_sub: "Review citizen vehicle theft reports, verify documents, and approve formal FIR registration.",
        filter_all_complaints: "All Submissions",
        filter_pending_approval: "🟡 Pending Approval",
        filter_under_review: "🔵 Under Review",
        filter_approved_fir: "🔴 FIR Approved",
        filter_rejected: "⚪ Rejected",
        th_ref_no: "Reference No",
        th_complainant: "Complainant",
        th_district: "District",
        th_sub_date: "Submission Date",
        th_scrutiny_status: "Scrutiny Status",
        th_officer_action: "Officer Action",
        btn_scrutiny_approval: "Scrutiny & Approval",
        tab_district_analytics: "District Crime Distribution & Checkpoint Activity (Demo Data)",

        // Scrutiny Modal
        scrutiny_modal_tag: "CITIZEN THEFT SUBMISSION SCRUTINY",
        duty_officer_label: "Duty Scrutiny Officer",
        station_label: "Station:",
        current_verdict_label: "Current Scrutiny Verdict",
        assessment_remarks_label: "Officer Scrutiny Assessment & Action Remarks:",
        btn_approve_issue_fir: "Approve & Issue Formal FIR",
        btn_mark_under_review: "🔍 Mark Under Review",
        btn_reject: "❌ Reject",

        // Add Stolen Modal
        add_stolen_title: "Add Stolen Vehicle to Central Watchlist",
        btn_save_watchlist: "Save to Watchlist",
        btn_cancel: "Cancel",

        // Help & FAQ Page
        help_tag: "LAW ENFORCEMENT SOP & HELP GUIDE",
        help_title: "Officer Field Guide & FAQs",
        help_subtitle: "Standard operating procedures, number plate validation formats, and scanning troubleshooting.",
        help_sec1_title: "Standard Vehicle Scanning Procedure (SOP)",
        help_s1_t: "1. Open Vehicle Scanner",
        help_s1_d: "Navigate to the Vehicle Scan page on your mobile browser or terminal.",
        help_s2_t: "2. Start Camera or Upload Image",
        help_s2_d: "Grant camera access to align the number plate or upload a photo from storage.",
        help_s3_t: "3. Capture Number Plate",
        help_s3_d: "Hold steady and tap \"Capture Plate Image\" when the plate is centered in the HUD.",
        help_s4_t: "4. Confirm Detected Number",
        help_s4_d: "Verify the OCR recognized registration characters in the input field.",
        help_s5_t: "5. Select Check Vehicle Status",
        help_s5_d: "Trigger sub-second database cross-referencing against active theft registers.",
        help_s6_t: "6. Review Result Banner",
        help_s6_d: "Immediately inspect whether the screen turns RED (Stolen), GREEN (Clean), or YELLOW (Verification Required).",
        help_s7_t: "7. Follow Official Police Protocols",
        help_s7_d: "Verify physical vehicle details (Chassis / Engine number) and coordinate with the Division Control Room before enforcement.",
        
        help_sec2_title: "Understanding Result Classifications",
        help_res_stolen_t: "YES — STOLEN VEHICLE REPORT FOUND",
        help_res_stolen_d: "An active FIR or stolen vehicle complaint matches this registration number in the central database. The officer should click \"Notify Supervisor\" and open the complete crime dossier to compare vehicle make, color, and owner details.",
        help_res_clean_t: "NO — NO STOLEN VEHICLE REPORT FOUND",
        help_res_clean_d: "No active theft record was found in the demo repository. Notice: This clearance does not guarantee vehicle ownership or insurance validity. Continue standard physical document checks.",
        help_res_verify_t: "VERIFICATION REQUIRED",
        help_res_verify_d: "The optical image was blurry, skewed, occluded, or contained an invalid format. Capture a new image under better lighting or type the registration number manually into the confirmation box.",

        help_sec3_title: "Indian Vehicle Registration Plate Format Reference",
        help_fmt_intro: "VehicleGuard AI normalizes and supports common Indian registration structures:",
        help_fmt_std_title: "Standard State Format: [SS][DD][LL][NNNN]",
        help_fmt_std_eg: "Example: TN 09 AB 1234",
        help_fmt_std_li1: "TN: State code (Tamil Nadu)",
        help_fmt_std_li2: "09: RTO district code (e.g. Chennai West)",
        help_fmt_std_li3: "AB: Series alphabet combination",
        help_fmt_std_li4: "1234: 4-digit unique vehicle number",
        help_fmt_bh_title: "Bharat (BH) Series: [YY]BH[NNNN][LL]",
        help_fmt_bh_eg: "Example: 22 BH 1234 AB",
        help_fmt_bh_li1: "22: Year of registration",
        help_fmt_bh_li2: "BH: Bharat code",
        help_fmt_bh_li3: "1234: 4-digit unique registration number",
        help_fmt_bh_li4: "AB: Series identification",

        help_sec4_title: "Frequently Asked Questions",
        help_faq_q1: "Is this connected to the live CCTNS or Parivahan database?",
        help_faq_a1: "No. This system is a frontend technological prototype and demonstration platform. All vehicle records, complaints, and police station entries are simulated.",
        help_faq_q2: "What should an officer do when a STOLEN alert is triggered?",
        help_faq_a2: "Immediately note the physical details of the driver and vehicle, inspect the chassis number stamped on the vehicle frame, notify the Division Control Room, and verify official CCTNS records before detaining.",
        help_faq_q3: "How does the camera OCR work on low-end mobile devices?",
        help_faq_a3: "The frontend uses standard HTML5 media streams and client-side bounding box preview, followed by normalized text ingestion for rapid, lightweight processing.",
        help_faq_q4: "Can I switch between Dark Mode and Light Mode?",
        help_faq_a4: "Yes! Tap the Moon 🌙 / Sun ☀️ icon in the navigation bar to toggle between the tactical Police IT Dark Mode and administrative Light Mode.",

        // Login Page
        login_title: "VehicleGuard Police IT Portal",
        login_subtitle: "Authorized Law Enforcement Checkpoint Access",
        login_badge_notice: "RESTRICTED ACCESS — DEMO SIMULATION",
        login_demo_hint: "Demonstration credentials provided below for system assessment.",
        form_officer_id: "Officer Identification Code (PIN/ID)",
        form_password: "Secure Access Password",
        btn_autofill_demo: "⚡ Auto-Fill Demo Credentials (DEMO001 / Demo@123)",
        btn_login: "Access Command Portal →",
        login_demo_creds: "Demo Credentials: Officer ID: DEMO001 | Password: Demo@123",
        login_footer_desc: "Secure checkpoint authentication prototype for VehicleGuard AI.",

        // Footer links
        footer_privacy: "Privacy Framework",
        footer_security: "Security Protocol",
        footer_sop: "Officer SOP & FAQ",
        footer_officer_login: "Officer Login",

        // Theme
        theme_dark: "Dark Mode",
        theme_light: "Light Mode",

        // Common Toasts
        toast_lang_en: "Switched to English",
        toast_lang_ta: "தமிழ் மொழிக்கு மாற்றப்பட்டது",
        toast_logged_out: "Logged out successfully.",
        toast_login_success: "Login Successful! Redirecting to Police Command Dashboard...",
        toast_fill_all: "Please fill in all mandatory fields.",
        toast_invalid_veh: "Invalid vehicle registration format. Example: TN09AB1234"
    },

    ta: {
        // Top Banner & Disclaimers
        demo_banner: "மாதிரி முன்மாதிரி — நேரலை அரசு தரவுத்தளத்துடன் இணைக்கப்படவில்லை (செயல்முறை விளக்கத்திற்கு மட்டுமே)",
        demo_sub_banner: "வாகன சோதனை நடைமுறைகளை அடிப்படையாகக் கொண்ட மாதிரி தளம்.",
        demo_warning_action: "⚠️ அதிகாரப்பூர்வ காவல் ஆவணங்களுடன் சரிபார்த்த பிறகே நடவடிக்கை எடுக்கவும்",
        demo_footer_disclaimer: "மாதிரி முன்மாதிரி — நேரடி அரசு அமைப்புடன் இணைக்கப்படவில்லை",
        demo_footer_sub: "இது ஒரு மாதிரி தொழில்நுட்ப வடிவம் மட்டுமே. பொதுமக்களின் உண்மைத் தகவல்கள் எதுவும் இதில் இல்லை.",
        demo_copyright: "© 2026 வெஹிக்கிள் கார்டு AI மாதிரி தளம் • அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        demo_build: "காவல்துறை கட்டமைப்பு: v2.5-TN-ANPR",
        demo_disclaimer_tag: "பொதுமக்கள் வாகன புகார் மையம்",
        demo_intake_title: "மாதிரி விண்ணப்ப அறிவிப்பு",
        demo_intake_desc: "இது ஒரு மாதிரி விண்ணப்ப முறை மட்டுமே. சட்டப்பூர்வ காவல் புகார்/FIR பதிவுக்கு உங்கள் பகுதி காவல் நிலையத்தை அணுகவும்.",
        demo_creds_filled: "மாதிரி விவரங்கள் நிரப்பப்பட்டது: DEMO001 / Demo@123",
        demo_invalid_creds: "தவறான விவரங்கள். காவலர் எண்: DEMO001, கடவுச்சொல்: Demo@123 ஐப் பயன்படுத்தவும்.",

        // Navigation & Brand (Compact & Concise to fit perfectly without layout shift)
        brand_name: "வெஹிக்கிள் கார்டு AI",
        brand_badge: "காவல்துறை IT",
        brand_subtitle: "திருடப்பட்ட வாகன கண்டறிதல் & ANPR சரிபார்ப்பு அமைப்பு",
        brand_subtitle_portal: "திருடப்பட்ட வாகன கண்டறிதல் & ANPR சரிபார்ப்பு தளம்",
        nav_home: "முகப்பு",
        nav_scan: "வாகன ஸ்கேன்",
        nav_report: "புகார் பதிவு",
        nav_status: "நிலை அறிதல்",
        nav_dashboard: "கட்டுப்பாட்டகம்",
        nav_help: "உதவி & கேள்விகள்",
        nav_login: "உள்நுழைவு",
        nav_logout: "வெளியேறு",
        btn_quick_scan: "⚡ விரைவு ஸ்கேன்",
        btn_scan_nav: "⚡ வாகன ஸ்கேன்",
        lang_label: "மொழி / Language:",
        on_duty_badge: "பணியில் உள்ளார்",
        logout_from_portal: "வெளியேறு",

        // Hero & Scanner Primary Action (Index & Scan)
        scanner_action_tag: "முக்கிய செயல்பாடு • நம்பர் பிளேட் சரிபார்ப்பு",
        scanner_title: "உடனடி வாகன ஸ்கேன் & திருட்டு நிலை அறிதல்",
        scanner_subtitle: "நம்பர் பிளேட்டின் மீது கேமராவை வைக்கவும், படத்தைப் பதிவேற்றவும் அல்லது வாகன எண்ணை உள்ளிட்டு உடனடியாக சரிபார்க்கவும்.",
        scanner_camera_title: "ANPR ஆப்டிகல் கேமரா நேரலை",
        scanner_camera_subtitle: "நேரடி கேமரா அல்லது பட ஸ்கேனர்",
        ocr_confidence: "OCR துல்லியம்: 98.6% (ANPR-Model-v4)",
        anpr_engine_online: "ANPR இயங்குதளம்: நேரலையில் உள்ளது (TN-ZONE)",
        camera_inactive_title: "நேரடி கேமரா ஸ்கேனர் இயக்கப்படவில்லை",
        camera_inactive_desc: "நேரடி ANPR சோதனையைத் தொடங்க \"கேமராவைத் தொடங்கு\" பொத்தானை அழுத்தவும் அல்லது புகைப்படத்தைப் பதிவேற்றவும்.",
        btn_start_camera: "கேமராவைத் தொடங்கு",
        btn_stop_camera: "கேமராவை நிறுத்து",
        btn_capture: "படம்பிடி",
        btn_capture_full: "நம்பர் பிளேட்டைப் படம்பிடி",
        drop_image_hint: "நம்பர் பிளேட் படத்தை இங்கே இழுத்துப் போடவும் அல்லது கிளிக் செய்யவும்",
        drop_image_sub: "கேமரா அல்லது கேலரியில் இருந்து JPEG, PNG, WEBP வடிவங்களை ஆதரிக்கிறது",
        anpr_preview_title: "ANPR படம் வாசிப்பு முன்னோட்டம்",
        plate_extracted: "நம்பர் பிளேட் வாசிக்கப்பட்டது",
        sample_plates_title: "விரைவு மாதிரி சோதனைகள் (கிளிக் செய்து சோதிக்கவும்):",
        sample_shortcuts: "மாதிரி தேடல்கள்",
        sample_stolen_bike: "🔴 திருடப்பட்ட பைக்",
        sample_stolen_scooter: "🔴 திருடப்பட்ட ஸ்கூட்டர்",
        sample_clean: "🟢 பாதுகாப்பானது",
        sample_bike_desc: "ராயல் என்பீல்ட் கிளாசிக் — சென்னை",
        sample_scooter_desc: "ஹோண்டா ஆக்டிவா 6G — மயிலாப்பூர்",
        sample_clean1_desc: "ஹீரோ ஸ்ப்ளெண்டர் — வழக்கு இல்லை",
        sample_clean2_desc: "ஹோண்டா சிட்டி — வழக்கு இல்லை",

        // Manual OCR Input Console
        detected_plate_label: "வாகன பதிவு எண்",
        detected_plate_alt: "கண்டறியப்பட்ட பதிவு எண்",
        anpr_ready: "ANPR தயார்",
        normalized_tag: "சீரமைக்கப்பட்டது",
        plate_placeholder: "எ.கா: TN 09 AB 1234",
        scanner_helper: "அனைத்து இந்திய பதிவு எண் வடிவங்களையும் ஆதரிக்கிறது (TN09AB1234, TN01CD5678, TN22EF4321, BH தொடர்). தானாக எழுத்துக்கள் சீரமைக்கப்படும்.",
        btn_confirm_check: "வாகன நிலையைச் சரிபார்",

        // Dynamic Scan Results
        searching_db_title: "திருடப்பட்ட வாகன தரவுத்தளத்தில் தேடுகிறது...",
        searching_db_desc: "காவல்துறை மாதிரி FIR மற்றும் நிலுவை வழக்குகளுடன் ஒப்பிடப்படுகிறது.",
        immediate_action_req: "உடனடி காவல் நடவடிக்கை தேவை",
        result_stolen_title: "🔴 ஆம் — திருடப்பட்ட வாகனம்",
        result_stolen_subtitle: "நிலுவையில் உள்ள திருட்டு வழக்கு கண்டறியப்பட்டது",
        checkpoint_clearance: "சோதனைச் சாவடி அனுமதி",
        result_clean_title: "🟢 இல்லை — திருட்டு வழக்கு இல்லை",
        result_clean_subtitle: "மாதிரி தரவுத்தளத்தில் வழக்கு எதுவும் இல்லை",
        result_clean_desc: "மாதிரி தரவுத்தளத்தில் இந்த வாகனத்திற்கான திருட்டு புகார் எதுவும் இல்லை. எனினும் அதிகாரப்பூர்வ ஆவணங்களை நேரடியாக சரிபார்க்கவும்.",
        clean_sop_reminder: "⚠️ நிலையான இயக்க நடைமுறை: இந்த வாகனத்திற்கு திருட்டு புகார் இல்லை. எனினும் வாகன ஆவணங்களை நேரடியாக சரிபார்க்கவும்.",
        recheck_needed: "கூடுதல் சரிபார்ப்பு தேவை",
        result_verify_title: "🟡 கூடுதல் சரிபார்ப்பு தேவை",
        result_verify_subtitle: "நம்பர் பிளேட்டை தெளிவாக வாசிக்க இயலவில்லை",
        result_verify_desc: "புகைப்படத்தில் நம்பர் பிளேட் தெளிவாக இல்லை. மீண்டும் படம் பிடிக்கவும் அல்லது பதிவு எண்ணை நேரடியாக உள்ளிடவும்.",

        // Dossier Field Labels
        lbl_reg_no: "பதிவு எண்:",
        lbl_make_model: "தயாரிப்பு & மாடல்:",
        lbl_veh_type: "வாகன வகை:",
        lbl_color: "வண்ணம்:",
        lbl_fir_complaint: "FIR / புகார் எண்:",
        lbl_police_station: "காவல் நிலையம்:",
        lbl_theft_date: "திருடப்பட்ட தேதி:",
        lbl_district: "மாவட்டம் / நகரம்:",
        lbl_theft_location: "சம்பவம் நடந்த இடம்:",
        lbl_owner: "புகார்தாரர் / உரிமையாளர்:",
        lbl_engine_no: "எஞ்சின் / சேஸிஸ் எண்:",
        lbl_dispatch_note: "கட்டுப்பாட்டு அறை தகவல் குறிப்பு:",
        lbl_scanned_reg: "ஸ்கேன் செய்யப்பட்ட பதிவு எண்:",
        lbl_verification_ts: "சரிபார்க்கப்பட்ட நேரம்:",
        lbl_watchlist_status: "கண்காணிப்பு நிலை:",
        lbl_clean_status: "பாதுகாப்பானது (புகார்கள் இல்லை)",

        // Result Action Buttons
        btn_view_fir: "முழு FIR ஆவணத்தைப் பார்",
        btn_notify_sup: "கட்டுப்பாட்டு அறைக்கு தகவல் அனுப்பு",
        btn_notify_supervisor_alt: "மேலதிகாரிக்கு தகவல் அனுப்பு",
        btn_print_report: "அறிக்கையை அச்சிடு",
        btn_new_scan: "⚡ புதிய ஸ்கேன்",
        btn_scan_another: "மற்றொரு வாகனத்தை ஸ்கேன் செய்",
        btn_try_again: "🔄 மீண்டும் முயற்சி செய்",
        btn_enter_manual: "⌨️ கைமுறையாக உள்ளிடு",
        btn_close: "மூடு",
        btn_close_dossier: "ஆவணத்தை மூடு",
        btn_print_dossier: "🖨️ ஆவணத்தை அச்சிடு",

        // Recent Terminal Scans Audit Trail
        tab_recent_scans: "சமீபத்திய கள ஸ்கேன் பதிவுகள்",
        recent_scans_sub: "இந்த முனையத்தில் சரிபார்க்கப்பட்ட பதிவு எண்களின் உள்ளூர் தணிக்கை பதிவு",
        btn_refresh_log: "🔄 புதுப்பி",
        btn_refresh: "🔄 புதுப்பி",
        th_veh_num: "வாகன எண்",
        th_veh_reg: "வாகன பதிவு எண்",
        th_timestamp: "நேரம் / தேதி",
        th_verdict: "முடிவு",
        th_result_verdict: "சோதனை முடிவு",
        th_checkpoint_loc: "சோதனைச் சாவடி இடம்",
        th_details: "விவரங்கள்",
        th_duty_officer: "பணி காவலர்",
        th_details_fir: "விவரங்கள் / FIR குறிப்பு",
        verdict_stolen: "🔴 திருடப்பட்டது",
        verdict_clean: "🟢 வழக்கு இல்லை",
        no_recent_scans: "சமீபத்திய ஸ்கேன் பதிவுகள் எதுவும் இல்லை.",

        // SOP Workflow Section (Index)
        sop_badge: "நிலையான இயக்க நடைமுறை (SOP)",
        workflow_title: "சோதனைச் சாவடி சரிபார்ப்பு செயல்முறை",
        workflow_sub: "வழக்கமான வாகன சோதனையின் போது காவல்துறை அதிகாரிகள் பின்பற்ற வேண்டிய நெறிமுறைகள்.",
        step_1_title: "1. வாகன சோதனைச் சாவடி",
        step_1_desc: "சோதனைச் சாவடியில் வரும் வாகனத்தை நிறுத்துதல்.",
        step_2_title: "2. கேமரா ANPR ஸ்கேன்",
        step_2_desc: "மொபைல் கேமரா மூலம் நம்பர் பிளேட்டைப் படம் பிடித்தல் அல்லது எண்ணை உள்ளிடுதல்.",
        step_3_title: "3. திருட்டு தரவுத்தள சரிபார்ப்பு",
        step_3_desc: "திருடப்பட்ட வாகன FIR மற்றும் புகார்களுடன் சில நொடிகளில் ஒப்பிடுதல்.",
        step_4_title: "4. உடனடி முடிவு",
        step_4_desc: "சிவப்பு (திருடப்பட்டது) அல்லது பச்சை (பாதுகாப்பானது) உடனடி எச்சரிக்கை மற்றும் வழிகாட்டல்.",

        // Quick Access Cards
        card_report_title: "திருடப்பட்ட வாகனத்தைப் பதிவு செய்",
        card_report_desc: "பொதுமக்கள் தங்கள் திருடப்பட்ட வாகன விவரங்களை காவல்துறை சரிபார்ப்பிற்கு சமர்ப்பிக்கலாம்.",
        card_track_title: "புகார் நிலையை அறிந்திடு",
        card_track_desc: "சமர்ப்பிக்கப்பட்ட வாகன புகாரின் தற்போதைய நிலையை நிகழ்நேரத்தில் தெரிந்துகொள்ளலாம்.",
        card_dash_title: "காவல்துறை கட்டுப்பாட்டகம்",
        card_dash_desc: "மாவட்ட வாரியான புள்ளிவிவரங்கள், FIR பதிவுகள் மற்றும் கள ஸ்கேன் பதிவுகள்.",

        // Report Stolen Vehicle Page
        report_title: "திருடப்பட்ட அல்லது காணாமல் போன வாகனத்தைப் பதிவு செய்தல்",
        report_subtitle: "பொதுமக்கள் காணாமல் போன அல்லது திருடப்பட்ட வாகன புகாரை சமர்ப்பிக்கும் தளம்.",
        sec_1_title: "1. புகார்தாரர் & தொடர்பு விவரங்கள்",
        sec_2_title: "2. வாகன அடையாளம் & விபரங்கள்",
        sec_3_title: "3. சம்பவம் நடந்த இடம் & நேரம்",
        sec_4_title: "4. துணை ஆவணங்கள் & புகைப்படங்கள்",
        form_owner_name: "உரிமையாளர் / புகார்தாரர் பெயர் *",
        form_mobile: "தொடர்பு கைபேசி எண் *",
        form_email: "மின்னஞ்சல் முகவரி (விருப்பத்தேர்வு)",
        form_reg_number: "வாகன பதிவு எண் *",
        form_veh_type: "வாகனப் பிரிவு *",
        form_make: "வாகன தயாரிப்பு நிறுவனம் *",
        form_model: "மாடல் / ஆண்டு",
        form_color: "முக்கிய வண்ணம்",
        form_incident_date: "சம்பவம் நடந்த தேதி *",
        form_incident_time: "தோராயமான நேரம்",
        form_district: "மாவட்டம் (தமிழ்நாடு) *",
        form_police_station: "காவல் நிலையம்",
        form_location: "சம்பவம் நடந்த இடம் / அடையாளம் *",
        form_description: "சம்பவ விவரம் & சிறப்பு அடையாளக் குறிகள்",
        form_upload_rc: "RC / காப்பீட்டு நகல் பதிவேற்றவும் (PDF/JPG)",
        form_upload_vehicle_photo: "வாகனப் புகைப்படம் பதிவேற்றவும் (விருப்பத்தேர்வு)",
        btn_submit_complaint: "புகார் விண்ணப்பத்தைச் சமர்ப்பி",
        opt_select_district: "-- மாவட்டத்தைத் தேர்ந்தெடுக்கவும் --",
        opt_motorcycle: "இருசக்கர வாகனம் (Motorcycle)",
        opt_scooter: "ஸ்கூட்டர் (Activa / Jupiter)",
        opt_car: "கார் / செடான் / ஹேட்ச்பேக்",
        opt_suv: "SUV / ஜீப்",
        opt_commercial: "ஆட்டோ ரிக்‌ஷா / வணிக வாகனம்",
        opt_heavy: "லாரி / பேருந்து / கனரக வாகனம்",

        // Report Receipt Modal
        receipt_title: "புகார் விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
        receipt_ref_label: "உங்கள் புகார் குறிப்பு எண்",
        receipt_ref_hint: "புகாரின் நிலையை அறிய இந்த குறிப்பு எண்ணைப் பாதுகாப்பாக வைக்கவும்.",
        receipt_notice: "⚠️ முக்கிய அறிவிப்பு: இது ஒரு மாதிரி விண்ணப்பம் மட்டுமே. சட்டப்பூர்வ FIR பதிவிற்கு கையொப்பமிட்ட ஆவணங்களுடன் உங்கள் பகுதி காவல் நிலையத்தை அணுகவும்.",
        btn_track_status_receipt: "புகார் நிலையை அறிந்திடு →",
        btn_print_receipt: "🖨️ ரசீதை அச்சிடு",

        // Status Check Page
        status_tag: "பொதுமக்கள் புகார் கண்காணிப்பு",
        status_title: "வாகன புகார் நிலையை அறிதல்",
        status_subtitle: "உங்கள் குறிப்பு எண் அல்லது வாகன எண்ணை உள்ளிட்டு புகார் நிலையை நிகழ்நேரத்தில் அறியவும்.",
        status_input_label: "குறிப்பு எண் / வாகன பதிவு எண்",
        btn_check_status: "நிலையைச் சரிபார்",
        status_samples_label: "மாதிரி தேடல்கள் (கிளிக் செய்து தேடவும்):",
        status_no_record_title: "எந்த ஆவணமும் கிடைக்கவில்லை",
        status_no_record: "எந்த ஆவணமும் கிடைக்கவில்லை. குறிப்பு எண் அல்லது பதிவு எண்ணைச் சரிபார்க்கவும்.",
        btn_submit_new_complaint: "புதிய புகார் சமர்ப்பிக்க →",
        complaint_reference_tag: "புகார் குறிப்பு எண்",
        status_badge_registered: "பதிவு செய்யப்பட்டது — மாதிரி நிலை",
        fir_registered_tag: "அதிகாரப்பூர்வ காவல் FIR பதிவு செய்யப்பட்டது",
        fir_cctns_tag: "CCTNS பதிவு செய்யப்பட்டது",
        fir_approved_by_si: "காவல் உதவி ஆய்வாளரால் ஒப்புதல் அளிக்கப்பட்டது",
        fir_active_on_checkpoints: "அனைத்து மண்டல சோதனைச் சாவடிகளிலும் தீவிர தேடுதல்",
        step_submitted: "சமர்ப்பிக்கப்பட்டது",
        step_verification: "சரிபார்ப்பு",
        step_under_review: "மறுபரிசீலனை",
        step_fir_watchlist: "FIR / கண்காணிப்பு",
        lbl_incident_log_date: "சம்பவம் / பதிவு தேதி",
        lbl_veh_specification: "வாகன விபரம்",
        lbl_jurisdiction_station: "காவல் நிலையம்",
        lbl_officer_remarks: "அதிகாரியின் கருத்து & வழக்கின் நிலை",
        citizen_advisory_text: "⚡ பொதுமக்களுக்கான தகவல்: முறையான FIR சான்றளிக்கப்பட்ட நகல் அல்லது காப்பீட்டு கோரிக்கைகளுக்கு, அசல் RC புத்தகம் மற்றும் அடையாளச் சான்றுடன் உங்கள் காவல் நிலையத்தை அணுகவும்.",
        btn_print_status: "🖨️ நிலை அறிக்கையை அச்சிடு",
        btn_open_scanner: "ஸ்கேனரைத் திற →",

        // Police Dashboard Page
        dash_title: "காவல்துறை கட்டளை மற்றும் நுண்ணறிவு பலகை",
        dash_subtitle: "நிகழ்நேர ANPR ஸ்கேன் புள்ளிவிவரங்கள், திருட்டு வழக்குகள் மற்றும் பொதுமக்கள் புகார் ஆய்வு.",
        btn_add_stolen: "+ புதிய திருட்டு வழக்கைச் சேர்",
        btn_launch_scanner: "⚡ கள ஸ்கேனரைத் தொடங்கு",
        kpi_total_scans: "மொத்த கள சோதனைகள்",
        kpi_stolen_hits: "கண்டறியப்பட்ட திருட்டு வாகனங்கள்",
        kpi_clean_scans: "பாதுகாப்பான வாகனங்கள்",
        kpi_pending: "சரிபார்ப்பில் உள்ளவை",
        kpi_firs: "மொத்த திருட்டு வழக்குகள்",
        kpi_live_synced: "நிகழ்நேர இணைப்பு",
        kpi_high_priority: "அதிதீவிர கவனம்",
        kpi_verified_clear: "பாதுகாப்பானது",
        kpi_in_scrutiny: "ஆய்வில் உள்ளது",
        kpi_tn_zonal: "தமிழ்நாடு மண்டலப் பதிவு",
        dash_direct_lookup: "நேரடி திருட்டு வாகன தேடல்",
        dash_instant_match: "உடனடி பொருத்தம்",
        dash_search_placeholder: "வாகன எண்ணை உள்ளிடவும் (எ.கா: TN09AB1234)",
        btn_search: "தேடு",
        dash_lookup_desc: "நேரடித் தேடல் முழு FIR ஆவணம், உரிமையாளர் தொடர்பு மற்றும் காவல் நிலைய பதிவுகளைத் திறக்கும்.",
        dash_recent_alerts: "சமீபத்திய திருட்டு எச்சரிக்கைகள் (சோதனைச் சாவடிகள்)",
        dash_auto_logged: "தானியங்கி பதிவு",
        tab_all_scans: "அனைத்து சோதனைகள்",
        tab_stolen_hits: "🔴 திருட்டு வாகனங்கள்",
        tab_clean_scans: "🟢 பாதுகாப்பான வாகனங்கள்",
        btn_export_csv: "CSV தரவிறக்கம்",
        btn_clear_history: "பதிவுகளை நீக்கு",
        tab_stolen_db: "திருடப்பட்ட வாகன கண்காணிப்புப் பட்டியல் (மாதிரி தரவுத்தளம்)",
        cctns_registry_hash: "CCTNS மத்திய தரவுத்தள பதிவு",
        th_type: "வகை",
        th_fir_no: "FIR எண்",
        th_ps_district: "காவல் நிலையம் (மாவட்டம்)",
        th_theft_date: "திருடப்பட்ட தேதி",
        th_action: "நடவடிக்கை",
        btn_dossier: "ஆவணம்",
        tab_complaints: "பொதுமக்கள் புகார்கள் & சமர்ப்பிப்புகள்",
        complaints_sub: "பொதுமக்கள் சமர்ப்பித்த புகார்களை ஆய்வு செய்து, ஆவணங்களை சரிபார்த்து FIR பதிவு செய்தல்.",
        filter_all_complaints: "அனைத்து புகார்கள்",
        filter_pending_approval: "🟡 ஒப்புதலுக்கு காத்திருப்பவை",
        filter_under_review: "🔵 மறுபரிசீலனையில்",
        filter_approved_fir: "🔴 FIR ஒப்புதல் பெற்றவை",
        filter_rejected: "⚪ நிராகரிக்கப்பட்டவை",
        th_ref_no: "குறிப்பு எண்",
        th_complainant: "புகார்தாரர்",
        th_district: "மாவட்டம்",
        th_sub_date: "சமர்ப்பித்த தேதி",
        th_scrutiny_status: "ஆய்வு நிலை",
        th_officer_action: "காவலர் நடவடிக்கை",
        btn_scrutiny_approval: "ஆய்வு & ஒப்புதல்",
        tab_district_analytics: "மாவட்ட வாரியான குற்ற விவரங்கள் & சோதனை நடவடிக்கை (மாதிரி)",

        // Scrutiny Modal
        scrutiny_modal_tag: "பொதுமக்கள் புகார் ஆய்வு மற்றும் ஒப்புதல்",
        duty_officer_label: "பணி ஆய்வு அதிகாரி",
        station_label: "காவல் நிலையம்:",
        current_verdict_label: "தற்போதைய ஆய்வு நிலை",
        assessment_remarks_label: "அதிகாரியின் ஆய்வு முடிவு & குறிப்புகள்:",
        btn_approve_issue_fir: "ஒப்புதல் அளித்து FIR பதிவு செய்",
        btn_mark_under_review: "🔍 மறுபரிசீலனைக்கு மாற்று",
        btn_reject: "❌ நிராகரி",

        // Add Stolen Modal
        add_stolen_title: "கண்காணிப்புப் பட்டியலில் புதிய திருட்டு வாகனத்தைச் சேர்",
        btn_save_watchlist: "பட்டியலில் சேமி",
        btn_cancel: "ரத்து செய்",

        // Help & FAQ Page
        help_tag: "காவல்துறை நிலையான இயக்க நடைமுறை (SOP) & வழிகாட்டி",
        help_title: "களக் கையேடு & அடிக்கடி கேட்கப்படும் கேள்விகள்",
        help_subtitle: "நிலையான இயக்க நடைமுறைகள், நம்பர் பிளேட் வடிவங்கள் மற்றும் ஸ்கேனர் வழிகாட்டல்.",
        help_sec1_title: "நிலையான வாகன ஸ்கேன் நடைமுறை (SOP)",
        help_s1_t: "1. வாகன ஸ்கேனரைத் திறக்கவும்",
        help_s1_d: "உங்கள் மொபைல் உலாவி அல்லது கணினியில் வாகன ஸ்கேன் பக்கத்திற்குச் செல்லவும்.",
        help_s2_t: "2. கேமராவைத் தொடங்கு அல்லது புகைப்படத்தைப் பதிவேற்று",
        help_s2_d: "நம்பர் பிளேட்டை படம் பிடிக்க கேமரா அனுமதியை வழங்கவும் அல்லது புகைப்படத்தைப் பதிவேற்றவும்.",
        help_s3_t: "3. நம்பர் பிளேட்டைப் படம்பிடி",
        help_s3_d: "கேமராவை அசையாமல் வைத்து, நம்பர் பிளேட் திரையின் மையத்தில் வந்ததும் \"படம்பிடி\" பொத்தானை அழுத்தவும்.",
        help_s4_t: "4. கண்டறியப்பட்ட எண்ணைச் சரிபார்க்கவும்",
        help_s4_d: "OCR முறை மூலம் வாசிக்கப்பட்ட பதிவு எண்ணை உள்ளீட்டுப் பெட்டியில் சரிபார்க்கவும்.",
        help_s5_t: "5. வாகன நிலையைச் சரிபார்க்கவும்",
        help_s5_d: "திருட்டு வாகனத் தரவுத்தளத்துடன் சில நொடிகளில் ஒப்பிட \"வாகன நிலையைச் சரிபார்\" பொத்தானை அழுத்தவும்.",
        help_s6_t: "6. முடிவு அறிவிப்பைப் பார்க்கவும்",
        help_s6_d: "திரை சிவப்பு (திருடப்பட்டது), பச்சை (வழக்கு இல்லை) அல்லது மஞ்சள் (கூடுதல் சரிபார்ப்பு) என மாறுவதைக் கவனிக்கவும்.",
        help_s7_t: "7. அதிகாரப்பூர்வ காவல்துறை நெறிமுறைகளைப் பின்பற்றவும்",
        help_s7_d: "வாகனத்தின் சேஸிஸ் / எஞ்சின் எண்ணை சரிபார்த்து, நடவடிக்கை எடுக்கும் முன் கட்டுப்பாட்டு அறைக்கு தகவல் தெரிவிக்கவும்.",

        help_sec2_title: "முடிவு வகைப்பாடுகளைப் புரிந்துகொள்ளுதல்",
        help_res_stolen_t: "ஆம் — திருடப்பட்ட வாகன புகார் பதிவாகியுள்ளது",
        help_res_stolen_d: "மைய தரவுத்தளத்தில் இந்த வாகனத்திற்கு தீவிர FIR பதிவு செய்யப்பட்டுள்ளது. காவலர் உடனடியாக \"கட்டுப்பாட்டு அறைக்கு தகவல் அனுப்பு\" பொத்தானை அழுத்தி முழு ஆவணத்தையும் ஒப்பிட வேண்டும்.",
        help_res_clean_t: "இல்லை — திருடப்பட்ட வாகன புகார் எதுவும் இல்லை",
        help_res_clean_d: "மாதிரி தரவுத்தளத்தில் இந்த வாகனத்திற்கான திருட்டு புகார் எதுவும் இல்லை. அறிவிப்பு: இது ஆவணங்களின் சட்டப்பூர்வ உரிமையை உறுதி செய்யாது. வழக்கமான ஆவண சோதனைகளைத் தொடரவும்.",
        help_res_verify_t: "கூடுதல் சரிபார்ப்பு தேவை",
        help_res_verify_d: "புகைப்படம் மங்கலாகவோ அல்லது தவறான வடிவிலோ இருந்தது. சிறந்த வெளிச்சத்தில் மீண்டும் படம் பிடிக்கவும் அல்லது பதிவு எண்ணை நேரடியாக உள்ளிடவும்.",

        help_sec3_title: "இந்திய வாகன பதிவு எண் வடிவங்கள் வழிகாட்டி",
        help_fmt_intro: "வெஹிக்கிள் கார்டு AI அனைத்து பொதுவான இந்திய பதிவு எண் வடிவங்களையும் ஆதரிக்கிறது:",
        help_fmt_std_title: "நிலையான மாநில வடிவம்: [SS][DD][LL][NNNN]",
        help_fmt_std_eg: "எடுத்துக்காட்டு: TN 09 AB 1234",
        help_fmt_std_li1: "TN: மாநிலக் குறியீடு (தமிழ்நாடு)",
        help_fmt_std_li2: "09: RTO மாவட்டக் குறியீடு (எ.கா: சென்னை மேற்கு)",
        help_fmt_std_li3: "AB: தொடர் எழுத்துக்கள்",
        help_fmt_std_li4: "1234: 4 இலக்க பிரத்யேக எண்",
        help_fmt_bh_title: "பாரத் (BH) தொடர்: [YY]BH[NNNN][LL]",
        help_fmt_bh_eg: "எடுத்துக்காட்டு: 22 BH 1234 AB",
        help_fmt_bh_li1: "22: பதிவு செய்யப்பட்ட ஆண்டு",
        help_fmt_bh_li2: "BH: பாரத் குறியீடு",
        help_fmt_bh_li3: "1234: 4 இலக்க பிரத்யேக பதிவு எண்",
        help_fmt_bh_li4: "AB: தொடர் அடையாளம்",

        help_sec4_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        help_faq_q1: "இது நேரடி CCTNS அல்லது பரிவாஹன் தரவுத்தளத்துடன் இணைக்கப்பட்டுள்ளதா?",
        help_faq_a1: "இல்லை. இது ஒரு தொழில்நுட்ப மாதிரி தளம் மட்டுமே. இதில் உள்ள அனைத்து வாகன ஆவணங்கள் மற்றும் காவல் நிலைய விவரங்கள் மாதிரி சோதனைகளுக்காக உருவாக்கப்பட்டவை.",
        help_faq_q2: "திருடப்பட்ட வாகன எச்சரிக்கை வந்தால் காவலர் என்ன செய்ய வேண்டும்?",
        help_faq_a2: "உடனடியாக ஓட்டுநர் மற்றும் வாகன விவரங்களைக் குறித்துக் கொண்டு, சேஸிஸ் எண்ணை ஆவணங்களுடன் ஒப்பிட்டு, கட்டுப்பாட்டு அறைக்கு தகவல் தெரிவித்து அதிகாரப்பூர்வ CCTNS ஆவணங்களுடன் சரிபார்க்க வேண்டும்.",
        help_faq_q3: "மொபைல் போன்களில் கேமரா OCR எவ்வாறு செயல்படுகிறது?",
        help_faq_a3: "இந்த தளம் நவீன HTML5 தொழில்நுட்பம் மற்றும் உலாவி அடிப்படையிலான OCR முறையில் அதிவேகமாக செயல்படுகிறது.",
        help_faq_q4: "டார்க் மோட் மற்றும் லைட் மோட் மாற்ற முடியுமா?",
        help_faq_a4: "ஆம்! வழிசெலுத்தல் பட்டியில் உள்ள சந்திரன் 🌙 / சூரியன் ☀️ பொத்தானை அழுத்தி டார்க் மோட் அல்லது லைட் மோடுக்கு மாறலாம்.",

        // Login Page
        login_title: "வெஹிக்கிள் கார்டு காவல்துறை IT தளம்",
        login_subtitle: "அங்கீகரிக்கப்பட்ட காவல் அதிகாரிகளுக்கான நுழைவு",
        login_badge_notice: "கட்டுப்படுத்தப்பட்ட பகுதி — மாதிரி செயல்முறை",
        login_demo_hint: "கணினி மதிப்பீட்டிற்காக மாதிரி கடவுச்சொல் கீழே வழங்கப்பட்டுள்ளது.",
        form_officer_id: "காவலர் அடையாள எண் (Officer ID/PIN)",
        form_password: "கடவுச்சொல்",
        btn_autofill_demo: "⚡ மாதிரி கடவுச்சொல்லை நிரப்பு (DEMO001 / Demo@123)",
        btn_login: "தளத்தில் நுழை →",
        login_demo_creds: "மாதிரி விவரங்கள்: காவலர் எண்: DEMO001 | கடவுச்சொல்: Demo@123",
        login_footer_desc: "வெஹிக்கிள் கார்டு AI காவல்துறை சோதனைச் சாவடி மாதிரி தளம்.",

        // Footer links
        footer_privacy: "தனியுரிமைக் கட்டமைப்பு",
        footer_security: "பாதுகாப்பு நெறிமுறை",
        footer_sop: "கள வழிகாட்டி & கேள்விகள்",
        footer_officer_login: "காவலர் உள்நுழைவு",

        // Theme
        theme_dark: "இருண்ட பயன்முறை (Dark)",
        theme_light: "வெளிச்ச பயன்முறை (Light)",

        // Common Toasts
        toast_lang_en: "Switched to English",
        toast_lang_ta: "தமிழ் மொழிக்கு மாற்றப்பட்டது",
        toast_logged_out: "வெற்றிகரமாக வெளியேறியது.",
        toast_login_success: "உள்நுழைவு வெற்றிகரமானது! கட்டுப்பாட்டுப் பலகைக்கு மாற்றப்படுகிறது...",
        toast_fill_all: "அனைத்து கட்டாயக் களங்களையும் நிரப்பவும்.",
        toast_invalid_veh: "தவறான வாகன எண் வடிவம். எ.கா: TN09AB1234"
    }
};

/**
 * Get translation for given key
 */
function t(key, fallback = '') {
    const lang = getCurrentLanguage();
    if (translations[lang] && translations[lang][key] !== undefined) {
        return translations[lang][key];
    }
    if (translations.en && translations.en[key] !== undefined) {
        return translations.en[key];
    }
    return fallback || key;
}

/**
 * Get active language
 */
function getCurrentLanguage() {
    return localStorage.getItem('vg_language') || 'en';
}

/**
 * Set active language and update DOM
 * Switches ONLY text/content language without altering layout or removing content.
 */
function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ta') lang = 'en';
    localStorage.setItem('vg_language', lang);
    document.documentElement.lang = lang;
    
    if (lang === 'ta') {
        document.body.classList.add('lang-tamil');
    } else {
        document.body.classList.remove('lang-tamil');
    }

    applyTranslations();
    
    // Update language toggle buttons in desktop & mobile headers
    document.querySelectorAll('.lang-btn-en').forEach(el => {
        el.classList.toggle('text-blue-400', lang === 'en');
        el.classList.toggle('font-bold', lang === 'en');
        el.classList.toggle('text-slate-400', lang !== 'en');
    });
    document.querySelectorAll('.lang-btn-ta').forEach(el => {
        el.classList.toggle('text-blue-400', lang === 'ta');
        el.classList.toggle('font-bold', lang === 'ta');
        el.classList.toggle('text-slate-400', lang !== 'ta');
    });

    // Update buttons in mobile drawers
    document.querySelectorAll('.btn-switch-lang').forEach(btn => {
        const btnLang = btn.dataset.lang;
        if (btnLang === lang) {
            btn.classList.add('text-blue-400', 'font-bold');
            btn.classList.remove('text-slate-400');
        } else if (btnLang) {
            btn.classList.remove('text-blue-400', 'font-bold');
            btn.classList.add('text-slate-400');
        }
    });

    // Notify other components (scanner, dashboard, complaints) to re-render in new language
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Apply translations to all DOM elements with data-i18n attributes
 */
function applyTranslations() {
    const lang = getCurrentLanguage();
    const dict = translations[lang] || translations.en;
    
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });
    
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
            el.setAttribute('placeholder', dict[key]);
        }
    });
    
    // Titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key] !== undefined) {
            el.setAttribute('title', dict[key]);
        }
    });

    // Alt text
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (dict[key] !== undefined) {
            el.setAttribute('alt', dict[key]);
        }
    });
}

// Auto init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = getCurrentLanguage();
    setLanguage(savedLang);
});
