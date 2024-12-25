const mongoose = require('mongoose');
const Exam = require("../models/Exam");
const Question = require("../models/Questions");
const ExamResult = require('../models/ExamResult');

const createExam = async (req, res) => {
    try {
        const { examName, examDate, duration, time, questions } = req.body;

        const savedQuestions = await Question.insertMany(questions);
        const exam = new Exam({
            examName,
            examDate,
            duration,
            time,
            questions: savedQuestions.map((q) => q._id),
        });

        await exam.save();
        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find().populate('questions');
        res.status(200).json({ success: true, exams });
    } catch (error) {
        console.error("Error fetching exams:", error);
        res.status(500).json({ success: false, message: "Failed to fetch exams." });
    }
};

const updateExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const { examName, duration, time, questions } = req.body;

        if (!mongoose.Types.ObjectId.isValid(examId)) {
            return res.status(400).json({ success: false, message: "Invalid exam ID" });
        }

        console.log("Exam ID:", examId);
        console.log("Payload questions:", questions);

        // Prepare question IDs
        const questionIds = [];
        for (let q of questions) {
            if (mongoose.Types.ObjectId.isValid(q)) {
                // Validate if the question exists
                const questionExists = await Question.findById(q);
                if (!questionExists) {
                    return res.status(404).json({ success: false, message: `Question not found for ID: ${q}` });
                }
                questionIds.push(q);
            } else if (typeof q === "object" && !q._id) {
                // Insert a new question if no `_id` is provided
                const newQuestion = new Question(q);
                const savedQuestion = await newQuestion.save();
                questionIds.push(savedQuestion._id);
            } else if (q._id) {
                // Check if the question with `_id` exists
                const questionExists = await Question.findById(q._id);
                if (!questionExists) {
                    return res.status(404).json({ success: false, message: `Question not found for ID: ${q._id}` });
                }
                questionIds.push(q._id);
            } else {
                return res.status(400).json({ success: false, message: `Invalid question format: ${JSON.stringify(q)}` });
            }
        }

        if (questionIds.length === 0) {
            return res.status(400).json({ success: false, message: "No valid questions provided" });
        }

        console.log("Resolved question IDs:", questionIds);

        // Update the exam
        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            { examName, duration, time, questions: questionIds },
            { new: true, runValidators: true }
        );

        if (!updatedExam) {
            return res.status(404).json({ success: false, message: "Exam not found" });
        }

        res.status(200).json({ success: true, data: updatedExam });
    } catch (error) {
        console.error("Error updating exam:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId).populate('questions');
        console.log(req.params);
        if (!exam) {
            return res.status(404).json({ success: false, error: 'Exam not found' });
        }
        res.status(200).json({ success: true, data: exam });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Handle exam submission
const submitExam = async (req, res) => {
    console.log("req ki body",req.body);
  const { examId, firstName,lastName,email, selectedAnswers, results, totalCorrect, totalIncorrect, totalUnattempted, timeTaken } = req.body;

  try {
    // Create a new exam result entry
    const newExamResult = new ExamResult({
      examId,
      firstName,
      lastName,
      email,
      selectedAnswers,
      results,
      totalCorrect,
      totalIncorrect,
      totalUnattempted,
      timeTaken,
    });

    // Save the exam result to the database
    await newExamResult.save();

    res.status(200).json({
      success: true,
      message: 'Exam results submitted successfully!',
      data: newExamResult
    });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({
      success: false,
      message: 'Error occurred while submitting the exam results.'
    });
  }
};



module.exports = {
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    submitExam,
};
