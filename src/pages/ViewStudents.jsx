// src/components/ViewStudents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]); // Use an array to store multiple students
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student data from the API
    axios
      .get(`http://localhost:5000/api/v1/students`) // Adjust the endpoint to match your API
      .then((response) => {
        console.log(response.data);
        if (response.data && response.data.success) {
          setStudents(response.data.students); // Assuming the API returns an array of students
        } else {
          setError('No students found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setError('Failed to load student data.');
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
    <h2 className="text-2xl font-semibold mb-4">View Students</h2>
    {error && <p className="text-red-500">{error}</p>}

    {/* Table layout */}
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {student.firstName} {student.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{student.email}</td>
              <td className="border border-gray-300 px-4 py-2">{student._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ViewStudents;
