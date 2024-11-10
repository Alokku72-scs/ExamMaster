import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLocation } from 'react-router-dom';
Chart.register(ArcElement, Tooltip, Legend);



const Results = ({ results }) => {
    // Calculate correct, wrong, and unattempted counts
    // const correctCount = results.filter(result => result === true).length;
    // const wrongCount = results.filter(result => result === false).length;
    // const unattemptedCount = results.filter(result => result === null).length;

    const location = useLocation();
    const { totalCorrect, totalIncorrect, totalUnattempted } = location.state || {};

    // Prepare data for the pie chart
    const data = {
        labels: ['Correct', 'Wrong', 'Unattempted'],
        datasets: [
            {
                data: [totalCorrect, totalIncorrect, totalUnattempted],
                backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Colors for each section
                hoverBackgroundColor: ['#66BB6A', '#EF5350', '#FFD54F'],
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Exam Results',
            },
        },
    };

    return (
        <div className="w-full min-h-screen p-2 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Your Exam Results</h1>
            <div className="w-1/3 flex flex-col items-center justify-center mx-auto">
                <Pie data={data} options={options} />
                <div className="mt-4 text-center">
                    <p><strong>Correct Answers:</strong> {totalCorrect}</p>
                    <p><strong>Wrong Answers:</strong> {totalIncorrect}</p>
                    <p><strong>Unattempted Questions:</strong> {totalUnattempted}</p>
                </div>
            </div>
        </div>

    );
};

export default Results;
