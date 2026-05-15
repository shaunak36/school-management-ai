require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();

app.use(cors());
app.use(express.json());

/* ================================
   GROQ CONFIGURATION
================================ */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* ================================
   FAKE EXAM DATABASE
================================ */

const fakeExamData = {
  EXAM001: {
    subject: "Mathematics",

    questions: [
      {
        id: 1,
        question: "What is 2+2?",
        correctAnswer: "4",
        marks: 2
      },

      {
        id: 2,
        question: "What is 10x5?",
        correctAnswer: "50",
        marks: 2
      },

      {
        id: 3,
        question: "What is square root of 144?",
        correctAnswer: "12",
        marks: 3
      }
    ],

    totalMarks: 7
  }
};

/* ================================
   API : GRADE EXAM
================================ */

app.post('/api/grade', async (req, res) => {

  try {

    const {
      examId,
      studentId,
      studentAnswers
    } = req.body;

    const exam = fakeExamData[examId];

    if (!exam) {

      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    const gradingPrompt = `
You are a school exam grader.

Subject:
${exam.subject}

Questions and Correct Answers:
${exam.questions.map(q =>
  `Q${q.id}: ${q.question}
Correct Answer: ${q.correctAnswer}
Marks: ${q.marks}`
).join('\n\n')}

Student Answers:
${exam.questions.map(q =>
  `Q${q.id}: ${studentAnswers[q.id] || 'Not Attempted'}`
).join('\n\n')}

Return ONLY valid JSON:

{
  "results": [
    {
      "questionId": 1,
      "correct": true,
      "marksAwarded": 2,
      "feedback": "Correct answer"
    }
  ],

  "totalMarksAwarded": 5,
  "totalMarks": 7,
  "percentage": 71,
  "grade": "B"
}
`;

    const result = await groq.chat.completions.create({

      model: 'llama-3.3-70b-versatile',

      messages: [

        {
          role: 'system',
          content:
            'You are a school exam grader. Return only valid JSON.'
        },

        {
          role: 'user',
          content: gradingPrompt
        }
      ]
    });

    const reply =
      result.choices[0].message.content;

    const cleanedReply =
      reply.replace(/```json|```/g, '').trim();

    const gradingResult =
      JSON.parse(cleanedReply);

    res.json({
      success: true,
      examId,
      studentId,
      ...gradingResult
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* ================================
   HOME ROUTE
================================ */

app.get('/', (req, res) => {

  res.send(
    '✅ Grading API is running successfully!'
  );
});

/* ================================
   START SERVER
================================ */

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(
    `✅ Grading server running at http://localhost:${PORT}`
  );
});