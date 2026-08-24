/**
 * VehicleGuard AI - Comprehensive Bilingual Translation Module (English / தமிழ்)
 */

const translations = {
    en: {
        // Navigation & Brand
        brand_name: "VehicleGuard AI",
        brand_subtitle: "AI-Powered Stolen Vehicle Detection & Verification System",
        nav_home: "Home",
        nav_scan: "Vehicle Scan",
        nav_report: "Report Vehicle",
        nav_status: "Check Status",
        nav_dashboard: "Police Dashboard",
        nav_help: "Help & FAQ",
        nav_login: "Police Login",
        nav_logout: "Logout",
        btn_scan_nav: "⚡ SCAN VEHICLE",
        
        // Demo Disclaimers
        demo_banner: "DEMO PROTOTYPE — NOT CONNECTED TO LIVE GOVERNMENT DATABASES (FOR DEMO & EVALUATION ONLY)",
        demo_sub_banner: "Simulated public safety environment inspired by Tamil Nadu Police routine vehicle inspection protocols.",
        demo_warning_action: "⚠️ VERIFY WITH OFFICIAL POLICE CONTROL ROOM / CCTNS RECORDS BEFORE TAKING ACTION",
        demo_footer_disclaimer: "DEMO PROTOTYPE — NOT CONNECTED TO LIVE GOVERNMENT SYSTEMS. This system is a frontend concept demonstration and does not hold real citizen data.",
        
        // Hero Section
        hero_title: "AI-Powered Stolen Vehicle Detection",
        hero_tagline: "Scan. Verify. Alert. Protect.",
        hero_desc: "Empowering police officers on patrol and field checkpoints to instantly identify stolen vehicles by scanning license plates and verifying records in real time.",
        hero_btn_scan: "Launch Vehicle Scanner",
        hero_btn_report: "Report Stolen Vehicle",
        
        // Workflow Steps
        workflow_title: "Intelligent Field Verification Workflow",
        step_1_title: "1. Vehicle Checkpoint",
        step_1_desc: "Officer targets incoming vehicle at routine junction or patrol checkpost.",
        step_2_title: "2. Camera / ANPR Scan",
        step_2_desc: "Capture plate image via mobile camera, bodycam, or static feed.",
        step_3_title: "3. OCR Number Extraction",
        step_3_desc: "Optical character recognition parses plate format and normalizes text.",
        step_4_title: "4. Database Check",
        step_4_desc: "Instant search against stolen vehicle FIRs and missing registries.",
        step_5_title: "5. Immediate Verdict",
        step_5_desc: "Instant RED (Stolen) or GREEN (Clear) response with SOP directives.",

        // Scanner Page
        scanner_title: "Vehicle Scan & Verification",
        scanner_subtitle: "Point camera at registration plate or upload an image for immediate stolen status query.",
        scanner_camera_title: "ANPR Optical Scanner",
        btn_start_camera: "Start Camera",
        btn_stop_camera: "Stop Camera",
        btn_capture: "Capture Plate Image",
        btn_upload_img: "Upload Plate Image",
        drop_image_hint: "Drag & drop plate image here, or click to browse",
        detected_plate_label: "Demo OCR Input / Detected Registration Number",
        plate_placeholder: "e.g. TN 09 AB 1234",
        btn_confirm_check: "CHECK VEHICLE STATUS",
        scanner_helper: "Formatting: Supports all standard Indian formats (e.g. TN09AB1234, TN01CD5678, TN22EF4321, BH series).",
        sample_plates_title: "⚡ Quick Demo Test Samples (Click to Load):",
        sample_stolen_1: "Stolen Bike (TN09AB1234)",
        sample_stolen_2: "Stolen Scooter (TN01CD5678)",
        sample_clean_1: "Clean Vehicle (TN07BK9988)",
        sample_clean_2: "Clean Car (TN22EF4321)",
        sample_invalid: "Unreadable / Blur",

        // Results
        result_stolen_title: "🔴 YES — STOLEN VEHICLE REPORT FOUND",
        result_stolen_subtitle: "ACTIVE THEFT COMPLAINT ON FILE",
        result_clean_title: "🟢 NO — NO STOLEN VEHICLE REPORT FOUND",
        result_clean_subtitle: "NO THEFT REPORT FOUND IN DEMO REPOSITORY",
        result_verify_title: "🟡 VERIFICATION REQUIRED",
        result_verify_subtitle: "UNREADABLE OR INCOMPLETE NUMBER PLATE",
        
        result_clean_desc: "No matching stolen-vehicle record was found in the connected demo database. This query does not guarantee ownership or insurance validity. Continue standard physical documentation checks.",
        result_verify_desc: "Unable to read the number plate clearly due to blur, angle, or occlusion. Please capture another image or enter the registration number manually.",
        
        // Stolen Record Fields
        lbl_reg_no: "Registration No",
        lbl_veh_type: "Vehicle Type",
        lbl_make_model: "Make & Model",
        lbl_color: "Color",
        lbl_fir_complaint: "FIR / Complaint Ref",
        lbl_police_station: "Reporting Police Station",
        lbl_theft_date: "Complaint Date",
        lbl_district: "District / City",
        lbl_status: "Current Status",
        lbl_owner: "Complainant Name",
        lbl_engine_no: "Engine / Chassis Hash",

        // Action Buttons
        btn_view_fir: "View Complete FIR Dossier",
        btn_notify_sup: "Notify Control Room / Supervisor",
        btn_start_sop: "Start Official SOP Verification",
        btn_print_report: "Print Verification Report",
        btn_new_scan: "Scan Another Vehicle",
        btn_try_again: "Try Again",
        btn_enter_manual: "Enter Manually",

        // Report Stolen Vehicle Page
        report_title: "Report a Missing or Stolen Vehicle",
        report_subtitle: "Public safety citizen submission portal for lost, snatched, or stolen vehicles.",
        report_disclaimer: "This is a prototype request workflow and is not a formal legal FIR registration. Please report directly to your nearest police station for formal FIR filing.",
        form_owner_name: "Owner / Complainant Full Name",
        form_mobile: "Contact Mobile Number",
        form_email: "Email Address (Optional)",
        form_reg_number: "Vehicle Registration Number (e.g. TN09AB1234)",
        form_veh_type: "Vehicle Category",
        form_make: "Vehicle Make / Brand",
        form_model: "Model Name / Year",
        form_color: "Primary Color",
        form_incident_date: "Date of Incident",
        form_incident_time: "Approximate Time",
        form_district: "District",
        form_police_station: "Jurisdiction Police Station",
        form_location: "Incident Location / Landmark",
        form_description: "Incident Description & Special Identification Marks",
        form_upload_rc: "Upload RC / Insurance Copy (PDF/JPG)",
        form_upload_vehicle_photo: "Upload Vehicle Photo (Optional)",
        btn_submit_complaint: "Submit Complaint Request",
        
        // Status Check Page
        status_title: "Check Stolen Vehicle Complaint Status",
        status_subtitle: "Enter your reference number or vehicle registration number to track complaint processing.",
        status_input_label: "Reference Number / Vehicle Number",
        status_placeholder: "e.g. SVR-2026-482731 or TN09AB1234",
        btn_check_status: "Check Status",
        status_no_record: "No matching record found. Please verify your reference number or register a new complaint.",

        // Dashboard
        dash_title: "Police Command & Intelligence Dashboard",
        dash_subtitle: "Real-time ANPR scan metrics, stolen vehicle hits, and district surveillance feed.",
        kpi_total_scans: "Total Field Scans",
        kpi_stolen_hits: "Stolen Matches (Alerts)",
        kpi_clean_scans: "Clean Vehicles Verified",
        kpi_pending: "Pending Verifications",
        kpi_firs: "Active Stolen Database",
        tab_recent_scans: "Recent Field Scans",
        tab_stolen_db: "Stolen Vehicle Repository",
        tab_complaints: "Citizen Complaints",
        tab_district_analytics: "District Crime Distribution",
        btn_export_csv: "Export Scans (CSV)",
        btn_clear_history: "Clear Local History",
        btn_add_stolen: "+ Add Stolen Vehicle Record",
        
        // Login Page
        login_title: "Tamil Nadu Police IT Portal",
        login_subtitle: "Authorized Law Enforcement Checkpoint Access",
        login_badge_notice: "RESTRICTED ACCESS — AUTHORIZED POLICE PERSONNEL ONLY",
        form_officer_id: "Officer Identification Code (PIN/ID)",
        form_password: "Secure Access Password",
        btn_login: "Access Command Portal",
        btn_autofill_demo: "Auto-Fill Demo Credentials (DEMO001)",
        login_demo_creds: "Demo Credentials: Officer ID: DEMO001 | Password: Demo@123",

        // Help Page
        help_title: "Officer Field Guide & FAQs",
        help_subtitle: "Standard operating procedures, number plate validation formats, and scanning troubleshooting.",

        // Features
        feat_1_title: "Lightning-Fast Verification",
        feat_1_desc: "Sub-second database querying against high-priority vehicle theft records.",
        feat_2_title: "Smart ANPR Ingestion",
        feat_2_desc: "Optical character recognition with intelligent normalization for regional plates.",
        feat_3_title: "Cross-District Intelligence",
        feat_3_desc: "Seamless syncing between Chennai, Coimbatore, Madurai, Trichy, and all Tamil Nadu zones.",
        feat_4_title: "Role-Based Audit Logging",
        feat_4_desc: "Every scan creates an immutable audit trail with timestamp and officer credentials.",
        feat_5_title: "Offline-Ready Architecture",
        feat_5_desc: "LocalStorage caching for instant lookups even in low-bandwidth rural checkpoints.",
        feat_6_title: "Citizen Safety Bridge",
        feat_6_desc: "Streamlined public theft reporting workflow with instant reference tracking.",

        // Theme
        theme_dark: "Dark Mode",
        theme_light: "Light Mode"
    },
    ta: {
        // Navigation & Brand
        brand_name: "வெஹிக்கிள் கார்டு AI",
        brand_subtitle: "செயற்கை நுண்ணறிவு அடிப்படையிலான திருடப்பட்ட வாகன கண்டறிதல் & சரிபார்ப்பு அமைப்பு",
        nav_home: "முகப்பு",
        nav_scan: "வாகன ஸ்கேன்",
        nav_report: "புகார் பதிவு",
        nav_status: "நிலை அறிதல்",
        nav_dashboard: "காவல்துறை கட்டுப்பாட்டகம்",
        nav_help: "உதவி & கேள்விகள்",
        nav_login: "காவலர் உள்நுழைவு",
        nav_logout: "வெளியேறு",
        btn_scan_nav: "⚡ வாகனத்தை ஸ்கேன் செய்",
        
        // Demo Disclaimers
        demo_banner: "மாதிரி முன்மாதிரி — நேரலை அரசு தரவுத்தளத்துடன் இணைக்கப்படவில்லை (செயல்முறை விளக்கத்திற்கு மட்டுமே)",
        demo_sub_banner: "தமிழ்நாடு காவல்துறை வாகன சோதனை நடைமுறைகளை அடிப்படையாகக் கொண்ட மாதிரி தளம்.",
        demo_warning_action: "⚠️ அதிகாரப்பூர்வ காவல் கட்டுப்பாட்டு அறை / CCTNS ஆவணங்களுடன் சரிபார்த்த பிறகே நடவடிக்கை எடுக்கவும்",
        demo_footer_disclaimer: "மாதிரி முன்மாதிரி — நேரடி அரசு அமைப்புடன் இணைக்கப்படவில்லை. இது ஒரு தொழில்நுட்ப மாதிரி வடிவம் மட்டுமே.",
        
        // Hero Section
        hero_title: "செயற்கை நுண்ணறிவு திருடப்பட்ட வாகன கண்டறிதல்",
        hero_tagline: "ஸ்கேன் செய். சரிபார். எச்சரி. பாதுகாத்திடு.",
        hero_desc: "வாகன சோதனையின் போது நம்பர் பிளேட்டை ஸ்கேன் செய்து, திருடப்பட்ட வாகனங்களை சில நொடிகளில் துல்லியமாக கண்டறிய உதவும் காவல்துறை தொழில்நுட்ப தளம்.",
        hero_btn_scan: "வாகன ஸ்கேனரைத் திற",
        hero_btn_report: "திருடப்பட்ட வாகனத்தைப் பதிவு செய்",
        
        // Workflow Steps
        workflow_title: "கள ஆய்வு மற்றும் சரிபார்ப்பு செயல்முறை",
        step_1_title: "1. வாகன சோதனைச் சாவடி",
        step_1_desc: "காவல்துறை சோதனைச் சாவடியில் வாகனத்தை நிறுத்துதல்.",
        step_2_title: "2. கேமரா / ANPR ஸ்கேன்",
        step_2_desc: "மொபைல் அல்லது கேமரா மூலம் நம்பர் பிளேட்டைப் படம் பிடித்தல்.",
        step_3_title: "3. OCR எண் அறிதல்",
        step_3_desc: "படத்திலிருந்து வாகன எண்ணைத் துல்லியமாக வாசித்து மாற்றுதல்.",
        step_4_title: "4. தரவுத்தள சரிபார்ப்பு",
        step_4_desc: "திருடப்பட்ட வாகன FIR மற்றும் புகார்களுடன் ஒப்பிடுதல்.",
        step_5_title: "5. உடனடி முடிவு",
        step_5_desc: "சிவப்பு (திருடப்பட்டது) அல்லது பச்சை (புகார் இல்லை) முடிவு வெளியீடு.",

        // Scanner Page
        scanner_title: "வாகன ஸ்கேன் & உடனடி சரிபார்ப்பு",
        scanner_subtitle: "வாகன நம்பர் பிளேட்டின் மீது கேமராவை வைக்கவும் அல்லது புகைப்படத்தைப் பதிவேற்றவும்.",
        scanner_camera_title: "ANPR ஆப்டிகல் ஸ்கேனர்",
        btn_start_camera: "கேமராவைத் தொடங்கு",
        btn_stop_camera: "கேமராவை நிறுத்து",
        btn_capture: "படம்பிடி",
        btn_upload_img: "புகைப்படத்தைப் பதிவேற்று",
        drop_image_hint: "நம்பர் பிளேட் படத்தை இங்கே இழுத்துப் போடவும் அல்லது கிளிக் செய்யவும்",
        detected_plate_label: "கண்டறியப்பட்ட பதிவு எண் (Demo OCR Input)",
        plate_placeholder: "எ.கா: TN 09 AB 1234",
        btn_confirm_check: "வாகன நிலையைச் சரிபார்",
        scanner_helper: "அனைத்து இந்திய பதிவு எண் வடிவங்களையும் ஆதரிக்கிறது (TN09AB1234, TN01CD5678, TN22EF4321, BH தொடர்).",
        sample_plates_title: "⚡ விரைவு மாதிரி சோதனைகள் (கிளிக் செய்து சோதிக்கவும்):",
        sample_stolen_1: "திருடப்பட்ட பைக் (TN09AB1234)",
        sample_stolen_2: "திருடப்பட்ட ஸ்கூட்டர் (TN01CD5678)",
        sample_clean_1: "பாதுகாப்பான வாகனம் (TN07BK9988)",
        sample_clean_2: "பாதுகாப்பான கார் (TN22EF4321)",
        sample_invalid: "மங்கலான / தவறான எண்",

        // Results
        result_stolen_title: "🔴 திருடப்பட்ட வாகன புகார் பதிவாகியுள்ளது",
        result_stolen_subtitle: "நிலுவையில் உள்ள திருட்டு வழக்கு கண்டறியப்பட்டது",
        result_clean_title: "🟢 திருடப்பட்ட வாகன புகார் எதுவும் கிடைக்கவில்லை",
        result_clean_subtitle: "மாதிரி தரவுத்தளத்தில் எந்த வழக்கும் இல்லை",
        result_verify_title: "🟡 கூடுதல் சரிபார்ப்பு தேவை",
        result_verify_subtitle: "நம்பர் பிளேட்டை தெளிவாக வாசிக்க இயலவில்லை",
        
        result_clean_desc: "மாதிரி தரவுத்தளத்தில் இந்த வாகனத்திற்கான திருட்டு புகார் எதுவும் இல்லை. எனினும் அதிகாரப்பூர்வ ஆவணங்களை நேரடியாக சரிபார்க்கவும்.",
        result_verify_desc: "புகைப்படத்தில் நம்பர் பிளேட் தெளிவாக இல்லை. மீண்டும் படம் பிடிக்கவும் அல்லது பதிவு எண்ணை நேரடியாக உள்ளிடவும்.",
        
        // Stolen Record Fields
        lbl_reg_no: "பதிவு எண்",
        lbl_veh_type: "வாகன வகை",
        lbl_make_model: "தயாரிப்பு & மாடல்",
        lbl_color: "வண்ணம்",
        lbl_fir_complaint: "FIR / புகார் குறிப்பு எண்",
        lbl_police_station: "புகார் பதிவு செய்யப்பட்ட காவல் நிலையம்",
        lbl_theft_date: "திருடப்பட்ட தேதி",
        lbl_district: "மாவட்டம் / நகரம்",
        lbl_status: "தற்போதைய நிலை",
        lbl_owner: "உரிமையாளர் பெயர்",
        lbl_engine_no: "எஞ்சின் / சேஸிஸ் எண்",

        // Action Buttons
        btn_view_fir: "முழு FIR ஆவணத்தைப் பார்",
        btn_notify_sup: "கட்டுப்பாட்டு அறைக்கு தகவல் அனுப்பு",
        btn_start_sop: "காவல்துறை நடைமுறையைத் தொடங்கு",
        btn_print_report: "சரிபார்ப்பு அறிக்கையை அச்சிடு",
        btn_new_scan: "மற்றொரு வாகனத்தை ஸ்கேன் செய்",
        btn_try_again: "மீண்டும் முயற்சி செய்",
        btn_enter_manual: "கைமுறையாக உள்ளிடு",

        // Report Stolen Vehicle Page
        report_title: "திருடப்பட்ட வாகனத்தைப் பதிவு செய்தல்",
        report_subtitle: "பொதுமக்கள் திருடப்பட்ட அல்லது காணாமல் போன வாகன புகாரை சமர்ப்பிக்கும் தளம்.",
        report_disclaimer: "இது ஒரு மாதிரி விண்ணப்பம் மட்டுமே. சட்டப்பூர்வ FIR பதிவுக்கு உங்கள் அருகிலுள்ள காவல் நிலையத்தை அணுகவும்.",
        form_owner_name: "உரிமையாளர் / புகார்தாரர் பெயர்",
        form_mobile: "தொடர்பு கைபேசி எண்",
        form_email: "மின்னஞ்சல் முகவரி (விருப்பத்தேர்வு)",
        form_reg_number: "வாகன பதிவு எண் (எ.கா: TN09AB1234)",
        form_veh_type: "வாகனப் பிரிவு",
        form_make: "வாகன தயாரிப்பு நிறுவனம்",
        form_model: "மாடல் / ஆண்டு",
        form_color: "முக்கிய வண்ணம்",
        form_incident_date: "சம்பவம் நடந்த தேதி",
        form_incident_time: "தோராயமான நேரம்",
        form_district: "மாவட்டம்",
        form_police_station: "காவல் நிலையம்",
        form_location: "சம்பவம் நடந்த இடம் / அடையாளம்",
        form_description: "விவரம் மற்றும் அடையாளக் குறிகள்",
        form_upload_rc: "RC / காப்பீட்டு நகல் பதிவேற்றவும்",
        form_upload_vehicle_photo: "வாகனப் புகைப்படம் (விருப்பத்தேர்வு)",
        btn_submit_complaint: "புகாரைச் சமர்ப்பி",
        
        // Status Check Page
        status_title: "வாகன புகார் நிலையை அறிதல்",
        status_subtitle: "உங்கள் குறிப்பு எண் அல்லது வாகன எண்ணை உள்ளிட்டு நிலையை அறியவும்.",
        status_input_label: "குறிப்பு எண் / வாகன பதிவு எண்",
        status_placeholder: "எ.கா: SVR-2026-482731 அல்லது TN09AB1234",
        btn_check_status: "நிலையைச் சரிபார்",
        status_no_record: "எந்த ஆவணமும் கிடைக்கவில்லை. குறிப்பு எண்ணைச் சரிபார்க்கவும்.",

        // Dashboard
        dash_title: "காவல்துறை கட்டளை மற்றும் புலனாய்வு பலகை",
        dash_subtitle: "நிகழ்நேர ANPR ஸ்கேன் புள்ளிவிவரங்கள் மற்றும் மாவட்ட கண்காணிப்புத் தரவு.",
        kpi_total_scans: "மொத்த கள சோதனைகள்",
        kpi_stolen_hits: "கண்டறியப்பட்ட திருட்டு வாகனங்கள்",
        kpi_clean_scans: "பாதுகாப்பான வாகனங்கள்",
        kpi_pending: "சரிபார்ப்பில் உள்ளவை",
        kpi_firs: "மொத்த திருட்டு வழக்குகள்",
        tab_recent_scans: "சமீபத்திய ஸ்கேன் பதிவுகள்",
        tab_stolen_db: "திருடப்பட்ட வாகன பட்டியல்",
        tab_complaints: "பொதுமக்கள் புகார்கள்",
        tab_district_analytics: "மாவட்ட வாரியான விவரங்கள்",
        btn_export_csv: "CSV தரவிறக்கம்",
        btn_clear_history: "வரலாற்றை நீக்கு",
        btn_add_stolen: "+ புதிய திருட்டு வழக்கைச் சேர்",
        
        // Login Page
        login_title: "தமிழ்நாடு காவல்துறை IT தளம்",
        login_subtitle: "அங்கீகரிக்கப்பட்ட காவல் அதிகாரிகளுக்கான நுழைவு",
        login_badge_notice: "கட்டுப்படுத்தப்பட்ட பகுதி — காவல்துறை அதிகாரிகளுக்கு மட்டும்",
        form_officer_id: "காவலர் அடையாள எண் (Officer ID)",
        form_password: "கடவுச்சொல்",
        btn_login: "தளத்தில் நுழை",
        btn_autofill_demo: "மாதிரி கடவுச்சொல்லை நிரப்பு (DEMO001)",
        login_demo_creds: "மாதிரி விவரங்கள்: காவலர் எண்: DEMO001 | கடவுச்சொல்: Demo@123",

        // Help Page
        help_title: "களக் கையேடு & அடிக்கடி கேட்கப்படும் கேள்விகள்",
        help_subtitle: "நிலையான இயக்க நடைமுறைகள் மற்றும் ஸ்கேனர் சரிசெய்தல் வழிகாட்டல்.",

        // Features
        feat_1_title: "மின்னல் வேக சரிபார்ப்பு",
        feat_1_desc: "சில நொடிகளில் திருட்டு வாகனத் தரவுகளுடன் ஒப்பிட்டு முடிவு காணும் வசதி.",
        feat_2_title: "நுண்ணறிவு ANPR முறை",
        feat_2_desc: "நம்பர் பிளேட்டுகளை தானாக அடையாளம் கண்டு வாசிக்கும் அதிநவீன OCR அமைப்பு.",
        feat_3_title: "மாவட்டங்களுக்கு இடையேயான இணைப்பு",
        feat_3_desc: "சென்னை, கோவை, மதுரை, திருச்சி உள்ளிட்ட அனைத்து மாவட்டங்களின் தரவு ஒருங்கிணைப்பு.",
        feat_4_title: "பாதுகாப்பான பதிவு முறை",
        feat_4_desc: "ஒவ்வொரு சோதனையும் காலமுத்திரையுடன் அதிகாரியின் பதிவில் சேமிக்கப்படுகிறது.",
        feat_5_title: "ஆஃப்லைன் ஆதரவு",
        feat_5_desc: "இணைய வசதி குறைந்த கிராமப்புற சோதனைச் சாவடிகளிலும் செயல்படும் கட்டமைப்பு.",
        feat_6_title: "பொதுமக்கள் பாதுகாப்பு இணைப்பு",
        feat_6_desc: "பொதுமக்கள் எளிதாக புகார் பதிவு செய்து குறிப்பு எண்ணைக் கண்காணிக்கும் முறை.",

        // Theme
        theme_dark: "இருண்ட பயன்முறை (Dark)",
        theme_light: "வெளிச்ச பயன்முறை (Light)"
    }
};

/**
 * Get translation for given key
 */
function t(key) {
    const lang = getCurrentLanguage();
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    if (translations['en'] && translations['en'][key]) {
        return translations['en'][key];
    }
    return key;
}

/**
 * Get active language
 */
function getCurrentLanguage() {
    return localStorage.getItem('vg_language') || 'en';
}

/**
 * Set active language and update DOM
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
    
    // Update language toggle buttons if present
    document.querySelectorAll('.lang-btn-en').forEach(el => {
        el.classList.toggle('font-bold', lang === 'en');
        el.classList.toggle('text-blue-500', lang === 'en');
        el.classList.toggle('opacity-100', lang === 'en');
        el.classList.toggle('opacity-60', lang !== 'en');
    });
    document.querySelectorAll('.lang-btn-ta').forEach(el => {
        el.classList.toggle('font-bold', lang === 'ta');
        el.classList.toggle('text-blue-500', lang === 'ta');
        el.classList.toggle('opacity-100', lang === 'ta');
        el.classList.toggle('opacity-60', lang !== 'ta');
    });
}

/**
 * Apply translations to all DOM elements with data-i18n
 */
function applyTranslations() {
    const lang = getCurrentLanguage();
    const dict = translations[lang] || translations.en;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key]) {
            el.setAttribute('title', dict[key]);
        }
    });
}

// Auto init on script load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});
