require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const learningRouter = require('./learning');

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

console.log('API Key loaded:', process.env.GROQ_API_KEY ? 'YES' : 'NO - CHECK YOUR .ENV FILE');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/learning', learningRouter);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const fakeStudentData = {
  "STU001": {
    name: "Rahul Sharma",
    grade: "10",
    attendance: 78,
    fees: { paid: false, due: 4500, dueDate: "2026-06-01" },
    upcomingExams: [
      { subject: "Mathematics", date: "2026-05-20", time: "10:00 AM" },
      { subject: "Science",     date: "2026-05-22", time: "11:00 AM" }
    ],
    assignments: [
      { subject: "English", title: "Essay on AI", deadline: "2026-05-16", submitted: false },
      { subject: "Science", title: "Lab Report",  deadline: "2026-05-18", submitted: true  }
    ],
    timetable: {
      Monday:    ["Math", "English", "Science", "PE"],
      Tuesday:   ["Hindi", "Math", "History", "Art"],
      Wednesday: ["Science", "English", "Math", "Music"]
    },
    studyMaterials: [
      { subject: "Mathematics", link: "https://school.edu/materials/math-grade10.pdf" },
      { subject: "Science",     link: "https://school.edu/materials/science-grade10.pdf" }
    ]
  }
};

const fakeClassData = {
  lowAttendance: [
    { name: "Priya Patel",  id: "STU002", attendance: 62 },
    { name: "Amit Verma",   id: "STU003", attendance: 55 },
    { name: "Sneha Rao",    id: "STU004", attendance: 70 }
  ],
  pendingAssignments: [
    { student: "Rahul Sharma", subject: "English", title: "Essay on AI",   deadline: "2026-05-16" },
    { student: "Priya Patel",  subject: "Math",    title: "Problem Set 5", deadline: "2026-05-17" }
  ]
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, role, userId } = req.body;
    let schoolContext = '';

    if (role === 'student' && userId && fakeStudentData[userId]) {
      const student = fakeStudentData[userId];
      schoolContext = `
        Student Name: ${student.name}
        Grade: ${student.grade}
        Attendance: ${student.attendance}%
        Fee Due: ₹${student.fees.due} (Due on ${student.fees.dueDate}, Paid: ${student.fees.paid})
        Upcoming Exams: ${JSON.stringify(student.upcomingExams)}
        Assignments: ${JSON.stringify(student.assignments)}
        Today's Timetable (Monday): ${student.timetable.Monday.join(', ')}
        Study Material Links: ${JSON.stringify(student.studyMaterials)}
      `;
    }

    if (role === 'teacher') {
      schoolContext = `
        Low Attendance Students: ${JSON.stringify(fakeClassData.lowAttendance)}
        Pending Assignments: ${JSON.stringify(fakeClassData.pendingAssignments)}
      `;
    }

    if (role === 'parent' && userId && fakeStudentData[userId]) {
      const student = fakeStudentData[userId];
      schoolContext = `
        Child Name: ${student.name}
        Attendance: ${student.attendance}%
        Fee Status: ${student.fees.paid ? 'Paid' : `Due ₹${student.fees.due} by ${student.fees.dueDate}`}
        Upcoming Exams: ${JSON.stringify(student.upcomingExams)}
      `;
    }

    const systemPrompt = `
      You are a helpful school assistant chatbot for a school management system.
      You help ${role}s with school-related queries only.
      Here is the current data for this user:
      ${schoolContext}
      Rules:
      - Only answer school-related questions
      - Be friendly and concise (2-3 sentences max)
      - If data is available, use it directly in your answer
      - If asked something you don't have data for, say: "I don't have that info right now, please check with your school"
      - Respond in the same language the user types in (English/Hindi/Marathi)
    `;

    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ]
    });

    const reply = result.choices[0].message.content;
    res.json({ success: true, reply });

  } catch (error) {
    console.error('FULL ERROR:', error);
    res.status(500).json({ success: false, reply: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('School Chatbot API is running! Use POST /api/chat to chat.');
});

const PORT = process.env.PORT || 3000;
// Question Paper Generator endpoint
app.post('/api/generate-paper', async (req, res) => {
  try {
    const { subject, grade, totalQuestions, difficulty, topics } = req.body;

    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a school exam paper generator. Always respond with valid JSON only, no extra text.' },
        { role: 'user', content: `Generate a ${difficulty} difficulty ${subject} exam for Grade ${grade} with ${totalQuestions} questions covering: ${topics.join(', ')}. Return JSON with title, subject, grade, totalMarks, duration, and sections array with MCQ and short answer questions.` }
      ]
    });

    const reply = result.choices[0].message.content;
    const paper = JSON.parse(reply.replace(/```json|```/g, '').trim());
    res.json({ success: true, paper });

  } catch (error) {
    res.status(500).json({ success: false, reply: error.message });
  }
});
// ── GRADING ENDPOINT (Aayush Patil) ──────────────────────────────────────────
const fakeExamData = {
  EXAM001: {
    subject: "Mathematics",
    questions: [
      { id: 1, question: "What is 2+2?", correctAnswer: "4", marks: 2 },
      { id: 2, question: "What is 10x5?", correctAnswer: "50", marks: 2 },
      { id: 3, question: "What is square root of 144?", correctAnswer: "12", marks: 3 }
    ],
    totalMarks: 7
  }
};

app.post('/api/grade', async (req, res) => {
  try {
    const { examId, studentId, studentAnswers } = req.body;
    const exam = fakeExamData[examId];
    if (!exam) return res.status(404).json({ success: false, message: 'Exam not found' });

    const gradingPrompt = `
You are a school exam grader.
Subject: ${exam.subject}
Questions and Correct Answers:
${exam.questions.map(q => `Q${q.id}: ${q.question}\nCorrect Answer: ${q.correctAnswer}\nMarks: ${q.marks}`).join('\n\n')}
Student Answers:
${exam.questions.map(q => `Q${q.id}: ${studentAnswers[q.id] || 'Not Attempted'}`).join('\n\n')}
Return ONLY valid JSON:
{
  "results": [{"questionId": 1, "correct": true, "marksAwarded": 2, "feedback": "Correct answer"}],
  "totalMarksAwarded": 5,
  "totalMarks": 7,
  "percentage": 71,
  "grade": "B"
}`;

    const result = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a school exam grader. Return only valid JSON.' },
        { role: 'user', content: gradingPrompt }
      ]
    });

    const reply = result.choices[0].message.content;
    const gradingResult = JSON.parse(reply.replace(/```json|```/g, '').trim());
    res.json({ success: true, examId, studentId, ...gradingResult });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ── PERSONALIZED LEARNING ENDPOINTS (Team Member) ──────────────────────────

// Study Plan Generator
app.post('/api/study-plan', async (req, res) => {
  const { studentName = "Student", subject, weakTopics, grade = "10" } = req.body;
  
  if (!subject || !weakTopics) {
    return res.status(400).json({ error: "subject and weakTopics are required." });
  }
  
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: `You are a personalized learning assistant. Create a 7-day study plan and return ONLY valid JSON no markdown. Schema: {"studentName":"<name>","subject":"<subject>","weeklyPlan":[{"day":"<day>","topic":"<topic>","tasks":["<task>"],"duration":"<time>"}],"tips":["<tip>"],"resources":["<resource>"]}` 
        },
        { 
          role: "user", 
          content: `Student: ${studentName}, Grade: ${grade}, Subject: ${subject}, Weak Topics: ${weakTopics}` 
        }
      ]
    });
    
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const plan = JSON.parse(raw);
    res.json({ success: true, ...plan });
    
  } catch (e) {
    res.status(500).json({ error: "Failed to generate study plan." });
  }
});

// Learning Resource Recommender
app.post('/api/recommend', async (req, res) => {
  const { subject, topic, learningStyle = "visual" } = req.body;
  
  if (!subject || !topic) {
    return res.status(400).json({ error: "subject and topic are required." });
  }
  
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: `You are a learning resource recommender. Return ONLY valid JSON no markdown. Schema: {"topic":"<topic>","resources":[{"type":"<video/article/exercise>","title":"<title>","description":"<desc>","difficulty":"<easy/medium/hard>"}],"practiceQuestions":["<question>"],"estimatedTime":"<time>"}` 
        },
        { 
          role: "user", 
          content: `Subject: ${subject}, Topic: ${topic}, Learning Style: ${learningStyle}` 
        }
      ]
    });
    
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);
    res.json({ success: true, ...data });
    
  } catch (e) {
    res.status(500).json({ error: "Failed to get recommendations." });
  }
});

// Student Progress Analyzer
app.post('/api/progress', async (req, res) => {
  const { studentName = "Student", subject, scores } = req.body;
  
  if (!scores || !Array.isArray(scores)) {
    return res.status(400).json({ error: "scores array is required." });
  }
  
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: `You are a student progress analyzer. Return ONLY valid JSON no markdown. Schema: {"overallProgress":"<percentage>","strongTopics":["<topic>"],"weakTopics":["<topic>"],"nextSteps":["<step>"],"motivationalMessage":"<message>"}` 
        },
        { 
          role: "user", 
          content: `Student: ${studentName}, Subject: ${subject}, Scores: ${JSON.stringify(scores)}` 
        }
      ]
    });
    
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);
    res.json({ success: true, ...data });
    
  } catch (e) {
    res.status(500).json({ error: "Failed to analyze progress." });
  }
});
app.listen(PORT, () => {
  console.log(`✅ Chatbot server running at http://localhost:${PORT}`);
});