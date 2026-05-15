---

## 🧪 Testing the APIs

### Test Chatbot
```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explain Newton'\''s first law"}'
```

### Test Grading
```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/grade \
  -H "Content-Type: application/json" \
  -d '{"examId":"EXAM001","studentId":"STU101","studentAnswers":{"1":"4","2":"50","3":"12"}}'
```

### Test Question Paper
```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/generate-question-paper \
  -H "Content-Type: application/json" \
  -d '{"subject":"Science","grade":"8","difficulty":"easy","numQuestions":3}'
```

### Test Study Plan
```bash
curl -X POST https://school-ai-backend-zzs4.onrender.com/api/study-plan \
  -H "Content-Type: application/json" \
  -d '{"studentName":"Rahul","subject":"Physics","weakTopics":"Mechanics","grade":"11"}'
```

---

## 🧑‍💻 Team

**AI Team Members:**
- Shaunak Paul (Project Lead)
- Aayush Patil (Grading Module)
- Team Member (Learning Module)

---

## 📊 Status

| Module | Status | Deployed | Tested |
|--------|--------|----------|--------|
| Chatbot | ✅ | ✅ | ✅ |
| Grading | ✅ | ✅ | ✅ |
| Question Paper | ✅ | ✅ | ✅ |
| Study Plan | ✅ | ✅ | ⏳ |
| Recommendations | ✅ | ✅ | ⏳ |
| Progress Tracking | ✅ | ✅ | ⏳ |

---

## 🚀 Deployment

The project auto-deploys to Render on every push to the `main` branch.

**Live URL:** https://school-ai-backend-zzs4.onrender.com

---

## 📝 License

This project is part of the School Management System and is maintained by the AI Team.

---

## 🤝 Contributing

1. Pull latest changes: `git pull origin main`
2. Create your feature
3. Push to main: `git push origin main`
4. Render auto-deploys in 2-3 minutes!

---

**Built with ❤️ by the AI Team**