/**
 * TechNova Learning Hub - Central Data Store
 * Structured data for Technologies, Courses, Projects, AI Modules & Emerging Tech
 */

const TechNovaData = {
  // ==========================================
  // 1. ALL TECHNOLOGIES DATA
  // ==========================================
  technologies: [
    {
      id: "html5",
      name: "HTML5",
      category: "fullstack",
      level: "Beginner",
      icon: "fa-brands fa-html5 text-orange-500",
      badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      description: "The standard markup language for structuring web pages and application layouts.",
      whyLearn: "HTML5 is the absolute foundation of all web development. It delivers semantic structure, accessibility (a11y), audio/video playback, and native canvas capabilities without external plugins.",
      basicConcepts: [
        "Semantic tags (<header>, <nav>, <main>, <article>, <section>, <footer>)",
        "Document object model hierarchy and doctype declaration",
        "Modern Forms & inputs (email, tel, date, pattern, required validation)",
        "Media embedding (<video>, <audio>, <iframe>, <picture>)",
        "Tables, lists, hyperlinks, and responsive image attributes (srcset)"
      ],
      intermediateConcepts: [
        "Web Storage API (localStorage, sessionStorage, IndexedDB)",
        "Canvas 2D Graphics and WebGL context integration",
        "Web Workers for background multi-threading",
        "Semantic SEO optimization and Open Graph social metadata",
        "ARIA attributes, role attributes, and screen-reader accessibility"
      ],
      codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechNova HTML5 Demo</title>
</head>
<body class="p-4 bg-slate-900 text-white font-sans">
  <header class="border-b border-slate-700 pb-3 mb-4">
    <h1 class="text-2xl font-bold text-cyan-400">🚀 TechNova Learning Hub</h1>
    <p class="text-slate-400 text-sm">Semantic HTML5 + Modern Web Standards</p>
  </header>
  <main class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <article class="p-4 bg-slate-800 rounded-lg border border-slate-700">
      <h2 class="text-lg font-semibold text-blue-400">Semantic Web Architecture</h2>
      <p class="text-slate-300 text-sm mt-2">Clean tags make content discoverable for search engines & accessible to all users.</p>
    </article>
  </main>
</body>
</html>`,
      projects: ["Personal Portfolio", "Landing Page", "Interactive Documentation Site"],
      careerRoles: ["Frontend Developer", "Web Designer", "UI Engineer", "Technical Writer"]
    },
    {
      id: "css3",
      name: "CSS3",
      category: "fullstack",
      level: "Beginner",
      icon: "fa-brands fa-css3-alt text-blue-500",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "Cascading Style Sheets for visual styling, responsive layouts, flexbox, grid, and fluid animations.",
      whyLearn: "CSS3 turns raw HTML structure into stunning, responsive, interactive web interfaces. Mastering CSS layout algorithms (Flexbox & Grid) is essential for any modern frontend engineer.",
      basicConcepts: [
        "Box model (content, padding, border, margin)",
        "Selectors, specificity calculation, and cascading rules",
        "Colors (HSL, RGB, HEX), typography, and font pairing",
        "Display properties (block, inline, inline-block, flex, grid)",
        "CSS Custom Properties (CSS variables) and theming"
      ],
      intermediateConcepts: [
        "CSS Grid layouts with repeat, minmax, auto-fit/auto-fill",
        "Flexbox axis alignment, flex-grow, flex-shrink, and wrap",
        "Keyframe animations, transitions, and cubic-bezier curves",
        "Media queries, clamp(), container queries (@container)",
        "Glassmorphism, backdrop filters, clip-paths, and blend modes"
      ],
      codeSnippet: `/* Modern CSS3 Design Token System */
:root {
  --primary-accent: #06b6d4;
  --bg-cyber: #0f172a;
}

.technova-card {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.technova-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(6, 182, 212, 0.3);
}`,
      projects: ["Modern Glassmorphism UI Kit", "Responsive Pricing Matrix", "Animated Dashboard Grid"],
      careerRoles: ["CSS Architect", "UI/UX Developer", "Design Systems Engineer"]
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-brands fa-js text-yellow-400",
      badgeColor: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      description: "The core programming language of the web, enabling dynamic user interactions, asynchronous APIs, and server-side execution.",
      whyLearn: "JavaScript is the most widely used language in the world. It runs in every browser, on the server with Node.js, and powers all modern web frameworks (React, Vue, Angular, Next.js).",
      basicConcepts: [
        "Variables (let, const), data types, and type coercion",
        "Functions, arrow functions, closures, and scope chain",
        "DOM manipulation, event listeners, and event delegation",
        "Array methods (map, filter, reduce, find, some, every)",
        "Objects, destructuring, spread/rest operators"
      ],
      intermediateConcepts: [
        "Asynchronous JS: Promises, async/await, and Fetch API",
        "Event loop, call stack, microtask queue, and Web APIs",
        "ES6 Modules (import/export) and modular code architecture",
        "Error handling (try...catch...finally) and custom Error classes",
        "Object-Oriented Programming (Classes, Inheritance, Prototypes)"
      ],
      codeSnippet: `// Asynchronous API Fetching with Async/Await
async function fetchTechNovaCourses(category = "fullstack") {
  try {
    const response = await fetch(\`/api/v1/courses?dept=\${category}\`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.filter(course => course.rating >= 4.8);
  } catch (error) {
    console.error("Fetch error:", error.message);
    return [];
  }
}`,
      projects: ["Interactive Kanban Board", "Weather Forecast App", "Real-Time Chat Widget"],
      careerRoles: ["Full-Stack Engineer", "Frontend Developer", "Node.js Backend Dev"]
    },
    {
      id: "bootstrap",
      name: "Bootstrap 5",
      category: "fullstack",
      level: "Beginner",
      icon: "fa-brands fa-bootstrap text-purple-500",
      badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      description: "World's most popular responsive CSS and component framework with pre-styled responsive grids, modals, carousels, and alerts.",
      whyLearn: "Bootstrap accelerates rapid prototyping and guarantees standard responsive grid compliance without writing extensive custom CSS from scratch.",
      basicConcepts: [
        "Bootstrap 12-column grid system (row, col-*, container)",
        "Pre-built components (Navbar, Cards, Modals, Accordions, Badges)",
        "Utility classes for spacing (m-*, p-*), colors (text-*, bg-*), and flex",
        "Form controls, input groups, floating labels, and validation states",
        "Buttons, button groups, dropdowns, and pagination"
      ],
      intermediateConcepts: [
        "Sass customization ($primary, $theme-colors override)",
        "Bootstrap JavaScript API (Offcanvas, Tooltips, Popovers programmatically)",
        "Breakpoints (xs, sm, md, lg, xl, xxl) layout optimization",
        "Custom utility API in SCSS for custom class generation",
        "Accessibility compliance with ARIA roles integrated in Bootstrap components"
      ],
      codeSnippet: `<div class="card shadow-lg border-0 rounded-4 bg-dark text-white p-4">
  <div class="card-body">
    <span class="badge bg-primary text-uppercase px-3 py-2 rounded-pill">Bootstrap 5</span>
    <h3 class="card-title mt-3 fw-bold">Rapid Responsive Systems</h3>
    <p class="card-text text-secondary">Pre-built 12-column grid and modular utility components.</p>
    <button class="btn btn-outline-info rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#courseModal">
      Explore Syllabus
    </button>
  </div>
</div>`,
      projects: ["Enterprise Admin Dashboard", "Hotel Booking Portal", "E-Commerce Catalog"],
      careerRoles: ["UI Developer", "Full-Stack Web Dev", "Enterprise App Builder"]
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-solid fa-wind text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
      description: "A utility-first CSS framework for rapidly building custom, modern, performant user interfaces directly in markup.",
      whyLearn: "Tailwind CSS has become the industry standard in top-tier modern web applications. It eliminates context switching, produces tiny production CSS bundles, and enables pixel-perfect design systems.",
      basicConcepts: [
        "Utility class conventions (flex, grid, p-4, m-2, rounded-xl)",
        "Responsive prefix modifiers (sm:, md:, lg:, xl:, 2xl:)",
        "State variants (hover:, focus:, active:, disabled:, group-hover:)",
        "Typography, colors, shadows, borders, and backdrop blurs",
        "Dark mode configuration using class-based or media-based selectors"
      ],
      intermediateConcepts: [
        "Tailwind Configuration (tailwind.config.js) theme extension",
        "Arbitrary values (w-[320px], bg-[#0f172a]) and JIT compiler engine",
        "Creating custom utility plugins and CSS layer directives (@layer components)",
        "Design tokens integration for multi-brand design systems",
        "Performance optimization and dead-code stripping in production"
      ],
      codeSnippet: `<div class="relative group p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20">
  <div class="flex items-center justify-between">
    <span class="px-3 py-1 text-xs font-semibold text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-800/40">Tailwind v3.4</span>
    <i class="fa-solid fa-arrow-right text-slate-500 group-hover:text-cyan-400 transition-colors"></i>
  </div>
  <h3 class="text-xl font-bold text-white mt-4">Utility-First Architecture</h3>
  <p class="text-slate-400 text-sm mt-2">Zero CSS bloat, instant styling directly inside your HTML components.</p>
</div>`,
      projects: ["SaaS Landing Page", "Crypto Asset Dashboard", "Modern Developer Portfolio"],
      careerRoles: ["Frontend Specialist", "Design Systems Engineer", "React/Next.js Engineer"]
    },
    {
      id: "java",
      name: "Java",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-brands fa-java text-red-500",
      badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
      description: "Robust, object-oriented, enterprise-grade backend language powering large-scale microservices, banking systems, and cloud architectures.",
      whyLearn: "Java is the backbone of global enterprise infrastructure. With Spring Boot, Java powers high-concurrency RESTful APIs, distributed systems, and scalable backend platforms.",
      basicConcepts: [
        "Object-Oriented Programming (Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction)",
        "Data types, control structures, and loops",
        "Exception handling (checked vs unchecked exceptions, custom exceptions)",
        "Java Collections Framework (ArrayList, HashMap, HashSet, LinkedList, PriorityQueue)",
        "File I/O and Streams"
      ],
      intermediateConcepts: [
        "Spring Boot 3 REST API creation, Dependency Injection (@Autowired, @Service, @Repository)",
        "Spring Data JPA & Hibernate ORM with PostgreSQL / MySQL",
        "Multithreading, Concurrency, and Java 21 Virtual Threads (Project Loom)",
        "Java Streams API, Lambda expressions, and Functional Interfaces",
        "Spring Security with JWT authentication and role-based access control (RBAC)"
      ],
      codeSnippet: `@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses(
            @RequestParam(required = false) String department) {
        List<CourseDTO> courses = courseService.findByDepartment(department);
        return ResponseEntity.ok(courses);
    }
}`,
      projects: ["Hotel Reservation System", "Banking Transaction Microservice", "Student Information System"],
      careerRoles: ["Java Backend Developer", "Enterprise Software Architect", "Cloud Backend Engineer"]
    },
    {
      id: "python",
      name: "Python",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-brands fa-python text-emerald-500",
      badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      description: "Versatile, high-level language with elegant syntax, powering Full-Stack Backends, Data Science, Machine Learning, and AI agents.",
      whyLearn: "Python is the undisputed lingua franca of Artificial Intelligence and rapid backend development. Frameworks like FastAPI and Django make building secure web APIs effortless.",
      basicConcepts: [
        "Variables, dynamic typing, strings, lists, dictionaries, tuples, and sets",
        "Control flow (if-elif-else, match-case, for/while loops, list comprehensions)",
        "Functions, *args, **kwargs, lambda functions, and decorators",
        "Object-oriented programming (Classes, __init__, dunder methods, inheritance)",
        "Module imports, virtual environments (venv), and pip package management"
      ],
      intermediateConcepts: [
        "FastAPI & Asyncio for high-performance asynchronous REST endpoints",
        "SQLAlchemy ORM and Pydantic data validation schemas",
        "Working with AI libraries: PyTorch, NumPy, Pandas, Scikit-learn, OpenAI API",
        "Decorators, Generators, Iterators, and Context Managers (with statements)",
        "Building autonomous AI agent tools with LangChain and LangGraph"
      ],
      codeSnippet: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(title="TechNova API", version="1.0.0")

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    phone: str
    track: str

@app.post("/api/v1/auth/register", status_code=status.HTTP_201_CREATED)
async def register_student(user: UserRegister):
    # Persist student in SQL Database
    return {"status": "success", "message": f"Welcome {user.name} to TechNova!", "track": user.track}`,
      projects: ["Student Management System API", "AI Chatbot Service", "Full-Stack Blog CMS"],
      careerRoles: ["Python Full-Stack Developer", "AI/ML Engineer", "Data Scientist", "Backend Specialist"]
    },
    {
      id: "sql",
      name: "SQL & Databases",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-solid fa-database text-blue-400",
      badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "Structured Query Language for designing, querying, indexing, and managing relational databases like PostgreSQL and MySQL.",
      whyLearn: "Every full-stack application relies on persistent data storage. SQL allows you to execute complex joins, optimize query execution plans, and enforce relational integrity.",
      basicConcepts: [
        "Relational database concepts (Tables, Rows, Columns, Primary Keys, Foreign Keys)",
        "CRUD queries (SELECT, INSERT INTO, UPDATE, DELETE)",
        "Filtering & Sorting (WHERE, ORDER BY, LIMIT, OFFSET, LIKE, BETWEEN, IN)",
        "Aggregation functions (COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING)",
        "Table creation (CREATE TABLE, ALTER TABLE, DROP TABLE, data types)"
      ],
      intermediateConcepts: [
        "Multi-table JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN)",
        "Subqueries, Common Table Expressions (WITH queries / CTEs)",
        "Indexing strategies (B-Tree indexes, Composite indexes, EXPLAIN ANALYZE)",
        "Database transactions (ACID properties, BEGIN, COMMIT, ROLLBACK)",
        "Database normalization (1NF, 2NF, 3NF, BCNF) and entity relationship modeling"
      ],
      codeSnippet: `-- TechNova Course Enrollment Tracking Schema
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT NOT NULL,
    progress_pct INT DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    is_completed BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Query student course completion rates
SELECT u.name, u.email, COUNT(e.id) AS active_courses, AVG(e.progress_pct) AS avg_progress
FROM users u
JOIN enrollments e ON u.id = e.user_id
GROUP BY u.id, u.name, u.email;`,
      projects: ["Hotel Database Schema", "E-Commerce Order Ledger", "Analytics Aggregator"],
      careerRoles: ["Database Administrator (DBA)", "Data Architect", "Backend Database Engineer"]
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "fullstack",
      level: "Beginner - Intermediate",
      icon: "fa-brands fa-github text-slate-300",
      badgeColor: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      description: "Distributed version control system for tracking code history, collaborating via branches, pull requests, and CI/CD pipelines.",
      whyLearn: "Git is mandatory for all modern software engineering. It allows team collaboration, seamless rollbacks, code reviews, and automated testing deployments.",
      basicConcepts: [
        "Repository initialization (git init, git clone)",
        "Staging and committing (git status, git add, git commit -m)",
        "Branching basics (git branch, git checkout, git switch -c)",
        "Pushing and pulling from remotes (git push, git pull, git remote)",
        "Inspecting history (git log --oneline, git diff)"
      ],
      intermediateConcepts: [
        "Git merge vs git rebase workflows and merge conflict resolution",
        "Git stash, cherry-pick, reset (--soft, --mixed, --hard) vs revert",
        "Pull Request reviews, branch protection rules, and GitHub Actions CI/CD",
        "Semantic versioning and Git tagging (git tag v1.0.0)",
        "Git submodules, monorepo structures, and hook automation (.git/hooks)"
      ],
      codeSnippet: `# Clone & create feature branch
git clone https://github.com/technova/learning-hub.git
git checkout -b feature/ai-prompt-sandbox

# Stage changes & commit with conventional commit format
git add js/ai-sandbox.js css/style.css
git commit -m "feat(ai): integrate interactive prompt playground with streaming simulation"

# Push branch and open Pull Request
git push -u origin feature/ai-prompt-sandbox`,
      projects: ["Open Source Project Collaboration", "Automated CI/CD Pipeline", "Team Code Review Workflow"],
      careerRoles: ["DevOps Engineer", "Software Engineer", "Release Manager"]
    },

    // ==========================================
    // 2. AI & EMERGING TECHNOLOGIES
    // ==========================================
    {
      id: "ai-fundamentals",
      name: "What is AI?",
      category: "ai",
      level: "Beginner",
      icon: "fa-solid fa-brain text-purple-400",
      badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      description: "Artificial Intelligence refers to computer systems capable of performing tasks that typically require human cognitive intelligence.",
      whyLearn: "AI is reshaping every industry from software engineering and healthcare to finance and autonomous vehicles. Understanding its core paradigms gives you an insurmountable competitive advantage.",
      basicConcepts: [
        "Definition of Artificial Intelligence vs standard algorithmic automation",
        "History and evolution of AI (Turing Test, Expert Systems, AI Winters to Modern Deep Learning)",
        "Data-driven learning vs rule-based programming",
        "Key sub-fields: Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Robotics",
        "Ethical considerations, bias, explainability, and AI safety"
      ],
      intermediateConcepts: [
        "Symbolic AI vs Connectionist AI models",
        "Agent-Environment interaction loops and Markov Decision Processes",
        "Statistical inference, loss functions, and optimization algorithms",
        "Evaluation metrics (Precision, Recall, F1-Score, BLEU, ROUGE, Perplexity)",
        "Hardware acceleration: GPUs, TPUs, and Neural Processing Units (NPUs)"
      ],
      codeSnippet: `# Conceptual AI Decision Engine in Python
class SimpleIntelligentAgent:
    def __init__(self, goal="optimize_learning"):
        self.knowledge_base = {}
        self.goal = goal
    
    def perceive(self, student_progress):
        # Update internal state based on student data
        return "intermediate" if student_progress > 60 else "basic"
        
    def act(self, student_level):
        if student_level == "basic":
            return "Recommend HTML5, CSS3 & JavaScript fundamentals"
        return "Recommend Generative AI & Autonomous Agents Track"

agent = SimpleIntelligentAgent()
print(agent.act(agent.perceive(student_progress=85)))`,
      projects: ["AI Rule Engine", "Student Progress Classifier", "Intelligent Recommendation Bot"],
      careerRoles: ["AI Strategist", "Machine Learning Specialist", "AI Product Manager"]
    },
    {
      id: "types-of-ai",
      name: "Types of AI (ANI, AGI, ASI)",
      category: "ai",
      level: "Beginner",
      icon: "fa-solid fa-network-wired text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      description: "Understanding the 3 primary classifications: Artificial Narrow Intelligence, Artificial General Intelligence, and Artificial Superintelligence.",
      whyLearn: "Classifying AI capabilities clarifies what exists today (Narrow AI) versus future technological horizons (AGI/ASI), framing realistic engineering expectations.",
      basicConcepts: [
        "Artificial Narrow Intelligence (ANI / Weak AI): Specialized for 1 distinct task (Siri, Chess bots, Spam filters)",
        "Artificial General Intelligence (AGI / Strong AI): Human-level adaptability across any intellectual domain",
        "Artificial Superintelligence (ASI): Hypothetical intellect exceeding all collective human capabilities",
        "Reactive Machines vs Limited Memory systems",
        "Theory of Mind and Self-Aware AI concepts"
      ],
      intermediateConcepts: [
        "Benchmarking AGI: ARC-AGI, MMLU, GSM8K, and Reasoning evaluations",
        "Singularity timeline theories and exponential computing trends (Moore's law & scaling laws)",
        "Alignment problem, goal drift, and constitutional AI frameworks",
        "Neuro-symbolic architectures bridging narrow skills to general reasoning",
        "Autonomous multi-system orchestration architectures"
      ],
      codeSnippet: `// Representation of AI Classification Matrix
const aiTiers = {
  ANI: {
    status: "Active & Deployed Worldwide",
    examples: ["ChatGPT", "Tesla Autopilot", "AlphaFold", "Midjourney"],
    scope: "Domain-Specific Excellence"
  },
  AGI: {
    status: "Active Global Research Frontier",
    examples: ["Next-Gen Reasoning LLMs", "Generalist Robotic Agents"],
    scope: "Cross-Domain Cognitive Generalization"
  },
  ASI: {
    status: "Theoretical Horizon",
    examples: ["Self-Evolving Autonomous Systems"],
    scope: "Transcending Collective Human Intelligence"
  }
};`,
      projects: ["AI Capability Matrix Explorer", "Reasoning Benchmark Dashboard", "AI Ethics Simulator"],
      careerRoles: ["AI Alignment Researcher", "AI Ethics Officer", "Research Scientist"]
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      category: "ai",
      level: "Beginner - Intermediate",
      icon: "fa-solid fa-chart-line text-emerald-400",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      description: "Algorithms that learn patterns from empirical data and make accurate predictions without explicit hard-coded rules.",
      whyLearn: "Machine Learning is the engine behind recommendation systems, fraud detection, predictive maintenance, algorithmic trading, and modern automated decision making.",
      basicConcepts: [
        "Supervised Learning: Classification & Regression (Features, Labels, Training/Test split)",
        "Unsupervised Learning: Clustering (K-Means, DBSCAN) and Dimensionality Reduction (PCA)",
        "Reinforcement Learning: Agent, Environment, State, Action, Reward, Policy",
        "Model evaluation: Accuracy, Confusion Matrix, Mean Squared Error (MSE), ROC-AUC",
        "Overfitting vs Underfitting, Bias-Variance Tradeoff"
      ],
      intermediateConcepts: [
        "Gradient Descent Optimization (SGD, Adam, learning rate schedules)",
        "Decision Trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)",
        "Hyperparameter tuning (GridSearchCV, Bayesian Optimization with Optuna)",
        "Feature engineering, one-hot encoding, feature scaling (StandardScaler)",
        "Cross-validation techniques (K-Fold, Stratified K-Fold)"
      ],
      codeSnippet: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Simulated Student Course Completion Dataset
X = np.random.rand(100, 4) # [Hours studied, quiz scores, project count, forum activity]
y = (X[:, 0] * 2 + X[:, 1] * 1.5 > 2.0).astype(int) # 1 = Passed, 0 = At-Risk

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print(classification_report(y_test, predictions, target_names=["At-Risk", "Passed"]))`,
      projects: ["E-Commerce Customer Churn Predictor", "House Price Estimator", "Spam Email Detector"],
      careerRoles: ["Machine Learning Engineer", "Data Scientist", "Predictive Analytics Specialist"]
    },
    {
      id: "deep-learning",
      name: "Deep Learning & Neural Networks",
      category: "ai",
      level: "Intermediate",
      icon: "fa-solid fa-layer-group text-indigo-400",
      badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      description: "Multi-layered artificial neural networks inspired by biological brains, capable of learning hierarchical feature representations.",
      whyLearn: "Deep Learning powers the breakthroughs in speech recognition, autonomous driving, protein folding, vision systems, and large language models.",
      basicConcepts: [
        "Artificial Neuron (Perceptron): Weights, Biases, Weighted Sum, Activation functions (ReLU, Sigmoid, Softmax)",
        "Forward propagation and Loss calculation (Cross-Entropy, MSE)",
        "Backpropagation and Chain Rule of Calculus",
        "Epochs, Batch size, Iterations, and Mini-batch gradient descent",
        "Multi-Layer Perceptron (MLP) architecture"
      ],
      intermediateConcepts: [
        "Convolutional Neural Networks (CNNs) for image feature extraction (Filters, Strides, Pooling)",
        "Recurrent Neural Networks (RNNs, LSTMs, GRUs) for sequential time-series data",
        "Transformer Architecture (Self-Attention mechanism, Multi-Head Attention, Positional Encoding)",
        "Regularization techniques (Dropout, Batch Normalization, Weight Decay, Layer Normalization)",
        "PyTorch training loops, tensors, autograd, and GPU execution (torch.cuda)"
      ],
      codeSnippet: `import torch
import torch.nn as nn
import torch.optim as optim

class TechNovaClassifier(nn.Module):
    def __init__(self, input_dim=10, hidden_dim=32, num_classes=3):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, num_classes)
        )

    def forward(self, x):
        return self.network(x)

model = TechNovaClassifier()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)
print(model)`,
      projects: ["Neural Image Classifier", "Audio Speech Recognizer", "Time-Series Stock Predictor"],
      careerRoles: ["Deep Learning Researcher", "Computer Vision Engineer", "PyTorch Specialist"]
    },
    {
      id: "generative-ai",
      name: "Generative AI & LLMs",
      category: "ai",
      level: "Intermediate",
      icon: "fa-solid fa-wand-magic-sparkles text-pink-400",
      badgeColor: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      description: "Next-generation models capable of generating novel text, code, high-resolution imagery, video, and audio from natural language prompts.",
      whyLearn: "Generative AI is the fastest-growing technological revolution in human history. Building applications with LLMs, embeddings, and vector databases is now a core requirement for modern developers.",
      basicConcepts: [
        "Generative vs Discriminative models",
        "Large Language Model fundamentals (Pre-training on text corpora, Fine-tuning, RLHF)",
        "Tokens, context window length, temperature, top_p, and frequency penalty",
        "Text generation, code generation, summarization, and translation",
        "Diffusion models for photorealistic image generation (Latent Diffusion)"
      ],
      intermediateConcepts: [
        "Retrieval-Augmented Generation (RAG) with Vector Databases (Pinecone, ChromaDB, pgvector)",
        "Embeddings generation and semantic cosine similarity search",
        "Parameter-Efficient Fine-Tuning (PEFT, LoRA, QLoRA)",
        "Function calling / Structured JSON outputs from LLMs",
        "Running local open-weight models with Ollama, vLLM, and llama.cpp"
      ],
      codeSnippet: `import openai

client = openai.OpenAI(api_key="sk-technova-demo-key")

def generate_code_explanation(code_snippet: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are TechNova AI Tutor. Explain code concisely with time complexity."},
            {"role": "user", "content": f"Explain this code:\\n{code_snippet}"}
        ],
        temperature=0.3,
        max_tokens=300
    )
    return response.choices[0].message.content`,
      projects: ["Full-Stack RAG Knowledge Assistant", "AI Code Reviewer", "AI Image Generation Studio"],
      careerRoles: ["Generative AI Engineer", "LLM Applications Developer", "AI Solutions Architect"]
    },
    {
      id: "nlp",
      name: "Natural Language Processing",
      category: "ai",
      level: "Beginner - Intermediate",
      icon: "fa-solid fa-comments text-amber-400",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      description: "Empowering computers to comprehend, interpret, synthesize, and manipulate human natural language.",
      whyLearn: "NLP unlocks unstructured text data: search engines, sentiment analysis, conversational bots, automated documentation, and multilingual translation.",
      basicConcepts: [
        "Text preprocessing: Tokenization, Stemming, Lemmatization, Stop-word removal",
        "Bag of Words (BoW) and Term Frequency-Inverse Document Frequency (TF-IDF)",
        "Word Embeddings (Word2Vec, GloVe, FastText)",
        "Sentiment analysis, Named Entity Recognition (NER), Part-of-Speech tagging (POS)",
        "Text classification with libraries like NLTK and spaCy"
      ],
      intermediateConcepts: [
        "Hugging Face Transformers library pipeline and pre-trained checkpoints (BERT, RoBERTa, T5)",
        "Tokenizers (Byte-Pair Encoding - BPE, WordPiece, SentencePiece)",
        "Sequence-to-sequence modeling for neural machine translation and summarization",
        "Semantic similarity search and re-ranking models (Cross-Encoders)",
        "Evaluating NLP models: BLEU, ROUGE, Exact Match (EM), and F1"
      ],
      codeSnippet: `from transformers import pipeline

# Load pre-trained sentiment analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

feedback = [
    "TechNova courses made Full-Stack development intuitive and fun!",
    "The initial SQL join chapter was slightly difficult to grasp."
]

results = sentiment_analyzer(feedback)
for text, res in zip(feedback, results):
    print(f"Text: {text}\\nLabel: {res['label']} (Confidence: {res['score']:.4f})\\n")`,
      projects: ["Customer Review Sentiment Engine", "Resume Keyword & Skill Matcher", "Autonomous FAQ Bot"],
      careerRoles: ["NLP Scientist", "Conversational AI Engineer", "Computational Linguist"]
    },
    {
      id: "computer-vision",
      name: "Computer Vision",
      category: "ai",
      level: "Intermediate",
      icon: "fa-solid fa-eye text-teal-400",
      badgeColor: "bg-teal-500/10 text-teal-500 border-teal-500/20",
      description: "Enabling machines to extract high-level visual understanding from digital images and live video streams.",
      whyLearn: "From biometric facial recognition and medical MRI diagnosis to autonomous drones and AR, Computer Vision bridges digital sensors with real-world intelligence.",
      basicConcepts: [
        "Digital image representation (Pixels, Channels RGB/BGR, Grayscale, Color spaces)",
        "Image preprocessing with OpenCV (Resizing, Thresholding, Blurring, Edge detection with Canny)",
        "Image transformations (Rotation, Affine transformation, Morphological operations)",
        "Drawing bounding boxes, contours, and histograms",
        "Image classification basics"
      ],
      intermediateConcepts: [
        "Object Detection architectures: YOLO (You Only Look Once v8/v11), Faster R-CNN, SSD",
        "Image Segmentation (Semantic Segmentation with U-Net, Instance Segmentation with Mask R-CNN)",
        "Vision Transformers (ViT) and Multimodal models (CLIP, GPT-4 Vision)",
        "Facial landmark tracking and pose estimation with MediaPipe",
        "Real-time video inference pipelines with OpenCV and CUDA acceleration"
      ],
      codeSnippet: `import cv2

# Real-time Face & Landmark Detection with OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_faces_in_frame(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 255), 2)
    return len(faces), img`,
      projects: ["Smart Attendance Face Identifier", "Defect Detection Quality Scanner", "Gesture-Controlled App"],
      careerRoles: ["Computer Vision Engineer", "Robotics Vision Specialist", "Autonomous Systems Dev"]
    },
    {
      id: "prompt-engineering",
      name: "Prompt Engineering",
      category: "ai",
      level: "Beginner - Intermediate",
      icon: "fa-solid fa-terminal text-yellow-400",
      badgeColor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      description: "The art and science of structuring inputs to elicit precise, reliable, and high-quality outputs from generative AI models.",
      whyLearn: "Prompt Engineering is the most direct lever to increase LLM performance by 10x without retraining models. It is critical for all AI developers and software engineers.",
      basicConcepts: [
        "Core prompt components (Instruction, Context, Input Data, Output Indicator)",
        "Zero-shot prompting vs Few-shot prompting (giving 2-3 worked examples)",
        "Role prompting (Assigning system personas: 'You are a Senior Security Auditor...')",
        "Delimiters (###, XML tags <context>, Markdown backticks) for prompt organization",
        "Controlling format (Instructing JSON, Markdown, YAML, tabular output)"
      ],
      intermediateConcepts: [
        "Chain-of-Thought (CoT) prompting for step-by-step mathematical & logical reasoning",
        "Tree of Thoughts (ToT) and Self-Consistency sampling",
        "Prompt injection defenses, jailbreak mitigation, and output sanitization",
        "Directional Stimulus prompting and Meta-prompting",
        "Automated prompt evaluation with DSPy and LangSmith"
      ],
      codeSnippet: `<!-- Chain of Thought Master Prompt Template -->
<system>
You are a Principal Software Architect at TechNova.
Analyze the following architecture requirement step-by-step.
Follow this format strictly:
1. Requirements Breakdown
2. Architectural Trade-offs
3. Recommended Database & Backend Stack
4. SQL Schema Blueprint
</system>

<context>
Building a high-throughput video learning platform for 50,000 active students.
</context>

<instruction>
Generate the scalable architecture proposal.
</instruction>`,
      projects: ["Automated Code Generator Pipeline", "Structured Resume Parser", "Dynamic AI Tutor System"],
      careerRoles: ["Prompt Engineer", "AI Product Designer", "Full-Stack AI Developer"]
    },
    {
      id: "ai-agents",
      name: "AI Agents & Autonomous Workflows",
      category: "ai",
      level: "Intermediate",
      icon: "fa-solid fa-robot text-rose-400",
      badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      description: "Autonomous software programs powered by LLMs that perceive environments, make decisions, use external tools, and accomplish multi-step goals.",
      whyLearn: "AI Agents represent the future of software automation. Instead of just answering questions, agents browse the web, write code, execute database migrations, and fix bugs autonomously.",
      basicConcepts: [
        "What is an AI Agent? (Perception -> Reasoning -> Action -> Reflection loop)",
        "ReAct framework (Reasoning + Acting in interleaved steps)",
        "Tool Calling (Giving LLMs calculators, web search, database querying, and code execution)",
        "Agent memory: Short-term (conversation context) and Long-term (vector databases)",
        "Single-agent vs Multi-agent collaboration systems"
      ],
      intermediateConcepts: [
        "LangGraph, AutoGen, and CrewAI frameworks for multi-agent workflows",
        "Planning algorithms (Plan-and-Solve, Reflexion, Self-Correction loops)",
        "Human-in-the-loop (HITL) approval gates for critical actions",
        "State machine management for deterministic multi-step pipelines",
        "Evaluating agent success rates, token budgets, and loop prevention"
      ],
      codeSnippet: `from langchain.agents import initialize_agent, AgentType, load_tools
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = load_tools(["serpapi", "llm-math"], llm=llm)

agent_executor = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

response = agent_executor.run(
    "Find the latest version of Tailwind CSS in 2026 and calculate how many days since Tailwind v3 was released."
)`,
      projects: ["Autonomous Research Assistant", "Automated SQL Query & Report Generator", "Multi-Agent Code Review Crew"],
      careerRoles: ["Autonomous Systems Engineer", "AI Agent Developer", "Applied AI Architect"]
    }
  ],

  // ==========================================
  // 2. COMPLETE COURSES CATALOG DATA
  // ==========================================
  courses: [
    {
      id: "course-html-css",
      title: "Modern HTML5 & CSS3 Masterclass",
      category: "fullstack",
      level: "Beginner",
      duration: "18 Hours",
      lessonsCount: 42,
      rating: 4.9,
      studentsCount: 14200,
      imageIcon: "fa-brands fa-html5 text-orange-500",
      instructor: "Marcus Vance, Lead Frontend Architect",
      summary: "Start from complete zero and master modern HTML5 semantics, CSS3 Grid, Flexbox, responsive design, and CSS variables.",
      badge: "Best for Beginners",
      modules: [
        { title: "Module 1: HTML5 Semantics & Structure", lessons: ["Introduction to Web Architecture", "Semantic Tagging System", "Forms, Inputs & Validation", "Accessible Tables & Media"] },
        { title: "Module 2: CSS3 Fundamentals & Box Model", lessons: ["CSS Selectors & Specificity", "The Box Model Demystified", "Display Types & Typography", "Custom Properties (CSS Variables)"] },
        { title: "Module 3: Modern Layouts (Flexbox & Grid)", lessons: ["Flexbox 1D Layout System", "CSS Grid 2D Blueprint System", "Responsive Media Queries & Clamp()", "Container Queries"] },
        { title: "Module 4: Real-World Portfolio Project", lessons: ["Building the Navigation & Hero", "Projects Showcase Grid", "Contact Form Styling", "Deployment on GitHub Pages"] }
      ]
    },
    {
      id: "course-js-es6",
      title: "Modern JavaScript (ES6+) & DOM Mastery",
      category: "fullstack",
      level: "Beginner - Intermediate",
      duration: "26 Hours",
      lessonsCount: 58,
      rating: 4.9,
      studentsCount: 18900,
      imageIcon: "fa-brands fa-js text-yellow-400",
      instructor: "Elena Rostova, Senior JS Specialist",
      summary: "Master JavaScript from fundamental variables and loops to closures, async/await, Fetch API, and OOP patterns.",
      badge: "Core Requirement",
      modules: [
        { title: "Module 1: JS Core & Syntax", lessons: ["Variables, Types & Operators", "Control Flow & Loops", "Functions, Scope & Hoisting", "Modern Array Methods (Map, Filter, Reduce)"] },
        { title: "Module 2: DOM & Event Architecture", lessons: ["DOM Selection & Manipulation", "Event Listeners & Event Delegation", "Form Submission & Client Validation", "Local Storage Persistence"] },
        { title: "Module 3: Asynchronous JavaScript", lessons: ["Event Loop & Microtasks", "Promises & Error Handling", "Async/Await Best Practices", "Consuming REST APIs with Fetch"] },
        { title: "Module 4: Object-Oriented JS & Modules", lessons: ["ES6 Classes & Inheritance", "Prototypes under the hood", "ES Modules (Import/Export)", "Building a Modular Kanban App"] }
      ]
    },
    {
      id: "course-tailwind",
      title: "Tailwind CSS & Modern UI Engineering",
      category: "fullstack",
      level: "Beginner",
      duration: "14 Hours",
      lessonsCount: 30,
      rating: 4.8,
      studentsCount: 9400,
      imageIcon: "fa-solid fa-wind text-cyan-400",
      instructor: "Jordan Lee, Design Systems Engineer",
      summary: "Build ultra-fast, responsive, modern interfaces using utility-first CSS, dark mode switches, and custom config tokens.",
      badge: "Trending",
      modules: [
        { title: "Module 1: Utility-First Philosophy", lessons: ["Why Tailwind CSS?", "Core Layout & Spacing", "Typography & Color Palettes", "Responsive Modifiers"] },
        { title: "Module 2: Interactive States & Dark Mode", lessons: ["Hover, Focus & Group States", "Dark Mode Implementation", "Transitions & Keyframe Utilities", "Glassmorphism & Backdrop Filters"] },
        { title: "Module 3: Customizing Tailwind", lessons: ["Extending tailwind.config.js", "Arbitrary Values & JIT Engine", "@layer Components & Directives", "Building Reusable Component Libraries"] }
      ]
    },
    {
      id: "course-python-fastapi",
      title: "Full-Stack Python & FastAPI Backend API",
      category: "fullstack",
      level: "Intermediate",
      duration: "32 Hours",
      lessonsCount: 64,
      rating: 4.9,
      studentsCount: 12800,
      imageIcon: "fa-brands fa-python text-emerald-400",
      instructor: "Dr. Sarah Chen, Backend & AI Architect",
      summary: "Build production-ready asynchronous REST APIs with Python, FastAPI, Pydantic validation, JWT authentication, and SQLAlchemy.",
      badge: "High Demand",
      modules: [
        { title: "Module 1: Python Deep Dive", lessons: ["Data Structures & Comprehensions", "Functions, *args, **kwargs", "OOP in Python & Dunder Methods", "Decorators & Context Managers"] },
        { title: "Module 2: FastAPI & Asynchronous Architecture", lessons: ["Path Operations & Query Params", "Pydantic Schemas & Data Validation", "Dependency Injection System", "Exception Handling & Middleware"] },
        { title: "Module 3: Database ORM & Security", lessons: ["SQLAlchemy Models & Migrations", "Connecting PostgreSQL Database", "JWT Token Auth & Password Hashing", "Role-Based Access Control"] },
        { title: "Module 4: Deployment & Testing", lessons: ["Pytest Unit & Integration Tests", "Dockerizing FastAPI Applications", "Deploying on Cloud Services", "Interactive Swagger OpenAPI Docs"] }
      ]
    },
    {
      id: "course-java-spring",
      title: "Enterprise Java & Spring Boot Microservices",
      category: "fullstack",
      level: "Intermediate",
      duration: "38 Hours",
      lessonsCount: 72,
      rating: 4.9,
      studentsCount: 8900,
      imageIcon: "fa-brands fa-java text-red-500",
      instructor: "Vikram Malhotra, Enterprise Architect",
      summary: "Build enterprise-grade scalable microservices using Java 21, Spring Boot 3, Spring Data JPA, Hibernate, and Spring Security.",
      badge: "Enterprise Standard",
      modules: [
        { title: "Module 1: Java Core & Modern Features", lessons: ["OOP Principles & Design Patterns", "Java Collections & Generics", "Streams API & Lambdas", "Java 21 Virtual Threads"] },
        { title: "Module 2: Spring Boot 3 Architecture", lessons: ["Spring IoC & Dependency Injection", "Spring MVC & REST Controllers", "DTO Pattern & ModelMapper", "Spring Validation Framework"] },
        { title: "Module 3: Persistence with Spring Data JPA", lessons: ["Entity Mapping & Relationships", "Spring Data Repositories", "Custom JPQL & Native Queries", "Transaction Management"] },
        { title: "Module 4: Security & Microservices", lessons: ["Spring Security & JWT Filters", "API Gateway & Service Discovery", "Unit Testing with JUnit 5 & Mockito", "Building Hotel Management API"] }
      ]
    },
    {
      id: "course-sql-database",
      title: "Relational Database Design & SQL Mastery",
      category: "fullstack",
      level: "Beginner - Intermediate",
      duration: "20 Hours",
      lessonsCount: 45,
      rating: 4.8,
      studentsCount: 16500,
      imageIcon: "fa-solid fa-database text-blue-400",
      instructor: "Aria Thorne, Database Administrator",
      summary: "Master SQL from basic CRUD and complex multi-table joins to indexing optimization, transactions, and relational schema architecture.",
      badge: "Essential",
      modules: [
        { title: "Module 1: SQL Foundations", lessons: ["Relational Database Models", "SELECT, WHERE, ORDER BY, LIMIT", "Aggregate Functions (COUNT, SUM, AVG)", "GROUP BY & HAVING Clauses"] },
        { title: "Module 2: Complex Relational Joins", lessons: ["INNER, LEFT, RIGHT & FULL JOINs", "Self Joins & Cross Joins", "Subqueries & Correlated Subqueries", "Common Table Expressions (CTEs)"] },
        { title: "Module 3: Database Engineering & Schema Design", lessons: ["Normalization (1NF, 2NF, 3NF)", "Primary & Foreign Key Constraints", "Indexes & Query Performance Tuning", "ACID Transactions (COMMIT, ROLLBACK)"] }
      ]
    },
    {
      id: "course-ai-foundations",
      title: "Foundations of AI & Machine Learning",
      category: "ai",
      level: "Beginner",
      duration: "22 Hours",
      lessonsCount: 48,
      rating: 4.9,
      studentsCount: 21300,
      imageIcon: "fa-solid fa-brain text-purple-400",
      instructor: "Dr. Aris Thorne, AI Research Lead",
      summary: "Comprehensive introduction to AI paradigms, Supervised vs Unsupervised ML, Regression, Classification, and Scikit-Learn pipelines.",
      badge: "Most Popular",
      modules: [
        { title: "Module 1: Introduction to AI & Data", lessons: ["What is AI, ML & Deep Learning?", "Types of AI (ANI, AGI, ASI)", "NumPy Arrays & Mathematical Operations", "Pandas for Data Wrangling"] },
        { title: "Module 2: Supervised Learning Algorithms", lessons: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "K-Nearest Neighbors (KNN)", "Model Evaluation Metrics (F1, ROC-AUC)"] },
        { title: "Module 3: Unsupervised Learning & Clustering", lessons: ["K-Means Clustering", "Principal Component Analysis (PCA)", "Hierarchical Clustering", "Detecting Anomalies in Data"] }
      ]
    },
    {
      id: "course-genai-llm",
      title: "Generative AI, LLMs & Prompt Engineering",
      category: "ai",
      level: "Intermediate",
      duration: "30 Hours",
      lessonsCount: 55,
      rating: 5.0,
      studentsCount: 24600,
      imageIcon: "fa-solid fa-wand-magic-sparkles text-pink-400",
      instructor: "Sofia Alvarez, GenAI Lead",
      summary: "Learn to build cutting-edge applications using Large Language Models, RAG with Vector Databases, OpenAI APIs, and prompt techniques.",
      badge: "Flagship AI Track",
      modules: [
        { title: "Module 1: LLM Core Principles", lessons: ["Transformer Architecture Overview", "Tokenization & Context Windows", "Temperature, Top_p & Sampling", "Open-Weight vs Proprietary Models"] },
        { title: "Module 2: Advanced Prompt Engineering", lessons: ["Zero-Shot & Few-Shot Prompting", "Chain-of-Thought & Self-Consistency", "System Personas & Output Formatting", "Prompt Injection Defense"] },
        { title: "Module 3: Retrieval-Augmented Generation (RAG)", lessons: ["Vector Embeddings Explained", "Vector Databases (Pinecone, ChromaDB)", "Chunking Strategies & Hybrid Search", "Building an AI Knowledge Base"] },
        { title: "Module 4: Fine-Tuning & Local LLMs", lessons: ["PEFT & LoRA Fine-Tuning", "Running Local Models with Ollama", "Function Calling & Structured Outputs", "Building Production AI Assistants"] }
      ]
    },
    {
      id: "course-nlp-pytorch",
      title: "Natural Language Processing with Python & Transformers",
      category: "ai",
      level: "Intermediate",
      duration: "24 Hours",
      lessonsCount: 50,
      rating: 4.8,
      studentsCount: 7800,
      imageIcon: "fa-solid fa-comments text-amber-400",
      instructor: "Kenji Sato, NLP Research Engineer",
      summary: "Process human language using Hugging Face Transformers, BERT, sentiment analysis, text classification, and PyTorch models.",
      badge: "Specialized",
      modules: [
        { title: "Module 1: Text Preprocessing & Embeddings", lessons: ["Tokenization & Lemmatization", "TF-IDF & N-grams", "Word2Vec & GloVe Vectors", "spaCy Pipeline Customization"] },
        { title: "Module 2: Hugging Face & Transformer Models", lessons: ["BERT & RoBERTa Architecture", "Hugging Face Datasets & Pipelines", "Text Classification Fine-Tuning", "Named Entity Recognition (NER)"] },
        { title: "Module 3: Sequence-to-Sequence Generation", lessons: ["T5 & BART for Summarization", "Neural Machine Translation", "Evaluation with BLEU and ROUGE", "Deploying NLP API Service"] }
      ]
    },
    {
      id: "course-ai-agents",
      title: "Autonomous AI Agents & Multi-Agent Systems",
      category: "ai",
      level: "Intermediate",
      duration: "28 Hours",
      lessonsCount: 52,
      rating: 4.9,
      studentsCount: 11200,
      imageIcon: "fa-solid fa-robot text-rose-400",
      instructor: "David Sterling, Autonomous Systems Director",
      summary: "Build autonomous AI agents that can browse the web, write and run code, use databases, and collaborate with other AI agents via LangGraph and CrewAI.",
      badge: "Cutting-Edge",
      modules: [
        { title: "Module 1: Agent Foundations & ReAct", lessons: ["Agent Perception & Action Cycles", "ReAct Framework Implementation", "Tool Definition & Execution", "Short-term and Long-term Memory"] },
        { title: "Module 2: LangGraph & Stateful Workflows", lessons: ["Graph-Based Agent Workflows", "State Machines & Checkpointing", "Human-in-the-Loop Approval Gates", "Error Recovery & Self-Correction Loops"] },
        { title: "Module 3: Multi-Agent Teams (CrewAI)", lessons: ["Defining Agent Roles & Goals", "Task Delegation & Inter-Agent Chat", "Automating Full-Stack Software Builds", "Deploying Autonomous Agent Workers"] }
      ]
    },
    {
      id: "course-fullstack-complete",
      title: "Full-Stack Web Development: Zero to Production",
      category: "fullstack",
      level: "Beginner - Intermediate",
      duration: "45 Hours",
      lessonsCount: 95,
      rating: 4.9,
      studentsCount: 31000,
      imageIcon: "fa-solid fa-layer-group text-blue-500",
      instructor: "TechNova Core Faculty Team",
      summary: "The definitive full-stack curriculum: HTML5, CSS3, JavaScript, Tailwind, Python Backend, SQL Database, and Git deployment.",
      badge: "Complete Career Track",
      modules: [
        { title: "Part 1: Modern Frontend", lessons: ["HTML5 & CSS3 Standards", "Tailwind CSS Styling", "JavaScript ES6+ Dynamics", "Interactive UI Systems"] },
        { title: "Part 2: Backend Development", lessons: ["Python Backend Fundamentals", "FastAPI Asynchronous Architecture", "RESTful API Endpoints", "JWT Authentication"] },
        { title: "Part 3: Database & SQL", lessons: ["Relational Database Modeling", "PostgreSQL & SQL Queries", "ORM Integration", "Transactions & Performance"] },
        { title: "Part 4: Production Deployment", lessons: ["Git & GitHub Workflow", "Docker Containerization", "Cloud Hosting & CI/CD", "Final Capstone Project"] }
      ]
    },
    {
      id: "course-cv-vision",
      title: "Computer Vision & Multimodal AI Systems",
      category: "ai",
      level: "Intermediate",
      duration: "25 Hours",
      lessonsCount: 46,
      rating: 4.8,
      studentsCount: 6500,
      imageIcon: "fa-solid fa-eye text-teal-400",
      instructor: "Dr. Maya Lin, Vision AI Scientist",
      summary: "Build intelligent visual systems with OpenCV, YOLO object detection, image segmentation, and Multimodal Vision LLMs.",
      badge: "Advanced Vision",
      modules: [
        { title: "Module 1: Image Processing with OpenCV", lessons: ["Pixel Arrays & Color Channels", "Filtering, Edges & Contours", "Face & Feature Detection", "Real-Time Video Capture Streams"] },
        { title: "Module 2: Object Detection with YOLO", lessons: ["YOLO Architecture Overview", "Training Custom YOLO Models", "Bounding Box Inference & NMS", "Real-Time Tracking Pipelines"] },
        { title: "Module 3: Vision Transformers & Multimodal LLMs", lessons: ["Vision Transformers (ViT)", "CLIP Zero-Shot Image Classification", "GPT-4 Vision API Integration", "Building Image Analysis Systems"] }
      ]
    }
  ],

  // ==========================================
  // 3. REAL-WORLD PROJECTS DATA
  // ==========================================
  projects: [
    {
      id: "proj-portfolio",
      title: "Personal Developer Portfolio",
      category: "frontend",
      difficulty: "Beginner",
      techStack: ["HTML5", "Tailwind CSS", "JavaScript", "CSS3"],
      icon: "fa-solid fa-id-badge text-cyan-400",
      description: "A futuristic personal developer portfolio featuring smooth antigravity glassmorphism, responsive project showcase, dark/light mode toggle, and an interactive contact form.",
      features: [
        "Interactive hero section with animated technology pills",
        "Dynamic project showcase filter (Frontend, Backend, AI)",
        "Dark / Light theme switcher with local storage persistence",
        "Form validation with real-time feedback",
        "Responsive across mobile, tablet, and 4K desktop screens"
      ],
      architecture: "Static Single-Page Application (SPA) architecture with client-side localStorage state and responsive CSS Grid/Flexbox.",
      dbSchema: "Client-side state (No database required; optional contact form webhook)."
    },
    {
      id: "proj-ecommerce",
      title: "Responsive E-Commerce Platform",
      category: "fullstack",
      difficulty: "Intermediate",
      techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "SQL"],
      icon: "fa-solid fa-cart-shopping text-emerald-400",
      description: "A full-featured responsive online store with product category filtering, instant search, dynamic cart drawer, discount coupon engine, and checkout simulation.",
      features: [
        "Interactive product catalog with category & price filtering",
        "Slide-out shopping cart with real-time total & tax calculation",
        "Product details modal with image preview gallery",
        "Coupon code validation (e.g., TECHNOVA20 for 20% off)",
        "Checkout form with multi-step validation and order summary"
      ],
      architecture: "Modular JavaScript frontend interacting with RESTful product/order APIs backed by a relational SQL product schema.",
      dbSchema: `CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1),
  stock INT DEFAULT 10
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'PAID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
      id: "proj-hotel-mgmt",
      title: "Hotel Management & Reservation System",
      category: "backend",
      difficulty: "Intermediate",
      techStack: ["Java", "Spring Boot", "SQL", "Bootstrap 5", "JavaScript"],
      icon: "fa-solid fa-hotel text-purple-400",
      description: "An enterprise-style hotel reservation and room management platform with room availability calendar, guest check-in/check-out, billing reports, and admin dashboard.",
      features: [
        "Real-time room availability matrix and booking dates selector",
        "Room categorization (Deluxe, Suite, Standard) with pricing tiers",
        "Guest registration and check-in / check-out workflows",
        "Automated invoice and PDF billing summary generation",
        "Admin analytics dashboard showing occupancy rates and revenue"
      ],
      architecture: "Spring Boot 3 REST Backend with Spring Data JPA entities, PostgreSQL/MySQL database, and responsive frontend UI.",
      dbSchema: `CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  room_number VARCHAR(10) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  price_per_night DECIMAL(8,2) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guest_name VARCHAR(100) NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  room_id INT REFERENCES rooms(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);`
    },
    {
      id: "proj-student-mgmt",
      title: "Student Academic Management System",
      category: "backend",
      difficulty: "Intermediate",
      techStack: ["Python", "FastAPI", "SQL", "Tailwind CSS", "JavaScript"],
      icon: "fa-solid fa-graduation-cap text-blue-400",
      description: "A complete educational institution portal for managing student records, course enrollments, grade point averages (GPA), attendance tracking, and transcript generation.",
      features: [
        "Student CRUD operations with email & phone uniqueness validation",
        "Course enrollment management and prerequisite tracking",
        "Dynamic GPA calculator and semester transcript generator",
        "Attendance percentage tracking with low-attendance warnings",
        "Search & filter student records by department, year, and performance"
      ],
      architecture: "FastAPI asynchronous backend with Pydantic schemas, SQLAlchemy ORM, and Tailwind CSS responsive interface.",
      dbSchema: `CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  department VARCHAR(50) NOT NULL,
  gpa NUMERIC(3,2) DEFAULT 0.00
);

CREATE TABLE course_grades (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_code VARCHAR(20) NOT NULL,
  grade_letter VARCHAR(2) NOT NULL,
  score_pct NUMERIC(5,2) NOT NULL
);`
    },
    {
      id: "proj-todo-kanban",
      title: "Interactive Kanban & Task Manager",
      category: "frontend",
      difficulty: "Beginner",
      techStack: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
      icon: "fa-solid fa-list-check text-yellow-400",
      description: "An agile task management application with drag-and-drop Kanban columns (Backlog, In Progress, Review, Completed), priority badges, due dates, and localStorage backup.",
      features: [
        "Drag-and-drop task movement across status columns",
        "Priority tags (High, Medium, Low) and color-coded labels",
        "Due-date tracking with overdue indicators",
        "Instant search and filter by keyword or tag",
        "Export/Import board data as JSON"
      ],
      architecture: "Client-side state management using HTML5 Drag and Drop API and JSON localStorage serialization.",
      dbSchema: "Client-side JSON state store."
    },
    {
      id: "proj-weather-app",
      title: "Real-Time Weather & Climate Intelligence",
      category: "frontend",
      difficulty: "Beginner",
      techStack: ["JavaScript", "HTML5", "Tailwind CSS", "Fetch API"],
      icon: "fa-solid fa-cloud-sun-rain text-cyan-300",
      description: "A sleek global weather app providing real-time conditions, 5-day hourly forecasts, air quality index (AQI), interactive radar maps, and geo-location auto-detection.",
      features: [
        "City search with instant autocomplete suggestions",
        "Current weather metrics: Temperature, Humidity, UV Index, Wind Speed",
        "5-day forecast with daily highs and lows chart",
        "Dynamic background theme that adapts to day/night and current weather",
        "Favorite cities bookmarking list"
      ],
      architecture: "Asynchronous REST API client interfacing with OpenWeatherMap / WeatherAPI endpoints.",
      dbSchema: "Local storage cache for favorite locations and recent search history."
    },
    {
      id: "proj-tech-blog",
      title: "Full-Stack Tech Publication & CMS",
      category: "fullstack",
      difficulty: "Intermediate",
      techStack: ["Python", "SQL", "JavaScript", "Tailwind CSS", "HTML5"],
      icon: "fa-solid fa-newspaper text-indigo-400",
      description: "A modern developer publication platform with Markdown editor, syntax highlighting, article tagging, user comments, bookmarks, and RSS feed generation.",
      features: [
        "Live Markdown editor with split-screen HTML preview",
        "Syntax highlighting for 20+ programming languages",
        "Nested comment threads with upvote counter",
        "Reading time calculator and table of contents generator",
        "Author profile page with published articles list"
      ],
      architecture: "Python FastAPI/Flask server rendering dynamic articles and saving Markdown content to relational database.",
      dbSchema: `CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  content_markdown TEXT NOT NULL,
  author_id INT NOT NULL,
  views_count INT DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
      id: "proj-ai-chatbot",
      title: "Autonomous AI Customer Support Chatbot",
      category: "ai",
      difficulty: "Intermediate",
      techStack: ["Python", "Generative AI", "NLP", "JavaScript", "Tailwind CSS"],
      icon: "fa-solid fa-robot text-purple-400",
      description: "A customer service AI agent trained on TechNova documentation capable of answering student questions, explaining code snippets, and solving technical queries.",
      features: [
        "Natural language conversation with context memory",
        "Streaming response animation for fast perceived speed",
        "Preset quick-prompt chips ('How do I learn Full-Stack?', 'Explain Prompting')",
        "Markdown & code snippet rendering in chat bubbles with copy button",
        "Fallback escalation mechanism for complex support queries"
      ],
      architecture: "Python backend connecting to LLM streaming endpoints with vector similarity search for knowledge retrieval.",
      dbSchema: `CREATE TABLE chat_sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(100) UNIQUE,
  user_email VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  session_id INT REFERENCES chat_sessions(id),
  sender VARCHAR(10) CHECK (sender IN ('user', 'assistant')),
  message_text TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
      id: "proj-ai-image-gen",
      title: "AI Image Generation & Canvas Studio",
      category: "ai",
      difficulty: "Intermediate",
      techStack: ["JavaScript", "Python", "Generative AI", "Tailwind CSS", "HTML5"],
      icon: "fa-solid fa-palette text-pink-400",
      description: "An AI creative studio application that generates photorealistic artwork, tech illustrations, and user interface concepts from detailed text prompts.",
      features: [
        "Prompt builder with style presets (Cyberpunk, Realistic, Anime, 3D Render)",
        "Aspect ratio selector (1:1, 16:9, 9:16)",
        "Negative prompt input to eliminate unwanted artifacts",
        "Interactive image gallery with download and HD upscaling",
        "Prompt history inspector and community prompt feed"
      ],
      architecture: "JavaScript frontend orchestrating asynchronous generation jobs through backend diffusion API endpoints.",
      dbSchema: `CREATE TABLE generated_images (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  style_preset VARCHAR(50),
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
      id: "proj-ai-recommender",
      title: "E-Commerce AI Recommendation Engine",
      category: "ai",
      difficulty: "Intermediate",
      techStack: ["Python", "Machine Learning", "SQL", "FastAPI", "JavaScript"],
      icon: "fa-solid fa-brain-circuit text-teal-400",
      description: "An intelligent recommendation system using collaborative filtering and content-based cosine similarity to suggest personalized courses and tech gear.",
      features: [
        "Collaborative filtering based on user learning behaviors",
        "Content-based similarity matching using text embeddings",
        "Real-time 'You Might Also Like' dynamic recommendations",
        "A/B testing analytics tracking click-through rates (CTR)",
        "Visual confidence score and reason explanation for recommendations"
      ],
      architecture: "Scikit-Learn / PyTorch recommendation microservice querying user interaction vectors from SQL database.",
      dbSchema: `CREATE TABLE user_interactions (
  id SERIAL PRIMARY KEY,
  user_id INT,
  item_id INT,
  interaction_type VARCHAR(20), -- 'view', 'enroll', 'complete'
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    }
  ],

  // ==========================================
  // 4. EXPLORE NEW TECHNOLOGIES DATA
  // ==========================================
  emergingTechnologies: [
    {
      name: "LangGraph & LangChain",
      category: "AI Tools",
      badge: "AI Framework",
      desc: "Graph-based framework for orchestrating stateful multi-agent systems and cyclical LLM workflows.",
      link: "https://python.langchain.com/"
    },
    {
      name: "Ollama & Local LLMs",
      category: "AI Tools",
      badge: "Open Source",
      desc: "Run open-weight models (Llama 3, DeepSeek, Mistral) locally on your GPU/CPU with a simple CLI.",
      link: "https://ollama.ai/"
    },
    {
      name: "Next.js 15 & React 19",
      category: "Web Development",
      badge: "Frontend & SSR",
      desc: "React full-stack framework with Server Actions, Server Components, and optimized rendering.",
      link: "https://nextjs.org/"
    },
    {
      name: "FastAPI 0.110+",
      category: "Web Development",
      badge: "Python Backend",
      desc: "Blazing-fast asynchronous Python web framework for building standard RESTful and GraphQL APIs.",
      link: "https://fastapi.tiangolo.com/"
    },
    {
      name: "Docker & Kubernetes",
      category: "Cloud Technologies",
      badge: "DevOps",
      desc: "Containerization and automated container orchestration for scalable cloud microservices.",
      link: "https://www.docker.com/"
    },
    {
      name: "Supabase & PostgreSQL",
      category: "Databases",
      badge: "Backend as a Service",
      desc: "Open-source Firebase alternative powered by full PostgreSQL, pgvector embeddings, and real-time auth.",
      link: "https://supabase.com/"
    },
    {
      name: "GitHub Copilot & Cursor",
      category: "Developer Tools",
      badge: "AI Code Editor",
      desc: "AI-native pair programming IDEs and code completion extensions accelerating developer productivity.",
      link: "https://cursor.com/"
    },
    {
      name: "Zero Trust Security & OAuth 2.1",
      category: "Cybersecurity",
      badge: "Security",
      desc: "Modern security protocols, PKCE authentication, and JWT authorization for distributed systems.",
      link: "https://oauth.net/2.1/"
    }
  ]
};

// Export to window for global access
window.TechNovaData = TechNovaData;
