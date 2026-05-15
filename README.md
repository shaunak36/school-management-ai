# School AI Backend

AI backend for the School Management System featuring:
- AI Chatbot
- Automated Grading System
- Attendance Analytics
- Performance Prediction
- Smart Notifications
- Question Paper Generator
- Personalized Learning
- Career Guidance
- Plagiarism Detection
- Smart Timetable Generator

---

## 🚀 Live Deployment

**Live URL:**  
https://school-ai-backend-zzs4.onrender.com

---

## 🧪 Testing the APIs

### Test Chatbot

```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Explain Newton's first law\"}"
```

---

### Test Grading

```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/grade \
  -H "Content-Type: application/json" \
  -d "{\"examId\":\"EXAM001\",\"studentId\":\"STU101\",\"studentAnswers\":{\"1\":\"4\",\"2\":\"50\",\"3\":\"12\"}}"
```

---

### Test Question Paper

```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/generate-question-paper \
  -H "Content-Type: application/json" \
  -d "{\"subject\":\"Science\",\"grade\":\"8\",\"difficulty\":\"easy\",\"numQuestions\":3}"
```

---

### Test Study Plan

```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/study-plan \
  -H "Content-Type: application/json" \
  -d "{\"studentName\":\"Rahul\",\"subject\":\"Physics\",\"weakTopics\":\"Mechanics\",\"grade\":\"11\"}"
```

---

## 🧑‍💻 AI Team Members

- Shaunak Paul (Project Lead)
- Aayush Patil
- Aayush Kushwaha
- Sairaj Patil
- Shubham Lande

---

## 🧠 AI Modules & Team Responsibilities

| Module ID | AI Module | Description | Assigned Member |
|-----------|-----------|-------------|-----------------|
| AI-01 | Intelligent Chatbot | Student support chatbot using NLP and LLM APIs | Shaunak Paul |
| AI-02 | Automated Grading System | Auto grading for MCQs and short answers | Aayush Patil |
| AI-03 | Attendance Analytics | Attendance tracking and risk prediction | Aayush Kushwaha |
| AI-04 | Performance Prediction | Predict student performance using AI models | Sairaj Patil |
| AI-05 | Smart Notification System | Personalized AI-based notifications | Shubham Lande |
| AI-06 | Question Paper Generator | Generate balanced question papers using AI | Shaunak Paul |
| AI-07 | Personalized Learning System | Adaptive learning recommendations | Aayush Patil |
| AI-08 | Career Guidance System | AI-based career suggestions | Aayush Kushwaha |
| AI-09 | Plagiarism Detection | Assignment similarity detection | Sairaj Patil |
| AI-10 | Smart Timetable Generator | Conflict-free timetable generation | Shubham Lande |

---

## 📊 Project Status

| Module | Status | Deployed | Tested |
|--------|--------|----------|--------|
| Chatbot | ✅ | ✅ | ✅ |
| Grading | ✅ | ✅ | ✅ |
| Question Paper | ✅ | ✅ | ✅ |
| Study Plan | ✅ | ✅ | ⏳ |
| Recommendations | ✅ | ✅ | ⏳ |
| Progress Tracking | ✅ | ✅ | ⏳ |

---

## ⚙️ Deployment

The project auto-deploys to Render on every push to the `main` branch.

Deployment Time: **2–3 minutes**

---

## 🤝 Contributing

1. Pull latest changes

```bash
git pull origin main
```

2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Push changes

```bash
git push origin main
```

4. Render auto-deploys automatically

---

## 📝 License

This project is part of the School Management System and is maintained by the AI Team.

---

## ❤️ Built By

Built with ❤️ by the AI Team