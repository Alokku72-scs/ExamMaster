// SubmitExam.js

import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SubmitExam = ({
  exam,
  userData,
  selectedAnswers,
  results,
  timeDuration,
  setClickCount,
  clickCount
}) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (clickCount === 0) {
      toast.warn("Are you sure you want to submit?", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => setClickCount(1),
      });
    } else {
      // Calculate the results
      const totalCorrect = results.filter(result => result === true).length;
      const totalIncorrect = results.filter(result => result === false).length;
      const totalUnattempted = results.filter(result => result === null).length;

      // Data to be sent to the backend
      const submissionData = {
        examId: exam._id, // Exam ID
        //userId: userData._id, // User ID
        firstName:userData.firstName,
        lastName:userData.lastName,
        email:userData.email,
        selectedAnswers: selectedAnswers, // Selected answers
        results: results, // Correct/incorrect answers
        totalCorrect,
        totalIncorrect,
        totalUnattempted,
        timeTaken: timeDuration, // Time taken to complete the exam
        submittedAt: new Date().toISOString(), // Timestamp when the exam is submitted
      };

      try {
        // Sending data to backend
        console.log("Submission Data:", submissionData);
        const response = await fetch("http://localhost:5000/api/v1/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit exam results.");
        }

        const data = await response.json();

        if (data.success) {
          toast.success("Results Submitted Successfully!", {
            position: "top-center",
            autoClose: 3000,
          });

          // Navigate to Results page with result data
          navigate('/final-page', {
            state: {
              totalCorrect,
              totalIncorrect,
              totalUnattempted
            }
          });
        } else {
          toast.error("Failed to submit results, please try again.");
        }
      } catch (error) {
        console.error("Error submitting exam:", error);
        toast.error("An error occurred while submitting the exam.");
      }

      setClickCount(0); // Reset click count after submission
    }
  };

  return (
    <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-md uppercase">
      Submit Exam
    </button>
  );
};

export default SubmitExam;
