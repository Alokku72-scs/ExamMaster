import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateExam = () => {
  const { examId } = useParams(); // Get examId from the URL
  const navigate = useNavigate();

  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [examTime, setExamTime] = useState('');
  const [duration, setDuration] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '', Subject: '', Level: '' }
  ]);

  // Fetch exam data if examId exists
  useEffect(() => {
    if (examId) {
      console.log("Exam id: ", examId);
      setIsEditing(true);
      setIsLoading(true);
      // Fetch the exam data for updating
      axios.get(`http://localhost:5000/api/v1/exams/${examId}`)
        .then(response => {
          console.log(response.data);
          const examData = response.data.data;
          //console.log(examData);
          if (examData) {
            setExamName(examData.examName);
            setExamDate(examData.examDate);
            setExamTime(examData.time);
            setDuration(examData.duration);
            setQuestions(examData.questions || []);
          } else {
            alert('Exam data not found');
          }
        })
        .catch(error => {
          console.error('Error fetching exam data:', error);
          alert('Failed to load exam data.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [examId]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '', Subject: '', Level: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const examData = {
      examName,
      examDate,
      time: examTime,
      duration: Number(duration),
      questions
    };

    console.log(examData);

    try {
      setIsLoading(true);
      if (examId) {
        // Update existing exam
        await axios.put(`http://localhost:5000/api/v1/exams/${examId}`, examData);
        alert('Exam updated successfully!');
        setIsEditing(false);
      } else {
        // Create new exam
        console.log("New  creating");
        await axios.post('http://localhost:5000/api/v1/exams', examData);
        alert('Exam created successfully!');
      }
      navigate('/admin/admin-dashboard');
    } catch (error) {
      console.error('Error submitting exam data:', error);
      alert('Failed to submit exam data.');
    } finally {
      setIsLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Exam' : 'Create Exam'}</h2>
      {isLoading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full flex gap-x-2">
          <input
            required
            type="text"
            placeholder="Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            required
            type="date"
            placeholder="Enter Date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-[50%] font-mono p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            required
            type="text"
            placeholder="Enter Time in format AM & PM"
            value={examTime}
            onChange={(e) => setExamTime(e.target.value)}
            className="w-[50%] font-mono p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <input
          required
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />

        {questions.map((question, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded mb-4">
            <input
              required
              type="text"
              placeholder="Question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((option, optIndex) => (
                <input
                  required
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:outline-none"
                />
              ))}
            </div>
            <input
              required
              type="text"
              placeholder="Correct Answer"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Subject"
              value={question.Subject}
              onChange={(e) => handleQuestionChange(index, 'Subject', e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none"
            />
            <input
              required
              type="text"
              placeholder="Level (e.g., Easy, Medium, Hard)"
              value={question.Level}
              onChange={(e) => handleQuestionChange(index, 'Level', e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 mb-4"
        >
          Add Another Question
        </button>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          {isEditing ? 'Update Exam' : 'Submit Exam'}
        </button>
      </form>
    </div>
  );
};

export default CreateExam;

