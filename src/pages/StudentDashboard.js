import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Welcome, Student</h1>
        <p className="text-gray-700 mt-2">Today’s Date: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Exams */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
          <ul>
            <li className="mb-2 text-gray-800">Math - 10th Nov, 10:00 AM</li>
            <li className="mb-2 text-gray-800">Physics - 12th Nov, 1:00 PM</li>
            {/* Add more exams here */}
          </ul>
          <Link to="/exams" className="text-blue-500 hover:underline">View All Exams</Link>
        </section>

        {/* Active Exams */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Exams</h2>
          <p className="text-gray-700 mb-4">You have 1 active exam:</p>
          <Link to="/start-exam" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Start Exam</Link>
        </section>

        {/* Mock Tests */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mock Tests</h2>
          <p className="text-gray-700 mb-4">Practice with mock tests to familiarize yourself with the exam format.</p>
          <Link to="/mock-test" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Take Mock Test</Link>
        </section>

        {/* Exam History */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Exam History</h2>
          <p className="text-gray-700 mb-4">Review your past exams and results.</p>
          <Link to="/results" className="text-blue-500 hover:underline">View Results</Link>
        </section>

        {/* Notifications */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul>
            <li className="mb-2 text-gray-800">Exam Schedule Updated</li>
            <li className="mb-2 text-gray-800">New Mock Test Available</li>
            {/* Add more notifications here */}
          </ul>
        </section>

        {/* Profile Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile & Settings</h2>
          <p className="text-gray-700 mb-4">Manage your profile and settings.</p>
          <Link to="/profile" className="text-blue-500 hover:underline">Edit Profile</Link>
        </section>

        {/* Help & Support */}
        <section className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <p className="text-gray-700 mb-4">Need assistance? Check our FAQs or reach out to support.</p>
          <Link to="/support" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Contact Support</Link>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
