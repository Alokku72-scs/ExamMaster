// import React from 'react';

// const About = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">About ExamMaster</h1>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
//         <p className="text-lg">
//           ExamMaster is an advanced online exam system designed to simplify the process of conducting exams for students and provide a powerful toolset for administrators to create and manage exams.
//         </p>
//       </section>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Goal & Objective</h2>
//         <p className="text-lg">
//           The goal of ExamMaster is to provide a seamless, efficient, and secure platform for online exams. It aims to:
//         </p>
//         <ul className="list-disc list-inside text-lg">
//           <li>Enable students to take exams in a user-friendly environment with easy navigation.</li>
//           <li>Empower administrators to create and manage exams effortlessly with a set of flexible and customizable features.</li>
//           <li>Provide a reliable system that ensures exam integrity and smooth operation from start to finish.</li>
//         </ul>
//       </section>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Core Features</h2>
//         <ul className="list-disc list-inside text-lg">
//           <li><strong>Admin Dashboard:</strong> A user-friendly dashboard that allows administrators to create exams, view students, and generate reports.</li>
//           <li><strong>Role-Based Access Control:</strong> Secure routing for admins and students, ensuring that only authorized users can access certain sections.</li>
//           <li><strong>Exam Creation:</strong> Administrators can create exams by selecting questions based on subjects and difficulty levels.</li>
//           <li><strong>Mock Test:</strong> A practice environment where students can take mock exams to familiarize themselves with the platform.</li>
//           <li><strong>Question Navigation:</strong> Students can navigate through questions using features like "Save and Next", "Mark for Review", "Clear", and "Submit".</li>
//           <li><strong>Progress Tracking:</strong> Students can track their progress and see which questions they have answered and which are marked for review.</li>
//         </ul>
//       </section>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
//         <ul className="list-disc list-inside text-lg">
//           <li><strong>Frontend:</strong> React for building dynamic user interfaces.</li>
//           <li><strong>Backend:</strong> Node.js and MongoDB for managing the application logic and data storage.</li>
//           <li><strong>Styling:</strong> Tailwind CSS for responsive and flexible design elements.</li>
//         </ul>
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
//         <p className="text-lg">
//           For support or inquiries, feel free to reach out to us at <a href="mailto:support@examMaster.com" className="text-blue-500">support@examMaster.com</a>.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default About;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import "./About.css";

// Components for the sections
const About = () => (
  <div>
    <h3>About Us</h3>
    <p>
      ExamMaster is an advanced online exam system designed to simplify the process of conducting exams for students and provide a powerful toolset for administrators to create and manage exams.
    </p>
  </div>
);

const Vision = () => (
  <div>
    <h3>Vision</h3>
    <p>
      Our vision is to empower educational institutions with cutting-edge tools to manage exams efficiently and enhance the learning experience for students.
    </p>
  </div>
);

const Objectives = () => (
  <div>
    <h3>Objectives</h3>
    <ul>
      <li>Simplify the exam process for both students and administrators.</li>
      <li>Provide a secure and scalable platform for online exams.</li>
      <li>Ensure fairness and transparency in assessments.</li>
    </ul>
  </div>
);

const Features = () => (
  <div>
    <h3>Features</h3>
    <ul>
      <li>Role-based access for administrators and students.</li>
      <li>Real-time exam monitoring and analytics.</li>
      <li>Customizable exam formats and settings.</li>
    </ul>
  </div>
);

const Teams = () => (
  <div>
    <h3>Team Members</h3>
    <p>
      Our dedicated team comprises professionals from diverse fields, including education, software development, and UI/UX design, all working together to deliver an exceptional platform.
    </p>
    <ul className="team-list">
            <li>Alok Kumar Anand</li>
            <li>David Kujur</li>
            <li>Pratik Sarkar</li>
            <li>Deepak</li>
          </ul>
  </div>
);

const AboutPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation(); // Use useLocation hook

  const sections = [
    { title: 'About Us', component: <About /> },
    { title: 'Vision', component: <Vision /> },
    { title: 'Objectives', component: <Objectives /> },
    { title: 'Features', component: <Features /> },
    { title: 'Team Members', component: <Teams /> },
  ];

  useEffect(() => {
    // Automatically open the first section if the user navigates to /about
    setOpenSection(location.pathname === '/about' ? 0 : null);
  }, [location.pathname]);

  return (
   <div className='w-full min-h-screen'>
       <div className="about-us-container mt-4">
      {/* Left Section: Accordion Menu */}
      <div className="accordion">
        {sections.map((section, index) => (
          <div key={index} className="accordion-item">
            <div
              className={`accordion-header ${openSection === index ? 'active' : ''}`}
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              <span>{section.title}</span>
              <span>{openSection === index ? '-' : '+'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Content Display */}
      <div className="accordion-content border border-gray-400">
        {openSection !== null ? (
          sections[openSection].component
        ) : (
          <div>
            <h2 className="section-title">Welcome to About Page</h2>
            <p className="section-description">
              Please select a section from the left to view its details.
            </p>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};

export default AboutPage;
