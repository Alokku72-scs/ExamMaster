import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBookOpen, faClipboardList, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import img1 from "../assets/convencenter.jpg";
import img2 from "../assets/EastGate.png";
import img3 from "../assets/jnu-library.jpg";
import img4 from "../assets/LibrariInside.jpg";
import img5 from "../assets/SC&SS.jpg";
import img6 from "../assets/scss1stfloor.jpg";
import img7 from "../assets/slsbuilding.jpeg";
import img8 from "../assets/dogy.png";
import img9 from "../assets/Peacock.png";
import img10 from "../assets/Road.png";
import img11 from "../assets/Library2.png";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img10];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to ExamMastery</h1>
        <p className="text-lg leading-relaxed mb-8">
          Your ultimate solution for exam preparation. Mock tests, progress tracking, and expert guidance—all in one place.
        </p>
        <Link
          to="/quiz"
          className="bg-green-500 text-white py-3 px-10 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300"
        >
          Take a Mock Test
        </Link>
      </section>

      {/* Image Slider */}
      <div className="relative w-full max-w-5xl mx-auto my-12">
        <div
          className="w-full h-[500px] rounded-lg bg-center bg-cover shadow-lg transition-all duration-700"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        ></div>
        <button
          onClick={goToPrevious}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition focus:outline-none"
        >
          &gt;
        </button>
        <div className="flex justify-center mt-6">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer transition ${
                index === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: faUser,
              title: "Create an Account",
              description: "Sign up and create a student or admin account to get started.",
            },
            {
              icon: faBookOpen,
              title: "Choose Your Exam",
              description: "Select a subject and level to begin practicing for your exams.",
            },
            {
              icon: faClipboardList,
              title: "Track Progress",
              description: "Review your results and improve your performance over time.",
            },
            {
              icon: faPhoneAlt,
              title: "Get Help Anytime",
              description: "Reach out to support or consult FAQs for assistance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-4xl text-blue-600 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About & Contact Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 px-4">
        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md flex-1">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">About ExamMystry</h2>
          <p className="text-gray-700">
          ExamMystry is an advanced online exam system designed to simplify the process of conducting exams for students and provide a powerful toolset for administrators to create and manage exams.

          </p>
          <button
            onClick={() => navigate("/about")}
            className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition focus:outline-none"
          >
            Read More
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md flex-1">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you Have questions? Feel free to contact us for more information.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition focus:outline-none"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 mt-auto">
        <div className="text-center">
          <p className="mb-4">© 2024 ExamMaster. All Rights Reserved.</p>
          <div className="space-x-6">
            <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/about" className="hover:text-gray-300">About Us</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage



// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faBookOpen, faClipboardList, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

// const HomePage = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <section className="bg-blue-600 text-white py-20 text-center">
//         <h1 className="text-4xl font-extrabold mb-4">Welcome to ExamMaster</h1>
//         <p className="text-lg mb-6">
//           Prepare for exams with mock tests, track your progress, and stay ahead of the curve.
//         </p>
//         <Link
//           to="/student/mock-test"
//           className="bg-green-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-green-700 transition duration-300"
//         >
//           Take a Mock Test
//         </Link>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 px-4 text-center bg-white">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-8">How It Works</h2>
//         <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <FontAwesomeIcon icon={faUser} className="text-4xl text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Create an Account</h3>
//             <p className="text-gray-600">Sign up and create a student or admin account to get started.</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Your Exam</h3>
//             <p className="text-gray-600">Select a subject and level to begin practicing for your exams.</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Progress</h3>
//             <p className="text-gray-600">Review your results and improve your performance over time.</p>
//           </div>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <FontAwesomeIcon icon={faPhoneAlt} className="text-4xl text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Help Anytime</h3>
//             <p className="text-gray-600">Reach out to support or consult FAQs for assistance.</p>
//           </div>
//         </div>
//       </section>

//       {/* Quick Links Section */}
//       <section className="py-16 px-4 bg-gray-100 text-center">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-6">Quick Links</h2>
//         <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
//           <Link
//             to="/student/dashboard"
//             className="bg-purple-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-purple-700 transition duration-300"
//           >
//             Student Dashboard
//           </Link>
//           <Link
//             to="/admin/dashboard"
//             className="bg-green-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-green-700 transition duration-300"
//           >
//             Admin Dashboard
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-600 text-white py-6 mt-auto">
//         <div className="text-center">
//           <p className="mb-4">© 2024 ExamMaster. All Rights Reserved.</p>
//           <div className="space-x-4">
//             <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
//             <Link to="/about" className="hover:text-gray-300">About Us</Link>
//             <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
