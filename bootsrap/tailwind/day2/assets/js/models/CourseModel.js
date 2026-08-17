/**
 * TechNova Learning Hub - MVC Model Layer: CourseModel
 * Contains complete curriculum, interactive lesson contents, code challenges, and quizzes.
 */

const CourseModel = {
  courses: [
    {
      id: "course-html-css",
      title: "Modern HTML5 & CSS3 Masterclass",
      category: "fullstack",
      level: "Beginner",
      duration: "18 Hours",
      lessonsCount: 4,
      rating: 4.9,
      studentsCount: 14200,
      imageThumb: "assets/images/courses/html-css-thumb.svg",
      imageIcon: "fa-brands fa-html5 text-orange-500",
      instructor: "Marcus Vance, Lead Frontend Architect",
      summary: "Start from complete zero and master modern HTML5 semantics, CSS3 Grid, Flexbox, responsive design, and CSS custom variables.",
      badge: "Best for Beginners",
      prerequisites: ["None - Complete beginner friendly"],
      outcomes: [
        "Master semantic HTML5 tags and accessibility standards (a11y)",
        "Build 100% responsive fluid layouts with CSS Grid & Flexbox",
        "Implement modern glassmorphism, transitions, and keyframe animations",
        "Deploy production websites to GitHub Pages & custom domains"
      ],
      modules: [
        {
          id: "m1",
          title: "Module 1: Modern HTML5 Semantics & Structure",
          lessons: [
            {
              id: "l1",
              title: "1.1 The Anatomy of a Modern Web Page & Semantic Hierarchy",
              duration: "25 min",
              type: "reading",
              content: `
                <h3>Welcome to HTML5 Semantics</h3>
                <p>HTML5 revolutionized web development by replacing generic <code>&lt;div&gt;</code> soup with meaningful, semantic elements. Semantic markup describes its meaning to both the browser and developer, drastically improving Search Engine Optimization (SEO) and screen-reader accessibility (a11y).</p>
                
                <h4>Key Semantic Elements:</h4>
                <ul>
                  <li><code>&lt;header&gt;</code>: Introductory content, page branding, or primary navigation wrapper.</li>
                  <li><code>&lt;nav&gt;</code>: Major navigational blocks containing links to key site destinations.</li>
                  <li><code>&lt;main&gt;</code>: The dominant, unique content of the document body. Only one allowed per page.</li>
                  <li><code>&lt;article&gt;</code>: Self-contained, independently distributable composition (e.g. blog post, product card).</li>
                  <li><code>&lt;section&gt;</code>: Thematic grouping of content, typically with a heading.</li>
                  <li><code>&lt;aside&gt;</code>: Content tangentially related to surrounding content (sidebars, callouts).</li>
                  <li><code>&lt;footer&gt;</code>: Closing section containing copyright, author info, and legal links.</li>
                </ul>

                <h4>Form Validation Attributes in HTML5:</h4>
                <p>Modern HTML5 forms remove the need for heavy JavaScript regex checks for standard inputs. Use <code>type="email"</code>, <code>type="tel"</code>, <code>required</code>, and <code>pattern="[0-9]{10}"</code> to trigger native browser validation states.</p>
              `,
              codeExercise: {
                initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Practice</title>
</head>
<body class="p-6 bg-slate-900 text-white font-sans">
  <!-- TODO: Convert these divs into semantic HTML5 tags -->
  <div class="border-b border-slate-700 pb-3 mb-4">
    <h1 class="text-2xl font-bold text-cyan-400">TechNova Academy</h1>
  </div>
  
  <div class="bg-slate-800 p-4 rounded-xl border border-slate-700">
    <h2 class="text-lg font-semibold text-blue-400">Semantic Web Architecture</h2>
    <p class="text-slate-300 text-sm mt-2">Semantic tags make web pages accessible and easily indexed.</p>
  </div>
</body>
</html>`,
                solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Practice</title>
</head>
<body class="p-6 bg-slate-900 text-white font-sans">
  <header class="border-b border-slate-700 pb-3 mb-4">
    <h1 class="text-2xl font-bold text-cyan-400">TechNova Academy</h1>
  </header>
  
  <main>
    <article class="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h2 class="text-lg font-semibold text-blue-400">Semantic Web Architecture</h2>
      <p class="text-slate-300 text-sm mt-2">Semantic tags make web pages accessible and easily indexed.</p>
    </article>
  </main>
</body>
</html>`
              },
              quiz: {
                question: "Which HTML5 tag is strictly designated to contain the central, non-repeating primary content of a document?",
                options: ["<section>", "<main>", "<article>", "<content>"],
                correctIndex: 1,
                explanation: "<main> represents the dominant content of the document body. There can only be one visible <main> element per document."
              }
            },
            {
              id: "l2",
              title: "1.2 Accessible Forms & Input Validation (Email & Phone)",
              duration: "30 min",
              type: "interactive",
              content: `
                <h3>Accessible HTML5 Forms with Built-in Validation</h3>
                <p>Enterprise applications demand clean user data. In this lesson, we build accessible form controls with native email, phone number patterns, and floating labels.</p>
                
                <h4>Best Practices for Form Controls:</h4>
                <ul>
                  <li>Always pair <code>&lt;label for="id"&gt;</code> with matching <code>&lt;input id="id"&gt;</code>.</li>
                  <li>Use <code>autocomplete="email"</code> and <code>autocomplete="tel"</code> for seamless autofill.</li>
                  <li>Enforce international phone requirements using regex pattern matching: <code>pattern="\\+?[0-9]{8,15}"</code>.</li>
                </ul>
              `,
              codeExercise: {
                initialCode: `<form class="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto space-y-4">
  <div>
    <label class="block text-xs text-slate-400 mb-1">Email Address</label>
    <input type="email" placeholder="name@domain.com" required class="w-full p-2.5 bg-slate-800 rounded-lg text-sm border border-slate-700">
  </div>
  <div>
    <label class="block text-xs text-slate-400 mb-1">Phone (with Country Code)</label>
    <input type="tel" placeholder="+1 555-0199" pattern="\\+?[0-9]{8,15}" required class="w-full p-2.5 bg-slate-800 rounded-lg text-sm border border-slate-700">
  </div>
  <button type="submit" class="w-full py-2.5 bg-blue-600 rounded-lg text-sm font-bold">Validate &amp; Submit</button>
</form>`,
                solution: `<form class="p-6 bg-slate-900 text-white rounded-2xl max-w-md mx-auto space-y-4">
  <div>
    <label class="block text-xs text-slate-400 mb-1">Email Address</label>
    <input type="email" placeholder="name@domain.com" required class="w-full p-2.5 bg-slate-800 rounded-lg text-sm border border-slate-700">
  </div>
  <div>
    <label class="block text-xs text-slate-400 mb-1">Phone (with Country Code)</label>
    <input type="tel" placeholder="+1 555-0199" pattern="\\+?[0-9]{8,15}" required class="w-full p-2.5 bg-slate-800 rounded-lg text-sm border border-slate-700">
  </div>
  <button type="submit" class="w-full py-2.5 bg-blue-600 rounded-lg text-sm font-bold">Validate &amp; Submit</button>
</form>`
              },
              quiz: {
                question: "Which input attribute specifies a regular expression that the form control's value is checked against?",
                options: ["regex", "validate", "pattern", "check"],
                correctIndex: 2,
                explanation: "The 'pattern' attribute specifies a regular expression that the <input> element's value is checked against on form submission."
              }
            }
          ]
        },
        {
          id: "m2",
          title: "Module 2: Modern CSS3 Layouts (Flexbox & CSS Grid)",
          lessons: [
            {
              id: "l3",
              title: "2.1 Flexbox 1D Alignment & Responsive Navigation Bars",
              duration: "35 min",
              type: "interactive",
              content: `
                <h3>Flexbox Layout Algorithm</h3>
                <p>Flexbox (Flexible Box Layout) is designed for 1-dimensional layouts (either row or column). It provides powerful distribution of space and alignment along main and cross axes.</p>
                
                <h4>Key Flexbox Properties:</h4>
                <ul>
                  <li><code>display: flex</code>: Activates flex context on direct child elements.</li>
                  <li><code>justify-content</code>: Aligns items along the main axis (flex-start, center, flex-end, space-between, space-around).</li>
                  <li><code>align-items</code>: Aligns items along the cross axis (stretch, center, flex-start, flex-end, baseline).</li>
                  <li><code>gap</code>: Defines gutters between flex items without requiring margin resets.</li>
                </ul>
              `,
              codeExercise: {
                initialCode: `<nav class="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
  <div class="font-bold text-cyan-400 text-lg">TechNova</div>
  <div class="flex items-center gap-4 text-xs font-semibold text-slate-300">
    <a href="#" class="hover:text-cyan-400">Home</a>
    <a href="#" class="hover:text-cyan-400">Courses</a>
    <a href="#" class="hover:text-cyan-400">Dashboard</a>
  </div>
  <button class="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-bold">Log In</button>
</nav>`,
                solution: `<nav class="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
  <div class="font-bold text-cyan-400 text-lg">TechNova</div>
  <div class="flex items-center gap-4 text-xs font-semibold text-slate-300">
    <a href="#" class="hover:text-cyan-400">Home</a>
    <a href="#" class="hover:text-cyan-400">Courses</a>
    <a href="#" class="hover:text-cyan-400">Dashboard</a>
  </div>
  <button class="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-bold">Log In</button>
</nav>`
              },
              quiz: {
                question: "Which Flexbox property distributes remaining extra space between items evenly along the main axis?",
                options: ["align-items: center", "justify-content: space-between", "flex-wrap: wrap", "align-content: space-evenly"],
                correctIndex: 1,
                explanation: "justify-content: space-between distributes items evenly, where the first item is flush with the start and the last item is flush with the end."
              }
            },
            {
              id: "l4",
              title: "2.2 CSS Grid 2D Systems & Responsive Card Grids",
              duration: "40 min",
              type: "interactive",
              content: `
                <h3>CSS Grid 2D Systems</h3>
                <p>CSS Grid is the only 2-dimensional layout system native to CSS. It handles both rows and columns simultaneously, eliminating float hacks and fragile margin calculations.</p>
                
                <h4>The Holy Grail Grid Formula:</h4>
                <pre><code>grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));</code></pre>
                <p>This single CSS declaration automatically creates responsive columns that wrap seamlessly without writing media queries!</p>
              `,
              codeExercise: {
                initialCode: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-950 text-white">
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-cyan-400">Course 01</h4>
    <p class="text-xs text-slate-400 mt-1">HTML5 & CSS3 Masterclass</p>
  </div>
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-emerald-400">Course 02</h4>
    <p class="text-xs text-slate-400 mt-1">Python & FastAPI Backend</p>
  </div>
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-purple-400">Course 03</h4>
    <p class="text-xs text-slate-400 mt-1">Generative AI & LLMs</p>
  </div>
</div>`,
                solution: `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-950 text-white">
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-cyan-400">Course 01</h4>
    <p class="text-xs text-slate-400 mt-1">HTML5 & CSS3 Masterclass</p>
  </div>
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-emerald-400">Course 02</h4>
    <p class="text-xs text-slate-400 mt-1">Python & FastAPI Backend</p>
  </div>
  <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
    <h4 class="font-bold text-purple-400">Course 03</h4>
    <p class="text-xs text-slate-400 mt-1">Generative AI & LLMs</p>
  </div>
</div>`
              },
              quiz: {
                question: "What CSS Grid unit represents a fraction of the available space in the grid container?",
                options: ["px", "rem", "fr", "%"],
                correctIndex: 2,
                explanation: "The 'fr' (fractional) unit represents a fraction of the available free space in the grid container."
              }
            }
          ]
        }
      ]
    },

    {
      id: "course-genai-llm",
      title: "Generative AI, LLMs & Prompt Engineering",
      category: "ai",
      level: "Intermediate",
      duration: "30 Hours",
      lessonsCount: 3,
      rating: 5.0,
      studentsCount: 24600,
      imageThumb: "assets/images/courses/genai-llm-thumb.svg",
      imageIcon: "fa-solid fa-wand-magic-sparkles text-pink-400",
      instructor: "Sofia Alvarez, GenAI Lead",
      summary: "Learn to build cutting-edge applications using Large Language Models, RAG with Vector Databases, OpenAI APIs, and prompt techniques.",
      badge: "Flagship AI Track",
      prerequisites: ["Basic Python or JavaScript knowledge", "Curiosity about AI models"],
      outcomes: [
        "Understand Transformer architectures, self-attention, and tokenization",
        "Master Zero-shot, Few-shot, and Chain-of-Thought Prompt Engineering",
        "Build Retrieval-Augmented Generation (RAG) knowledge systems with Vector Databases",
        "Deploy local open-weight LLMs (Llama 3, DeepSeek) using Ollama"
      ],
      modules: [
        {
          id: "m1",
          title: "Module 1: LLM Architecture & Tokens",
          lessons: [
            {
              id: "l1",
              title: "1.1 Transformers, Self-Attention & Tokens Demystified",
              duration: "35 min",
              type: "reading",
              content: `
                <h3>How Large Language Models Work</h3>
                <p>Large Language Models (LLMs) are deep neural networks based on the Transformer architecture introduced in the landmark paper <em>"Attention Is All You Need"</em> (Vaswani et al., 2017). Unlike older RNNs that processed text sequentially, Transformers process entire sequences simultaneously using self-attention mechanisms.</p>
                
                <h4>Key LLM Concepts:</h4>
                <ul>
                  <li><strong>Tokens</strong>: The fundamental chunks (words, subwords, or characters) that models read and generate. Approximately 100 tokens ≈ 75 English words.</li>
                  <li><strong>Context Window</strong>: The maximum number of tokens an LLM can hold in active memory at once (e.g. 128k in GPT-4o).</li>
                  <li><strong>Temperature</strong>: A sampling hyperparameter between 0.0 and 1.0. Lower values (0.0 - 0.3) make output deterministic and focused, while higher values (0.7 - 1.0) increase diversity and creativity.</li>
                </ul>
              `,
              codeExercise: {
                initialCode: `// Simulated Token Calculation Utility
function calculateTokenEstimate(text) {
  const words = text.trim().split(/\\s+/).length;
  const estimatedTokens = Math.round(words * 1.33);
  return {
    wordCount: words,
    tokenCount: estimatedTokens,
    costUSD: (estimatedTokens * 0.000005).toFixed(6)
  };
}

console.log(calculateTokenEstimate("TechNova Learning Hub teaches Full-Stack and AI Engineering from beginner to production."));`,
                solution: `function calculateTokenEstimate(text) {
  const words = text.trim().split(/\\s+/).length;
  const estimatedTokens = Math.round(words * 1.33);
  return {
    wordCount: words,
    tokenCount: estimatedTokens,
    costUSD: (estimatedTokens * 0.000005).toFixed(6)
  };
}`
              },
              quiz: {
                question: "What parameter controls the randomness and creativity of an LLM's token sampling?",
                options: ["top_k", "temperature", "max_tokens", "presence_penalty"],
                correctIndex: 1,
                explanation: "Temperature scales the logits before the softmax activation; lower values produce more deterministic text, while higher values yield more random/creative text."
              }
            },
            {
              id: "l2",
              title: "1.2 Advanced Prompt Engineering (Few-Shot & CoT)",
              duration: "40 min",
              type: "interactive",
              content: `
                <h3>Chain-of-Thought (CoT) Prompting</h3>
                <p>Prompt engineering is the practice of structuring inputs to unlock superior reasoning from LLMs without updating model weights.</p>
                
                <h4>Proven Prompting Patterns:</h4>
                <ul>
                  <li><strong>Zero-Shot</strong>: Directly asking the model to perform a task without examples.</li>
                  <li><strong>Few-Shot</strong>: Providing 2-3 worked input/output demonstrations before the final query.</li>
                  <li><strong>Chain-of-Thought (CoT)</strong>: Instructing the model to <em>"Think step-by-step before answering"</em>, which dramatically increases accuracy in mathematical, algorithmic, and architectural reasoning.</li>
                </ul>
              `,
              codeExercise: {
                initialCode: `<!-- Chain of Thought Master Prompt Template -->
<system>
You are TechNova Principal Cloud Architect. Think step-by-step.
</system>

<context>
Building a real-time multiplayer coding room for 10,000 concurrent students.
</context>

<instruction>
Evaluate WebSockets vs Server-Sent Events (SSE) and provide the optimal stack recommendation.
</instruction>`,
                solution: `<!-- Master Prompt Tested & Verified -->`
              },
              quiz: {
                question: "Why does Chain-of-Thought (CoT) prompting improve LLM problem-solving accuracy?",
                options: [
                  "It doubles the token context limit of the server",
                  "It allows the model to generate intermediate reasoning tokens before reaching the conclusion",
                  "It permanently updates the weights of the underlying transformer",
                  "It converts text into relational SQL queries"
                ],
                correctIndex: 1,
                explanation: "By generating intermediate reasoning steps, the model has more computation tokens to explore logical deductions before producing its final answer."
              }
            }
          ]
        },
        {
          id: "m2",
          title: "Module 2: RAG & Vector Databases",
          lessons: [
            {
              id: "l3",
              title: "2.1 Retrieval-Augmented Generation (RAG) Architecture",
              duration: "45 min",
              type: "interactive",
              content: `
                <h3>Retrieval-Augmented Generation (RAG)</h3>
                <p>RAG connects LLMs to your private proprietary data (PDFs, SQL databases, codebases) without expensive model fine-tuning.</p>
                
                <h4>The 3-Step RAG Pipeline:</h4>
                <ol>
                  <li><strong>Ingestion & Chunking</strong>: Documents are split into semantic chunks and converted to vector embeddings using an embedding model.</li>
                  <li><strong>Vector Indexing</strong>: Embeddings are indexed in vector databases (e.g. Pinecone, ChromaDB, pgvector).</li>
                  <li><strong>Retrieval & Generation</strong>: User query is converted to a vector, the top-k most similar document chunks are retrieved via Cosine Similarity, and injected into the LLM context prompt to generate an accurate, grounded answer!</li>
                </ol>
              `,
              codeExercise: {
                initialCode: `// Concept RAG Similarity Matcher
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

const queryVector = [0.85, 0.45, 0.12];
const docVector = [0.82, 0.48, 0.10];
console.log("Semantic Match Score:", cosineSimilarity(queryVector, docVector).toFixed(4));`,
                solution: `function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}`
              },
              quiz: {
                question: "What mathematical metric is most commonly used to measure the semantic similarity between two embedding vectors?",
                options: ["Cosine Similarity", "Euclidean Distance squared", "Manhattan distance", "Standard Deviation"],
                correctIndex: 0,
                explanation: "Cosine similarity measures the cosine of the angle between two multi-dimensional vectors, evaluating semantic orientation regardless of magnitude."
              }
            }
          ]
        }
      ]
    },

    {
      id: "course-python-fastapi",
      title: "Full-Stack Python & FastAPI Backend API",
      category: "fullstack",
      level: "Intermediate",
      duration: "32 Hours",
      lessonsCount: 3,
      rating: 4.9,
      studentsCount: 12800,
      imageThumb: "assets/images/courses/python-fastapi-thumb.svg",
      imageIcon: "fa-brands fa-python text-emerald-400",
      instructor: "Dr. Sarah Chen, Backend & AI Architect",
      summary: "Build production-ready asynchronous REST APIs with Python, FastAPI, Pydantic validation, JWT authentication, and SQLAlchemy.",
      badge: "High Demand",
      prerequisites: ["Basic Python syntax", "Understanding of HTTP requests"],
      outcomes: [
        "Build blazing-fast async REST APIs with FastAPI and Starlette",
        "Enforce strict input validation using Pydantic V2 schemas",
        "Implement secure JWT authentication and password hashing with passlib",
        "Connect PostgreSQL databases using SQLAlchemy ORM"
      ],
      modules: [
        {
          id: "m1",
          title: "Module 1: FastAPI Fundamentals & Schemas",
          lessons: [
            {
              id: "l1",
              title: "1.1 Asynchronous Routing & Path Parameters",
              duration: "30 min",
              type: "interactive",
              content: `
                <h3>Why FastAPI?</h3>
                <p>FastAPI is one of the fastest Python frameworks available, on par with NodeJS and Go. It is powered by Starlette for web routing and Pydantic for data validation, automatically generating interactive OpenAPI (Swagger) documentation.</p>
              `,
              codeExercise: {
                initialCode: `from fastapi import FastAPI

app = FastAPI(title="TechNova API")

@app.get("/")
async def root():
    return {"message": "Welcome to TechNova FastAPI Backend!"}`,
                solution: `from fastapi import FastAPI\n\napp = FastAPI(title="TechNova API")\n\n@app.get("/")\nasync def root():\n    return {"message": "Welcome to TechNova FastAPI Backend!"}`
              },
              quiz: {
                question: "Which Python standard library feature enables asynchronous concurrency in FastAPI?",
                options: ["asyncio", "threading", "multiprocessing", "subprocess"],
                correctIndex: 0,
                explanation: "asyncio provides the async/await syntax and asynchronous event loop that powers FastAPI."
              }
            }
          ]
        }
      ]
    }
  ],

  getAll() {
    return this.courses;
  },

  getById(id) {
    return this.courses.find(c => c.id === id) || this.courses[0];
  },

  getByCategory(cat) {
    if (cat === "all") return this.courses;
    return this.courses.filter(c => c.category === cat);
  }
};

window.CourseModel = CourseModel;
