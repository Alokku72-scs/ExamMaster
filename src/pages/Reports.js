// src/components/Reports.js
import React from 'react';

const Reports = () => {
  // Dummy data; replace with data fetched from API
  const reports = [
    { id: 1, title: 'Exam Report', date: '2024-11-01' },
    { id: 2, title: 'Student Performance', date: '2024-11-05' },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>
      <ul className="space-y-3">
        {reports.map((report) => (
          <li key={report.id} className="p-3 bg-gray-100 rounded">
            <p className="font-semibold">{report.title}</p>
            <p className="text-gray-500">{report.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
