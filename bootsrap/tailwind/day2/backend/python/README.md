# TechNova Python Backend (FastAPI)

Production-grade asynchronous REST API powering **TechNova Learning Hub**.

## Features Included
- **Dual Identifier Authentication**: Registration & login requiring both Email and international Phone Number validation.
- **Pydantic Validation**: Strict type checking and format validation on phone numbers and emails.
- **Course & Department API**: Filtering courses by department (`fullstack` vs `ai`) and level (`Beginner` vs `Intermediate`).
- **Student Progress & Certificate Engine**: Dynamic progress updates with auto-certificate trigger upon reaching 100%.
- **AI Prompt Playground API**: Simulated LLM completions with token speed metrics.

## Step-by-Step Execution

1. **Create virtual environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**:
   ```bash
   uvicorn app:app --reload --port 8000
   ```

4. **Access Interactive Swagger UI Documentation**:
   Navigate in your browser to:
   `http://127.0.0.1:8000/docs`
