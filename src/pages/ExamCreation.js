import React, { useState } from 'react';

const ExamCreation = () => {
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleCreateExam = (e) => {
    e.preventDefault();
    
    if (subject && examDate && startTime && duration) {
      // Here you could make an API call to save the exam details
      console.log("Exam Created:", { subject, examDate, startTime, duration });
      alert(`Exam for ${subject} created successfully!`);
      
      // Reset form fields after submission
      setSubject('');
      setExamDate('');
      setStartTime('');
      setDuration('');
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Exam</h2>
      
      <form onSubmit={handleCreateExam}>
        {/* Subject Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <select 
            className="mt-1 p-2 w-full border border-gray-300 rounded" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select a subject</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            {/* Add more subjects as needed */}
          </select>
        </div>

        {/* Exam Date */}
        <div className="mb-4">
          <label className="block text-gray-700">Exam Date</label>
          <input 
            type="date" 
            className="mt-1 p-2 w-full border border-gray-300 rounded" 
            value={examDate} 
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-gray-700">Start Time</label>
          <input 
            type="time" 
            className="mt-1 p-2 w-full border border-gray-300 rounded" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-gray-700">Duration (in minutes)</label>
          <input 
            type="number" 
            className="mt-1 p-2 w-full border border-gray-300 rounded" 
            placeholder="e.g., 90" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default ExamCreation;
