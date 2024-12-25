const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  examDate:{
    type: String,
    required:true,
  },
  duration: {
    type: Number,
    required: true,  // Store exam duration in minutes
  },
  time:{
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',  // Reference to the Question model
    }
  ]
});

module.exports = mongoose.model("Exam", examSchema);

