require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate-paper', async (req, res) => {
  try {
    const { subject, grade, totalQuestions, difficulty, topics } = req.body;

    const prompt = `
      Generate a school exam question paper with these details:
      Subject: ${subject}
      Grade: ${grade}
      Total Questions: ${totalQuestions}
      Difficulty: ${difficulty} (easy/medium/hard)
      Topics to cover: ${topics.join(', ')}
      
      Return ONLY a JSON object like this:
      {
        "title": "Mathematics Exam - Grade 10",
        "subject": "Mathematics",
        "grade": "10",
        "totalMarks": 50,
        "duration": "2 hours",
        "sections": [
          {
            "sectionName": "Section A - MCQ",
            "questions": [
              {
                "questionNo": 1,
                "question": "What is the value of pi?",
                "type": "MCQ",
                "options": ["3.14", "3.16", "3.12", "3.18"],
                "correctAnswer": "3.14",
                "marks": 1,
                "topic": "Constants",
                "difficulty": "easy"
              }
            ]
          },
          {
            "sectionName": "Section B - Short Answer",
            "questions": [
              {
                "questionNo": 6,
                "question": "Solve: 2x + 5 = 15",
                "type": "short",
                "correctAnswer": "x = 5",
                "marks": 3,
                "topic": "Algebra",
                "difficulty": "medium"
              }
            ]
          }
        ]
      }
    `;

    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a school exam paper generator. Always respond with valid JSON only, no extra text.' },
        { role: 'user', content: prompt }
      ]
    });

    const reply = result.choices[0].message.content;
    const paper = JSON.parse(reply.replace(/```json|```/g, '').trim());

    res.json({ success: true, paper });

  } catch (error) {
    res.status(500).json({ success: false, reply: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Question Paper Generator API running! Use POST /api/generate-paper');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`✅ Question Paper Generator running at http://localhost:${PORT}`));
