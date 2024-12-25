// models/ExamResult.js
const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam', // Assuming you have an Exam model
    required: true
  },
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required:true,
  },
  email:{
    type: String,
    required : true,
    trim: true,
  },
  selectedAnswers: [String], // Array of selected answers
  results: [Boolean], // Array of true/false values for answers
  totalCorrect: {
    type: Number,
    required: true
  },
  totalIncorrect: {
    type: Number,
    required: true
  },
  totalUnattempted: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);
module.exports = ExamResult;
