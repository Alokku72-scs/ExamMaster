import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ExamTimer from "./ExamTimer";
import SubmitExam from "./SubmitExam";


function ActivePaper() {

    const navigate = useNavigate();
    const location = useLocation();
    const { exam, userData } = location.state || {}; // Extract the exam data
    console.log('user ki id',userData._id);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [results, setResults] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [visitedQuestion, setVisitedQuestion] = useState([]);
    const [markedForReview, setMarkedForReview] = useState([]);
    const [onlyReview, setOnlyReview] = useState([]);
    const [notVisitedCount, setNotVisitedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [clickCount, setClickCount] = useState(0);
    const [timeDuration, setTimeDuration] = useState('')

    

    useEffect(() => {
        if (!exam) {
            toast.error("Exam data not found!");
            navigate("/student/active-exam-instruction");
            return;
        }

        const fetchExamData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/exams/${exam._id}`); // Use exam ID to fetch relevant data
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const dataQ = await response.json();
                const data = dataQ.data;
               
                if (data && data.questions && data.questions.length > 0) {
                    setQuestions(data.questions);
                    setSelectedAnswers(Array(data.questions.length).fill(null));
                    setResults(Array(data.questions.length).fill(null));
                    setAnsweredQuestions(Array(data.questions.length).fill(false));
                    setVisitedQuestion(Array(data.questions.length).fill(false));
                    setMarkedForReview(Array(data.questions.length).fill(false));
                    setOnlyReview(Array(data.questions.length).fill(false));
                    setNotVisitedCount(data.questions.length);
                    setTimeDuration(data.duration);
                } else {
                    toast.error("No questions found in the exam data.");
                    navigate("/student/active-exam-instruction", { state: { exam ,userData} });
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                toast.error("Failed to load exam data.");
                navigate("/student/active-exam-instruction", { state: { exam , userData} });
            } finally {
                setLoading(false);
            }
        };

        fetchExamData();
    }, [exam, navigate]);

    useEffect(() => {
        if (questions.length > 0) {
            setSelectedAnswer(selectedAnswers[currentQuestionIndex]);
        }
    }, [currentQuestionIndex, selectedAnswers, questions]);

    useEffect(() => {
        const notVisited = visitedQuestion.filter((result) => !result).length;
        setNotVisitedCount(notVisited);
    }, [visitedQuestion]);

    if (loading) {
        return <div className="text-center mt-20">Loading questions...</div>;
    }

    if (!questions || questions.length === 0) {
        return null;
    }

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

    const totalAnswered = results.filter(
        (result) => result === true || result === false
    ).length;
    const isMarkedForRev = onlyReview.filter((result) => result === true).length;
    const totalMarkForView = markedForReview.filter((result) => result === true).length;



    return (
        <div className="w-screen min-h-screen flex justify-center px-4">
            <div className="w-full md:w-11/12">
                {/* Candidate Details Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 mt-2">
                    {/* Candidate Info Section */}
                    <div className="w-full md:w-2/3">
                        <table className="w-[50%] md:2/3 border border-gray-300 rounded-md">
                            <tbody >
                                <tr>
                                    {/* Profile Icon */}
                                    <td className="p-1 text-center items-center border-r border-gray-300">
                                        <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-600" />
                                    </td>
                                    {/* Info Table */}
                                    <td className="p-2">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="font-medium text-gray-700 pr-2 w-3/3">Candidate Name</td>
                                                    <td className="text-gray-900">: <span className="ml-1 font-serif">{userData.firstName} {userData.lastName}</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="font-medium text-gray-700 pr-2 w-3/3">Email Address</td>
                                                    <td className="text-gray-900">: <span className="ml-1 font-serif">{userData.email}</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="font-medium text-gray-700  pr-2 w-3/3">Subject Name</td>
                                                    <td className="text-gray-900">: <span className="ml-1 font-serif">{currentQuestion.Subject || 'N/A'}</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="font-medium text-gray-700  pr-2 w-3/3">Remaining Time</td>
                                                    <td className="flex items-center">
                                                        :
                                                        <span className="ml-1 py-1 px-1 rounded-lg font-semibold text-red-600 inline-block">
                                                            <ExamTimer timeDuration={timeDuration} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Language Selection Dropdown */}
                    <div className="w-full md:w-1/3 flex justify-end">
                        <div className="border border-gray-300 rounded-md px-4 py-2">
                            <select className="text-black focus:outline-none">
                                <option value="1">English</option>
                            </select>
                        </div>
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
                                <SubmitExam 
                                    exam={exam}
                                    userData={userData}
                                    selectedAnswers={selectedAnswers}
                                    results={results}
                                    timeDuration={timeDuration}
                                    setClickCount={setClickCount}
                                    clickCount={clickCount}
                                />
                                {/* <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-md uppercase"
                                    onClick={handleSubmit} >
                                    Submit
                                </button> */}
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
export default ActivePaper;
