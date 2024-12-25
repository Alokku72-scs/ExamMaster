const express = require("express");
const router = express.Router();

const { createExam, getAllExams,updateExam,getExamById,submitExam } = require("../controllers/ExamController");

router.get('/exams', getAllExams);
router.post('/exams', createExam);
router.get('/exams/:examId',getExamById)
router.put('/exams/:examId',updateExam);
router.post('/submit', submitExam);

module.exports = router;
