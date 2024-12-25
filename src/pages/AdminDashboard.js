import { useCallback } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import isBefore from 'dayjs/plugin/isSameOrBefore'; // Correct plugin import
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Another required plugin

dayjs.extend(isBefore);
dayjs.extend(isSameOrAfter);

const AdminDashboard = () => {
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [error, setError] = useState('');
  const [pastExams, setPastExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const navigate = useNavigate();

  // Categorize exams by date
  const filterExamsByDate = useCallback((examsList) => {
    const today = dayjs();
    const past = examsList.filter((exam) => dayjs(exam.examDate).isBefore(today));
    const upcoming = examsList.filter((exam) => dayjs(exam.examDate).isSameOrAfter(today));
    setPastExams(past);
    setUpcomingExams(upcoming);
    setFilteredExams(upcoming); // Default view is upcoming exams
  }, []);

  // Fetch all exams
  const fetchAllExams = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/exams');
      const examsData = response.data.exams;
      filterExamsByDate(examsData);
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError('Failed to load exams. Please try again later.');
    }
  }, [filterExamsByDate]);

  // Handle search by date
  const handleSearchByDate = () => {
    if (!searchDate) {
      setFilteredExams(upcomingExams); // Reset to upcoming exams if no date is entered
    } else {
      const filtered = upcomingExams.filter((exam) =>
        dayjs(exam.examDate).isSame(dayjs(searchDate), 'day')
      );
      setFilteredExams(filtered);
    }
  };

  // Handle Modify Button Click
  const handleModifyClick = (examId) => {
    navigate(`/admin/create-exam/${examId}`);
  };

  // Initial fetch of exams
  useEffect(() => {
    fetchAllExams();
  }, [fetchAllExams]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/admin/create-exam" className="text-lg font-semibold hover:text-gray-300">
              Create Exam
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/view-students" className="text-lg font-semibold hover:text-gray-300">
              View Students
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/reports" className="text-lg font-semibold hover:text-gray-300">
              Reports
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-gray-100 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">All Exams</h1>

          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Search by Date:</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSearchByDate}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Display Exams */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <div key={exam._id} className="p-4 border rounded shadow">
                  <p><strong>Name:</strong> {exam.examName}</p>
                  <p><strong>Date:</strong> {exam.examDate}</p>
                  <p><strong>Time:</strong> {exam.time}</p>
                  <p><strong>Duration:</strong> {exam.duration} minutes</p>
                  <p><strong>Questions:</strong> {exam.questions.length}</p>
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={() => handleModifyClick(exam._id)}
                  >
                    Modify
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No exams found for the selected date.</p>
          )}

          {/* Past Exams Section */}
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4">Past Exams</h2>
            {pastExams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastExams.map((exam) => (
                  <div key={exam._id} className="p-4 border rounded shadow">
                    <p><strong>Name:</strong> {exam.examName}</p>
                    <p><strong>Date:</strong> {exam.examDate}</p>
                    <p><strong>Time:</strong> {exam.time}</p>
                    <p><strong>Duration:</strong> {exam.duration} minutes</p>
                    <p><strong>Questions:</strong> {exam.questions.length}</p>
                    <button
                    className="text-blue-500 underline mt-2"
                    onClick={() => handleModifyClick(exam._id)}
                  >
                    Modify
                  </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No past exams found.</p>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
