const Exam = require("../models/Exam");
const Question = require("../models/Questions");

// Controller to create a new question
const createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        console.log(req.body);
        await question.save();
        res.status(201).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Controller to get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, error: "Question not found" });
        }
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to update a question
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ success: false, error: "Question not found" });
        }
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Controller to delete a question
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, error: "Question not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controller to create a new exam
const createExam = async (req, res) => {
    try {
        const { examName, duration, questions } = req.body;

        // First, save the questions in the database
        const savedQuestions = await Question.insertMany(questions);

        // Create a new exam with the questions
        const exam = new Exam({
            examName,
            duration,
            questions: savedQuestions.map((question) => question._id),
        });

        // Save the exam
        await exam.save();

        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    createExam,
};
