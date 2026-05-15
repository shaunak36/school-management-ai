# 🧠 AI Grading Module - School Management System

This project is part of the AI Team module in the School Management System.

It automatically evaluates student answers using AI (Groq LLM) and generates marks, grade, and feedback.

---

## 🚀 Live API

https://school-ai-backend-zzs4.onrender.com

---

## 📌 API Endpoint

POST /api/grade

Full URL:
https://school-ai-backend-zzs4.onrender.com/api/grade

---

## 📥 Request Format

{
  "examId": "EXAM001",
  "studentId": "STU101",
  "studentAnswers": {
    "1": "4",
    "2": "50",
    "3": "12"
  }
}

---

## 📤 Response Format

{
  "success": true,
  "totalMarksAwarded": 5,
  "totalMarks": 7,
  "percentage": 71,
  "grade": "B"
}

---

## 🧠 Features

- AI-based answer evaluation
- Automatic grading system
- Marks calculation
- Grade generation
- Feedback per question

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Groq AI
- Render Deployment

---

## 🧪 Status

✔ Completed  
✔ Deployed  
✔ Tested  
✔ Ready for Integration
