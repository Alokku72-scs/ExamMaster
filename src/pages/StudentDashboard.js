import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import isBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useLocation } from 'react-router-dom';

dayjs.extend(isBefore);
dayjs.extend(isSameOrAfter);

const StudentDashboard = () => {
  const location = useLocation();
  const {userData} = location.state || {};
  const [filteredExams, setFilteredExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [activeExams, setActiveExams] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filterExamsByDate = useCallback((examsList) => {
    const now = dayjs();
    const past = examsList.filter((exam) => dayjs(exam.examDate).isBefore(now));
    const upcoming = examsList.filter((exam) => dayjs(exam.examDate).isSameOrAfter(now));

    const activeExamsWithTimeLeft = examsList.map((exam) => {
      const startTime = dayjs(`${exam.examDate} ${exam.time}`);
      const endTime = startTime.add(exam.duration, 'minute');
      const isActive = now.isAfter(startTime) && now.isBefore(endTime);
      const timeLeft = isActive ? endTime.diff(now, 'minute') : 0;
      return isActive ? { ...exam, isActive, timeLeft } : null;
    }).filter((exam) => exam !== null);

    setPastExams(past);
    setUpcomingExams(upcoming);
    setActiveExams(activeExamsWithTimeLeft);
    setFilteredExams(upcoming);
  }, []);

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

  useEffect(() => {
    fetchAllExams();
  }, [fetchAllExams]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Welcome, Student</h1>
        <p className="text-gray-600 mt-2">Today’s Date: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Exams */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Upcoming Exams</h2>
          {filteredExams.length > 0 ? (
            <>
              <ul className="space-y-3">
                {filteredExams.slice(0, 2).map((exam, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">{exam.examName}</h3>
                      <p className="text-sm text-gray-600">{exam.examDate} at {exam.time}</p>
                    </div>
                    <Link
                      to="/start-exam"
                      className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700"
                    >
                      View
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 text-indigo-500 hover:underline"
                onClick={() => setShowModal(true)}
              >
                Show All
              </button>
            </>
          ) : (
            <p className="text-gray-600">No upcoming exams available.</p>
          )}
        </section>

        {/* Active Exams */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Active Exams</h2>
          {activeExams.length > 0 ? (
            <ul className="space-y-3">
              {activeExams.slice(0, 2).map((exam, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{exam.examName}</h3>
                    <p className="text-sm text-gray-600">Time Left: {exam.timeLeft} min</p>
                  </div>
                  <Link
                    to="/student/active-exam-login"
                      state={{ exam ,userData} // Pass exam data as state
                    }
                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Start
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No active exams at the moment.</p>
          )}
        </section>

        {/* Other Sections */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Mock Tests</h2>
          <p className="text-gray-600 mb-4">Practice with mock tests to prepare for exams.</p>
          <Link
            to="/quiz"
            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Take Mock Test
          </Link>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Exam History</h2>
          <p className="text-gray-600 mb-4">View past exam results and performance.</p>
          <Link to="/results" className="text-blue-500 hover:underline">
            View Results
          </Link>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">All Upcoming Exams</h2>
            <ul className="space-y-3">
              {filteredExams.map((exam, index) => (
                <li key={index} className="p-3 bg-gray-100 rounded-lg">
                  <h3 className="font-medium text-gray-800">{exam.examName}</h3>
                  <p className="text-sm text-gray-600">
                    {exam.examDate} at {exam.time}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
