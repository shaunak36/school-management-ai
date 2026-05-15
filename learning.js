const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/study-plan", async (req, res) => {
  const { studentName = "Student", subject, weakTopics, grade = "10" } = req.body;
  if (!subject || !weakTopics) {
    return res.status(400).json({ error: "subject and weakTopics are required." });
  }
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: `You are a personalized learning assistant. Create a 7-day study plan and return ONLY valid JSON no markdown. Schema: {"studentName":"<name>","subject":"<subject>","weeklyPlan":[{"day":"<day>","topic":"<topic>","tasks":["<task>"],"duration":"<time>"}],"tips":["<tip>"],"resources":["<resource>"]}` },
        { role: "user", content: `Student: ${studentName}, Grade: ${grade}, Subject: ${subject}, Weak Topics: ${weakTopics}` }
      ]
    });
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const plan = JSON.parse(raw);
    res.json({ success: true, ...plan });
  } catch (e) {
    res.status(500).json({ error: "Failed to generate study plan." });
  }
});

router.post("/recommend", async (req, res) => {
  const { subject, topic, learningStyle = "visual" } = req.body;
  if (!subject || !topic) {
    return res.status(400).json({ error: "subject and topic are required." });
  }
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: `You are a learning resource recommender. Return ONLY valid JSON no markdown. Schema: {"topic":"<topic>","resources":[{"type":"<video/article/exercise>","title":"<title>","description":"<desc>","difficulty":"<easy/medium/hard>"}],"practiceQuestions":["<question>"],"estimatedTime":"<time>"}` },
        { role: "user", content: `Subject: ${subject}, Topic: ${topic}, Learning Style: ${learningStyle}` }
      ]
    });
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);
    res.json({ success: true, ...data });
  } catch (e) {
    res.status(500).json({ error: "Failed to get recommendations." });
  }
});

router.post("/progress", async (req, res) => {
  const { studentName = "Student", subject, scores } = req.body;
  if (!scores || !Array.isArray(scores)) {
    return res.status(400).json({ error: "scores array is required." });
  }
  try {
    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: `You are a student progress analyzer. Return ONLY valid JSON no markdown. Schema: {"overallProgress":"<percentage>","strongTopics":["<topic>"],"weakTopics":["<topic>"],"nextSteps":["<step>"],"motivationalMessage":"<message>"}` },
        { role: "user", content: `Student: ${studentName}, Subject: ${subject}, Scores: ${JSON.stringify(scores)}` }
      ]
    });
    const raw = result.choices[0].message.content.replace(/```json|```/g, "").trim();
    const data = JSON.parse(raw);
    res.json({ success: true, ...data });
  } catch (e) {
    res.status(500).json({ error: "Failed to analyze progress." });
  }
});

module.exports = router;