/**
 * TechNova Learning Hub - AI & Prompt Engineering Sandbox Controller
 * Interactive Prompt Engineering Lab, Model Comparison Engine & AI Department
 */

const TechNovaAISandbox = {
  promptPresets: {
    zero_shot: {
      system: "You are a Senior Full-Stack and AI Mentor at TechNova Learning Hub. Respond with clarity and structured advice.",
      user: "Explain what Vector Embeddings are and why they are critical for LLMs and RAG systems in 3 bullet points.",
      response: `Here is the breakdown of Vector Embeddings in modern AI:

1. **High-Dimensional Mathematical Vectors**: Vector embeddings convert words, code, or images into arrays of floating-point numbers (e.g. 1536 dimensions) where semantically related concepts are clustered close together in vector space.
2. **Semantic Similarity & Cosine Distance**: Unlike keyword matching which fails on synonyms, embeddings compute the geometric angle (cosine similarity) between query vectors and document vectors, allowing models to understand meaning regardless of exact wording.
3. **The Core Engine of RAG (Retrieval-Augmented Generation)**: Vector databases (like Pinecone, Chroma, or pgvector) index these embeddings to retrieve relevant documentation in milliseconds and inject it into the LLM context window to eliminate hallucinations.`
    },
    few_shot: {
      system: "You are an AI Data Transformer. Convert natural language queries into optimized SQL SELECT statements.",
      user: `Example 1:
User Query: "Find all students who scored above 90% in Python."
SQL: SELECT full_name, email, score_pct FROM students JOIN course_grades ON students.id = course_grades.student_id WHERE course_code = 'PYTHON' AND score_pct > 90.00;

Example 2:
User Query: "Count total completed projects grouped by difficulty."
SQL: SELECT difficulty, COUNT(id) AS total_projects FROM projects WHERE is_completed = TRUE GROUP BY difficulty;

Now generate SQL for:
User Query: "List top 5 enrolled courses with an average rating higher than 4.8."`,
      response: `SELECT c.title, c.category, c.rating, COUNT(e.id) AS enrolled_count
FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE c.rating > 4.80
GROUP BY c.id, c.title, c.category, c.rating
ORDER BY enrolled_count DESC
LIMIT 5;`
    },
    chain_of_thought: {
      system: "You are an AI Software Architect. Think step-by-step before producing your final recommendation.",
      user: `I am building a web app that expects 100,000 real-time users generating collaborative canvas drawings. Should I use standard REST HTTP polling or WebSockets with Redis Pub/Sub?`,
      response: `### Step-by-Step Architectural Reasoning:

1. **Traffic & Latency Analysis**:
   - 100,000 real-time collaborative canvas users generate high-frequency state updates (strokes, coordinates, color changes at 30-60 events/second per active drawer).
   - HTTP polling would incur massive HTTP header overhead, high latency (minimum 200-500ms), and saturate web servers with redundant requests.

2. **Protocol Evaluation**:
   - **WebSockets**: Provides a persistent, full-duplex, low-overhead TCP connection (< 5ms message overhead). Ideal for bi-directional live canvas streaming.
   - **Redis Pub/Sub**: Acts as the horizontal messaging backbone across multiple distributed WebSocket cluster nodes to broadcast canvas delta patches instantly.

3. **Definitive Recommendation**:
   Use **WebSockets (via Socket.io / Fastify / Node or Go) paired with Redis Pub/Sub clusters**.
   - Frontend: WebSockets + HTML5 Canvas 2D / WebGL
   - Backend: Distributed WebSocket Gateway nodes
   - Message Bus: Redis Pub/Sub for sub-millisecond node-to-node synchronization.`
    },
    code_generation: {
      system: "You are TechNova AI Code Generator. Produce clean, well-commented, production-ready code with types.",
      user: "Write a Python FastAPI endpoint that receives a student's email and phone number, validates them with Pydantic, and returns a simulated SMS OTP code.",
      response: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr, Field, field_validator
import random
import re

app = FastAPI(title="TechNova Student OTP Service")

class OTPRequest(BaseModel):
    email: EmailStr
    phone: str = Field(..., description="International format phone number")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        cleaned = re.sub(r"[\\s\\-\\(\\)]", "", v)
        if not (8 <= len(cleaned) <= 16 and re.match(r"^\\+?[0-9]+$", cleaned)):
            raise ValueError("Invalid phone number format. Must contain 8-15 digits.")
        return cleaned

@app.post("/api/v1/auth/request-otp", status_code=status.HTTP_200_OK)
async def request_otp(payload: OTPRequest):
    # Generate 6-digit secure verification code
    otp_code = f"{random.randint(100000, 999999)}"
    
    # In production, dispatch via Twilio / AWS SNS
    return {
        "status": "success",
        "message": f"Verification code dispatched to {payload.phone}",
        "demo_otp": otp_code,
        "expires_in_seconds": 300
    }`
    }
  },

  init() {
    this.initPromptLab();
    this.renderAIConcepts();
  },

  initPromptLab() {
    const runBtn = document.getElementById("prompt-run-btn");
    const presetSelect = document.getElementById("prompt-preset-select");

    if (runBtn) {
      runBtn.addEventListener("click", () => this.executePrompt());
    }
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => this.loadPromptPreset(e.target.value));
    }

    if (document.getElementById("prompt-user-input")) {
      this.loadPromptPreset("zero_shot");
    }
  },

  loadPromptPreset(key) {
    const preset = this.promptPresets[key] || this.promptPresets.zero_shot;
    const sysInput = document.getElementById("prompt-system-input");
    const userInput = document.getElementById("prompt-user-input");
    const outputDiv = document.getElementById("prompt-response-output");

    if (sysInput) sysInput.value = preset.system;
    if (userInput) userInput.value = preset.user;
    if (outputDiv) outputDiv.innerHTML = `<span class="text-slate-500 italic">Click "Execute Prompt" to simulate real-time AI response...</span>`;
  },

  isExecuting: false,

  executePrompt() {
    if (this.isExecuting) return;

    const presetSelect = document.getElementById("prompt-preset-select")?.value || "zero_shot";
    const modelSelect = document.getElementById("prompt-model-select")?.value || "gpt-4o";
    const tempValue = document.getElementById("prompt-temp-slider")?.value || "0.7";
    const outputDiv = document.getElementById("prompt-response-output");
    const tokenSpeedSpan = document.getElementById("prompt-token-speed");
    const runBtn = document.getElementById("prompt-run-btn");

    if (!outputDiv) return;

    const preset = this.promptPresets[presetSelect] || this.promptPresets.zero_shot;
    const responseText = preset.response;

    this.isExecuting = true;
    if (runBtn) {
      runBtn.disabled = true;
      runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;
    }
    outputDiv.innerHTML = "";

    let index = 0;
    const speed = 12; // ms per chunk
    const startTime = performance.now();

    const streamInterval = setInterval(() => {
      if (index < responseText.length) {
        const chunk = responseText.slice(0, index + 3);
        index += 3;
        outputDiv.innerHTML = TechNovaMain.escapeHtml(chunk).replace(/\n/g, "<br>");
      } else {
        clearInterval(streamInterval);
        outputDiv.innerHTML = TechNovaMain.escapeHtml(responseText).replace(/\n/g, "<br>");
        this.isExecuting = false;
        if (runBtn) {
          runBtn.disabled = false;
          runBtn.innerHTML = `<i class="fa-solid fa-play mr-1"></i> Execute Prompt`;
        }
        if (tokenSpeedSpan) {
          const totalTokens = Math.round(responseText.length / 4);
          const elapsedSec = (performance.now() - startTime) / 1000;
          const tokensPerSec = Math.round(totalTokens / elapsedSec);
          tokenSpeedSpan.textContent = `${tokensPerSec} tokens/sec (${totalTokens} tokens • ${modelSelect} • temp ${tempValue})`;
        }
        if (typeof TechNovaMain !== "undefined") {
          TechNovaMain.showToast("AI Generation Complete!", "ai");
        }
      }
    }, speed);
  },

  renderAIConcepts() {
    const container = document.getElementById("ai-concepts-grid");
    if (!container || !window.TechNovaData) return;

    const aiTechs = window.TechNovaData.technologies.filter(t => t.category === "ai");

    container.innerHTML = aiTechs.map(tech => `
      <div id="${tech.id}" class="glass-card p-6 rounded-3xl border border-slate-800/80 hover:border-purple-500/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-2xl bg-purple-950/40 text-purple-400 flex items-center justify-center text-2xl border border-purple-800/40 shadow-lg group-hover:scale-110 transition-transform">
              <i class="${tech.icon}"></i>
            </div>
            <span class="px-3 py-1 text-xs font-bold rounded-full ${tech.badgeColor} border">${tech.level}</span>
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">${tech.name}</h3>
          <p class="text-slate-400 text-xs mt-2 line-clamp-2">${tech.description}</p>

          <div class="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
            <p class="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Core Breakdown</p>
            <ul class="text-xs text-slate-300 space-y-1.5">
              ${tech.basicConcepts.slice(0, 3).map(c => `
                <li class="flex items-center gap-2 truncate">
                  <i class="fa-solid fa-brain text-purple-400 text-[10px]"></i>
                  <span class="truncate">${c}</span>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-medium">${tech.projects.length} Real-World Labs</span>
          <button onclick="TechNovaFullStack.openTechModal('${tech.id}')" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white transition-colors">
            Explore AI Module <i class="fa-solid fa-arrow-right text-[10px] ml-1"></i>
          </button>
        </div>
      </div>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  TechNovaAISandbox.init();
});

window.TechNovaAISandbox = TechNovaAISandbox;
