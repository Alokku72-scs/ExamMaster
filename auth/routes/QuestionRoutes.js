// routes/QuestionRoutes.js
const express = require("express");
const router = express.Router();
const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require("../controllers/QuestionsController");

// Route to create a new question
router.post("/questions", createQuestion);

// Route to get all questions
router.get("/questions", getAllQuestions);

// Route to get a specific question by ID
router.get("/questions/:id", getQuestionById);

// Route to update a specific question by ID
router.put("/questions/:id", updateQuestion);

// Route to delete a specific question by ID
router.delete("/questions/:id", deleteQuestion);

module.exports = router;
