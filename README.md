# 🏫 School Management System - AI Backend

A production-ready AI-powered backend for a School Management System built with Node.js, Express, and Groq AI (LLaMA 3.3 70B).

---

## 🚀 Live Deployment

**Live URL:**  
https://school-ai-backend-exza.onrender.com

---

## 🧪 Testing the APIs

### Test Chatbot

```bash
curl -X POST https://school-ai-backend-exza.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"What is my attendance?\",\"role\":\"student\",\"userId\":\"STU001\"}"
```

---

### Test Grading

```bash
curl -X POST https://school-ai-backend-exza.onrender.com/api/grade \
  -H "Content-Type: application/json" \
  -d "{\"examId\":\"EXAM001\",\"studentId\":\"STU101\",\"studentAnswers\":{\"1\":\"4\",\"2\":\"50\",\"3\":\"12\"}}"
```

---

### Test Question Paper

```bash
curl -X POST https://school-ai-backend-exza.onrender.com/api/generate-paper \
  -H "Content-Type: application/json" \
  -d "{\"subject\":\"Science\",\"grade\":\"8\",\"difficulty\":\"easy\",\"totalQuestions\":5,\"topics\":[\"Physics\",\"Chemistry\"]}"
```

---

### Test Study Plan

```bash
curl -X POST https://school-ai-backend-exza.onrender.com/api/learning/study-plan \
  -H "Content-Type: application/json" \
  -d "{\"studentName\":\"Rahul\",\"subject\":\"Physics\",\"weakTopics\":\"Mechanics\",\"grade\":\"11\"}"
```

---

## ✨ AI Features

| Module | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| 🤖 Intelligent Chatbot | `POST /api/chat` | Student/Teacher/Parent support chatbot | ✅ Live |
| ✅ Automated Grading | `POST /api/grade` | Auto grade MCQs and short answers | ✅ Live |
| 📄 Question Paper Generator | `POST /api/generate-paper` | Generate balanced exam papers for any subject | ✅ Live |
| 🧠 Personalized Study Plan | `POST /api/learning/study-plan` | Generate 7-day personalized study plans | ✅ Live |
| 📚 Resource Recommender | `POST /api/learning/recommend` | Recommend study resources by topic | ✅ Live |
| 📈 Progress Analyzer | `POST /api/learning/progress` | Analyze student progress and suggest next steps | ✅ Live |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Model:** LLaMA 3.3 70B via Groq API (free tier)
- **Deployment:** Render.com (auto-deploy on push)
- **Other:** CORS, dotenv, groq-sdk

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/shaunak36/school-management-ai.git
cd school-management-ai

# Install dependencies
npm install

# Create .env file
echo "GROQ_API_KEY=your_key_here" > .env
echo "PORT=3000" >> .env

# Start server
node server.js
```

---

## 📁 Project Structure
school-management-ai/
├── server.js          # Main server — Chatbot + Question Paper + Grading endpoints
├── grading.js         # Grading module (standalone)
├── questionPaper.js   # Question paper module (standalone)
├── learning.js        # Personalized learning module (standalone)
├── .env               # Environment variables (not committed)
├── .gitignore
└── package.json

---

## ⚙️ Deployment

The project auto-deploys to Render on every push to the `main` branch.

Deployment Time: **2–3 minutes**

---

## 🔗 Related Repositories

- **Frontend:** https://github.com/shaunak36/shaunak36-school-management-frontend

---

## 👨‍💻 Developer

**Shaunak Paul**
- Final Year AI/ML Engineering Student
- St. John College of Engineering and Management, Mumbai
- GitHub: [@shaunak36](https://github.com/shaunak36)
- Built as part of capstone project + personal portfolio

---

## 📝 License

MIT License

---

## ❤️ Built By

Built with ❤️ by Shaunak Paul