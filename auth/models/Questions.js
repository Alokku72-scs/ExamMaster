const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 4 options'] },
    correctAnswer: { type: String, required: true },
    Subject: { type: String, required: true },
    Level: { type: String, required: true },
});

function arrayLimit(val) {
    return val.length === 4;  // Enforce exactly 4 options
}

module.exports = mongoose.model("Question", QuestionSchema);
