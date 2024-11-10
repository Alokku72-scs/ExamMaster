import React, { useState } from 'react';
import instruction from '../assets/instruction.mp4';
import { useNavigate } from 'react-router-dom';
import questions from '../data/Data';

function MockTest(event) {

  const navigate = useNavigate();
  const [isLocalvideo, setIsLocalVideo] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  // const [isVisited,setIsVisited] = useState(false);

  const handlesubject = (event) => setSelectedSubject(event.target.value);
  const handleLevel = (event) => setSelectedLevel(event.target.value);
  const isVisited=true;



  // Filter questions based on selected subject and level
  const submitHandler = (event) => {
    
    event.preventDefault();
    try {
      // Filter questions based on selected subject and level
      
      const filteredQuestions = questions.filter((question) =>
        question.Subject === selectedSubject && question.Level === selectedLevel
      );
      // Check if any questions were found
      if (filteredQuestions.length === 0) {
        throw new Error("No questions found for the selected subject and level.");
      }
      if(isVisited)
      navigate('/demologin', { state: { questions: filteredQuestions } });
      else{
        navigate('/quiz');
      }
      //console.log(isVisited);
    }catch (error) {
      // Handle the error
      alert(error.message); // Display an error message
      console.error(error); // Log the error for debugging
    }
  };






  const handleVideoSwitch = () => {
    setIsLocalVideo(!isLocalvideo);
  };



  return (
    <div className='overflow-x-hidden'>
      <div className='flex justify-center bg-gradient-to-b from-fuchsia-800 to-purple-500'>
        <h1 className='text-xl text-cyan-50 font-serif font-bold'>
          Welcome to <span className='text-yellow-300'>SC&SS Testing Agency</span>, Test practice Centre</h1>
      </div>

      <div className=' flex flex-col  items-center min-h-screen w-full bg-gradient-to-t from-fuchsia-800 to-purple-500'>

        <div className='flex flex-row justify-between items-center w-full max-w-5xl mt-[4%] px-4'>

          {/* Video Section */}
          {isLocalvideo ? (
            <div className='flex justify-center w-2/4 p-4 h-[300px]' style={{ overflow: 'hidden' }}>
              <video width="400" height="300" controls style={{ objectFit: 'cover' }}>
                <source src={instruction} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
            : (
              <div className='flex justify-center items-center w-2/4 h-[300px] p-4'>
                <iframe
                  width="400"
                  height="300"
                  src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>

              </div>
            )
          }


          {/* Form Section */}
          <form onSubmit={submitHandler}
            className='flex flex-col items-center w-2/4 bg-cyan-500 p-6 rounded-md shadow-md'>
            <label className='text-white font-semibold'>Select paper for test</label>
            <select onChange={handlesubject}
              className='mt-2 w-full p-2 rounded-md' required>
              <option value="">Select</option>
              <option value="Algorithm">Algorithm</option>
              <option value="APT">APT</option>
              <option value="DBMS">DBMS</option>
              <option value="Networking">Networking</option>
              <option value="Operating System">Operating System</option>
            </select>

            <label className='mt-4 text-white font-semibold'>Select difficulty level</label>
            <select onChange={handleLevel}
              className='mt-2 w-full p-2 rounded-md' required>
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button className='mt-6 px-6 py-2 bg-pink-700 text-white rounded-md'>
              {/* // onClick={navigateToLogin} */}
              Start MockTest
            </button>
          </form>

        </div>

        <div className='flex w-full justify-center'>
          <button
            className='border mt-4 px-4 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition-all'
            onClick={handleVideoSwitch}
          >
            Local Video
          </button>
          <button
            className=' border mt-4 px-6 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition-all'
            onClick={handleVideoSwitch}
          >
            YouTube Video
          </button>

        </div>


        <div className='w-11/12 border mt-[6%]'> </div>
        <div className='w-10/12 justify-center'>
          <p className='text-xl  text-white font-serif leading-relaxed'>This Mock Test is to familiarize the students about processes of Computer Based Test (CBT), candidate can understand various processes of Computer Based Test (CBT) with the available mock test.</p>
        </div>
      </div>
    </div>


  );
}

export default MockTest;