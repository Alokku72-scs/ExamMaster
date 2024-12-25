import React from 'react';
import { Link } from 'react-router-dom'; // If you want to add a link to redirect back to the home page or another page
import { FaCheckCircle } from 'react-icons/fa'; // For a success icon

const FinalPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <FaCheckCircle className="text-green-500 text-6xl mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Successfully Submitted!</h1>
        <p className="text-lg text-gray-600 mb-4">Your exam has been submitted successfully.</p>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You for participating!</h2>
        <p className="text-gray-600 mb-6">You can view your results or continue to other exams.</p>
        
        {/* You can add a button to navigate to the results page or the homepage */}
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-md uppercase">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default FinalPage;
