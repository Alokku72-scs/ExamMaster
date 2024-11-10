import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Papper() {

    const navigate = useNavigate();
    const location = useLocation();
    const questions = location.state?.questions || [];


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
    const [results, setResults] = useState(Array(questions.length).fill(null));
    const [answeredQuestions, setAnsweredQuestions] = useState(Array(questions.length).fill(false));
    const [visitedQuestion, setVisitedQuestion] = useState(Array(questions.length).fill(false));
    const [notVisitedCount, setNotVisitedCount] = useState(questions.length);
    const [markedForReview, setMarkedForReview] = useState(Array(questions.length).fill(false));
    const [onlyReview, setOnlyReview] = useState(Array(questions.length).fill(false));
    const [clickCount, setClickCount] = useState(0);

    // If no questions are passed, navigate back to a safe page

    useEffect(() => {
        if (!questions || questions.length === 0) {
            // If there are no questions, navigate to the previous or a fallback page
            navigate('/quiz');  // Redirect to mocktest or any other relevant page
            return null;
        }
    }, [questions, navigate]);
   

    React.useEffect(() => {
        setSelectedAnswer(selectedAnswers[currentQuestionIndex]);
    }, [currentQuestionIndex, selectedAnswers]);

    useEffect(() => {
        const notVisited = visitedQuestion.filter(result => result === false);
        setNotVisitedCount(notVisited.length);
    }, [visitedQuestion]); // Runs when visitedQuestion changes

    if (!questions || questions.length === 0) {
        // Render nothing or a loading indicator while redirecting
        return null;
      }

    // Retrieve the current question only if it exists
    const currentQuestion = questions[currentQuestionIndex] || {};


    const handleSaveAndNext = () => {
        if (selectedAnswer === null) return;
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Update results array with true/false
        const updatedResults = [...results];
        updatedResults[currentQuestionIndex] = isCorrect;
        setResults(updatedResults);

        // Save selected answer
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
        setSelectedAnswers(updatedSelectedAnswers);

        // Mark the question as answered and visited
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnsweredQuestions);

        const updateVisit = [...visitedQuestion];
        updateVisit[currentQuestionIndex] = true;
        setVisitedQuestion(updateVisit);

        const updatedMarkedForReview = [...markedForReview];
        updatedMarkedForReview[currentQuestionIndex] = false;  // Reset review status
        setMarkedForReview(updatedMarkedForReview);

        // Update not visited count
        const notVisited = updateVisit.filter(result => !result).length;
        setNotVisitedCount(notVisited);

        //unmarked for only review
        const updateMarkRev = [...onlyReview];
        updateMarkRev[currentQuestionIndex] = false;
        setOnlyReview(updateMarkRev);

        // Move to the next question
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const handleClear = () => {
        if (selectedAnswer === null) return;
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = null;
        setSelectedAnswers(updatedSelectedAnswers);

        const updatedResults = [...results];
        updatedResults[currentQuestionIndex] = null;
        setResults(updatedResults);

        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = false;
        setAnsweredQuestions(updatedAnsweredQuestions);

        const updatedMarkedForReview = [...markedForReview];
        updatedMarkedForReview[currentQuestionIndex] = false;
        setMarkedForReview(updatedMarkedForReview);

        const updateMarkRev = [...onlyReview];
        updateMarkRev[currentQuestionIndex] = false;
        setOnlyReview(updateMarkRev);

        setSelectedAnswer(null);
    };




    const handleSaveAndMarkForReview = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Update results and selected answers
        const updatedResults = [...results];
        updatedResults[currentQuestionIndex] = isCorrect;
        setResults(updatedResults);

        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
        setSelectedAnswers(updatedSelectedAnswers);

        // Mark as answered, visited, and for review
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnsweredQuestions);

        const updatedVisitedQuestions = [...visitedQuestion];
        updatedVisitedQuestions[currentQuestionIndex] = true;
        setVisitedQuestion(updatedVisitedQuestions);

        const updatedMarkedForReview = [...markedForReview];
        updatedMarkedForReview[currentQuestionIndex] = true;
        setMarkedForReview(updatedMarkedForReview);

        // Clear "only review" state
        const updatedOnlyReview = [...onlyReview];
        updatedOnlyReview[currentQuestionIndex] = false;
        setOnlyReview(updatedOnlyReview);

        // Update not visited count
        setNotVisitedCount(updatedVisitedQuestions.filter(result => !result).length);

        // Move to the next question
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };


    // Mark for Review
    const handleMarkAndReview = () => {
        if (selectedAnswer === null) return;

        // Mark question only for review (yellow)
        const updatedOnlyReview = [...onlyReview];
        updatedOnlyReview[currentQuestionIndex] = true;
        setOnlyReview(updatedOnlyReview);

        // Save selected answer
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
        setSelectedAnswers(updatedSelectedAnswers);

        const updatedVisitedQuestions = [...visitedQuestion];
        updatedVisitedQuestions[currentQuestionIndex] = true;
        setVisitedQuestion(updatedVisitedQuestions);

        // Set review state without marking as fully answered
        const updatedMarkedForReview = [...markedForReview];
        updatedMarkedForReview[currentQuestionIndex] = false;
        setMarkedForReview(updatedMarkedForReview);

        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = false;
        setAnsweredQuestions(updatedAnsweredQuestions);

        // Update not visited count
        setNotVisitedCount(updatedVisitedQuestions.filter(result => !result).length);

        // Move to the next question
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };



    const handleSubmit = () => {
        if (clickCount === 0) {

            toast.warn("Are you sure you want to submit?", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => setClickCount(1), // Set clickCount on toast close
            });
        } else {
            // Final submission logic
            const totalCorrect = results.filter(result => result === true).length;
            const totalIncorrect = results.filter(result => result === false).length;
            const totalUnattempted = results.filter(result => result === null).length;

            toast.info(`Correct: ${totalCorrect}, Incorrect: ${totalIncorrect}, Unattempted: ${totalUnattempted}`);
            toast.success("Results Submitted Successfully!", {
                position: "top-center",
                autoClose: 3000,
            });

            // Navigate to Results page with result data
            navigate('/result-page', {
                state: {
                    totalCorrect,
                    totalIncorrect,
                    totalUnattempted
                }
            });

            setClickCount(0); // Reset click count after submission
        }
    };

    const handleNext = () => {
        const updateVisit = [...visitedQuestion];
        updateVisit[currentQuestionIndex] = true;
        setVisitedQuestion(updateVisit);

        setCurrentQuestionIndex((prev) => {
            const nextIndex = (prev + 1 < questions.length ? prev + 1 : prev);
            updateVisit[nextIndex] = true; //Pre-mark as visited to reflect UI change immediately
            return nextIndex;
        });

    };

    const handlePrevious = () => {
        const updateVisit = [...visitedQuestion];
        updateVisit[currentQuestionIndex] = true;
        setVisitedQuestion(updateVisit);
        setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };


    const handleQuestionClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    

    const totalAnswered = results.filter((result) => result === true || result === false).length;
    const isMarkedForRev = onlyReview.filter((result) => result === true).length;
    const totalMarkForView = markedForReview.filter((result) => result === true).length;

    return (
        <div className="w-screen min-h-screen flex justify-center px-4">
            <div className="w-full md:w-11/12">
                {/* Candidate Details Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="w-full md:w-1/2">
                        <table className="border w-full md:w-auto">
                            <tbody>
                                <tr>
                                    <td className="py-3 px-3">
                                        <FontAwesomeIcon icon={faUser} size="4x" />
                                    </td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Candidate Name</td>
                                                    <td>: <span>[Your Name]</span></td>
                                                </tr>
                                                <tr>
                                                    <td>Subject Name</td>
                                                    <td>: <span>{currentQuestion.Subject || 'N/A'} </span></td>
                                                </tr>
                                                <tr>
                                                    <td>Remaining Time</td>
                                                    <td>: <span>set time</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Language Selection Dropdown */}
                    <div className="border rounded-md px-2 py-2 mt-2 md:mt-0">
                        <select className="text-black">
                            <option value="1">English</option>
                        </select>
                    </div>
                </div>

                {/* Question and Answers Section */}
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/5 p-4">
                        <div className="p-2 h-[300px] overflow-y-auto">
                            <h2 className="text-black font-serif uppercase">Question. {currentQuestionIndex + 1}</h2>
                            <div className="border-2 mt-2"></div>
                            <p>{currentQuestion.question}</p>
                            {/* <img src={Q1} alt="Question Image" className="my-3 w-full" /> */}
                            <div className="border-2"></div>
                            <table className="w-full mt-2">
                                <tbody className="flex justify-between mr-3 ml-3">
                                    {currentQuestion.options.map((option, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="option"
                                                    value={option}
                                                    checked={selectedAnswer === option}
                                                    onChange={() => setSelectedAnswer(option)}
                                                />
                                                {option}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-2 m-2"></div>
                        <div className="flex flex-wrap justify-around mt-4 text-small gap-2">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold w-full md:w-auto p-1 rounded-md uppercase"
                                onClick={handleSaveAndNext}>Save & Next</button>
                            <button
                                className="bg-red-400 hover:bg-red-900 text-white font-bold w-full md:w-auto p-1 rounded-md uppercase"
                                onClick={handleClear}>
                                Clear</button>
                            <button
                                className="bg-violet-500 hover:bg-violet-800 text-white font-bold w-full md:w-auto p-1 rounded-md uppercase"
                                onClick={handleSaveAndMarkForReview}>
                                Save & Mark For Review
                            </button>
                            <button
                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold w-full md:w-auto p-1 rounded-md uppercase"
                                onClick={handleMarkAndReview}>
                                Mark For Review & Next
                            </button>
                        </div>

                        <div className="flex justify-between items-center bg-[#f5f5f5] p-2 mt-2 border-t-[#ddd] uppercase">
                            <div className="flex justify-between mt-4 gap-2">
                                <button
                                    className="bg-gray-700 text-white p-2 rounded-md disabled:bg-slate-400"
                                    disabled={currentQuestionIndex <= 0}
                                    onClick={handlePrevious} >&lt;&lt; Back</button>
                                <button
                                    className="bg-gray-700 text-white p-2 rounded-md disabled:bg-slate-400"
                                    disabled={currentQuestionIndex >= questions.length - 1}
                                    onClick={handleNext}>Next &gt;&gt;</button>
                            </div>
                            <div>
                                <ToastContainer />
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-md uppercase"
                                    onClick={handleSubmit} >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Question Navigation Section */}
                    <div className="w-full md:w-2/5 p-4">
                        <div className="border-2 border-dashed border-gray-400 p-4 bg-white rounded-lg shadow-lg mb-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-gray-300 text-gray-800 font-bold text-lg w-10 h-10 flex items-center justify-center rounded">{notVisitedCount}</div>
                                    <div className="text-sm text-gray-600">Not Visited</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-red-500 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">{(questions.length) - totalAnswered}</div>
                                    <div className="text-sm text-gray-600">Not Answered</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-green-500 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">{totalAnswered}</div>
                                    <div className="text-sm text-gray-600">Answered</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-yellow-300 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded">{isMarkedForRev}</div>
                                    <div className="text-sm text-gray-600">Marked for Review</div>
                                </div>
                                <div className="flex items-center space-x-2 col-span-2">
                                    <div className="bg-purple-600 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded relative">
                                        {totalMarkForView}
                                        <span className="absolute -bottom-1 -right-1 bg-white text-green-500 rounded-full p-1 text-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">Answered & Marked for Review (will be considered for evaluation)</div>
                                </div>
                            </div>
                        </div>

                        {/* Question Number Navigation */}
                        <div className="bg-gray-100 p-2">
                            <div className="grid grid-cols-9 gap-1">
                                {questions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            handleQuestionClick(index);
                                            // Mark the question as visited when clicked
                                            const updatedVisitedQuestions = [...visitedQuestion];
                                            updatedVisitedQuestions[index] = true; // Set the clicked question as visited
                                            setVisitedQuestion(updatedVisitedQuestions); // Update the state
                                        }}

                                        className={`w-10 h-10 border rounded-md hover:transition-transform

                                             ${currentQuestionIndex === index ? "bg-gray-300 text-white" : ""}
                                             ${visitedQuestion[index] === true && !answeredQuestions[index] ? "bg-red-500 text-white  focus:ring-1" : ""}
                                             ${onlyReview[index] && !answeredQuestions[index] ? "bg-yellow-500 text-white focus:ring-1" : ""}  // Only marked for review
                                             ${markedForReview[index] ? "bg-violet-500 text-white focus:ring-1" : ""}
                                             ${answeredQuestions[index] && !markedForReview[index] && visitedQuestion[index] ? "bg-green-500 text-white focus:ring-1" : ""}
                                             ${!answeredQuestions[index] && !markedForReview[index] && currentQuestionIndex !== index ? "bg-gray-300 focus:ring-1" : ""}
                                        `}

                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Papper;
